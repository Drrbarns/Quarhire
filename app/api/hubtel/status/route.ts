import { NextRequest, NextResponse } from 'next/server';
import {
    HUBTEL_STATUS_ENDPOINT,
    getHubtelAuthHeader,
    isHubtelConfigured,
    type HubtelStatusCheckResponse
} from '@/lib/hubtel';

/**
 * API Route: Check Hubtel Transaction Status
 * GET /api/hubtel/status?clientReference=xxx
 * 
 * Checks the status of a payment transaction
 * Required when callback is not received within 5 minutes
 */
export async function GET(request: NextRequest) {
    try {
        // Check if Hubtel is configured
        if (!isHubtelConfigured()) {
            return NextResponse.json(
                { error: 'Payment gateway not configured' },
                { status: 500 }
            );
        }

        const { searchParams } = new URL(request.url);
        const clientReference = searchParams.get('clientReference');

        if (!clientReference) {
            return NextResponse.json(
                { error: 'clientReference is required' },
                { status: 400 }
            );
        }

        const merchantAccountNumber = process.env.HUBTEL_MERCHANT_ACCOUNT_NUMBER;

        // Build status check URL (Alternative Endpoint)
        // Endpoint format: https://api-topup.hubtel.com/transactions/status?clientreference={ref}&hubtelmerchantaccountid={id}
        const statusUrl = `${HUBTEL_STATUS_ENDPOINT}/status?clientreference=${encodeURIComponent(clientReference)}&hubtelmerchantaccountid=${merchantAccountNumber}`;

        // Make request to Hubtel Status API
        const response = await fetch(statusUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getHubtelAuthHeader(),
                'Accept': 'application/json',
                'User-Agent': 'Quarhire-App/1.0',
                'Cache-Control': 'no-cache'
            }
        });

        if (!response.ok) {
            // Handle 403 Forbidden (IP not whitelisted)
            if (response.status === 403) {
                return NextResponse.json(
                    {
                        error: 'Access denied. Server IP may not be whitelisted with Hubtel.',
                        note: 'Contact your Hubtel Retail Systems Engineer to whitelist your server IP.'
                    },
                    { status: 403 }
                );
            }

            return NextResponse.json(
                { error: 'Failed to check transaction status' },
                { status: response.status }
            );
        }

        const result = await response.json();
        console.log('Hubtel Raw Status Response:', JSON.stringify(result));

        // Normalize data structure (Handle PascalCase vs camelCase)
        // Hubtel often uses PascalCase (ResponseCode, Data)
        const responseData = result.Data || result.data;

        let transactionData = null;

        // Handle if Data is an array (sometimes returns list of transactions)
        if (Array.isArray(responseData)) {
            // Take the first one (most recent)
            transactionData = responseData[0];
        } else {
            transactionData = responseData;
        }

        if (!transactionData) {
            console.error('No transaction data found in response');
            return NextResponse.json({ success: false, status: 'Unknown', debug: result });
        }

        const status = transactionData.Status || transactionData.status;
        // Check for various success strings just in case
        const isPaid = status === 'Paid' || status === 'Success' || status === 'Successful';

        // Return formatted status response
        return NextResponse.json({
            success: true,
            status: status,
            transaction: {
                clientReference: transactionData.ClientReference || transactionData.clientReference,
                transactionId: transactionData.TransactionId || transactionData.transactionId,
                amount: transactionData.Amount || transactionData.amount,
                charges: transactionData.Charges || transactionData.charges,
                paymentMethod: transactionData.PaymentMethod || transactionData.paymentMethod,
                date: transactionData.Date || transactionData.date,
                isPaid: isPaid
            }
        });
    } catch (error: any) {
        console.error('Hubtel status check error:', error);
        return NextResponse.json(
            { error: 'Internal server error', message: error.message },
            { status: 500 }
        );
    }
}
