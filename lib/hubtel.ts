/**
 * Hubtel Payment Integration Utility
 * Online Checkout API for Quarhire Airport Transfer Bookings
 * 
 * API Endpoint: https://payproxyapi.hubtel.com/items/initiate
 * Documentation: https://developers.hubtel.com/docs/business/api_documentation/payment_apis/online_checkout
 */

// =============================================================================
// INTERFACES
// =============================================================================

export interface HubtelCheckoutRequest {
    totalAmount: number;
    description: string;
    callbackUrl: string;
    returnUrl: string;
    cancellationUrl: string;
    merchantAccountNumber: string;
    clientReference: string;
    payeeName?: string;
    payeeMobileNumber?: string;
    payeeEmail?: string;
}

export interface HubtelCheckoutResponse {
    responseCode: string;
    status: string;
    data: {
        checkoutUrl: string;
        checkoutId: string;
        clientReference: string;
        message: string;
        checkoutDirectUrl: string;
    };
}

export interface HubtelCallbackPayload {
    ResponseCode: string;
    Status: string;
    Data: {
        CheckoutId: string;
        SalesInvoiceId: string;
        ClientReference: string;
        Status: string;
        Amount: number;
        CustomerPhoneNumber: string;
        PaymentDetails: {
            MobileMoneyNumber: string;
            PaymentType: string;
            Channel: string;
        };
        Description: string;
    };
}

export interface HubtelStatusCheckResponse {
    message: string;
    responseCode: string;
    data: {
        date: string;
        status: 'Paid' | 'Unpaid' | 'Refunded';
        transactionId: string;
        externalTransactionId: string;
        paymentMethod: string;
        clientReference: string;
        currencyCode: string | null;
        amount: number;
        charges: number;
        amountAfterCharges: number;
        isFulfilled: boolean | null;
    };
}

export interface BookingData {
    name: string;
    email: string;
    phone: string;
    pickupLocation: string;
    destination: string;
    customDestination?: string;
    airline?: string;
    flightNumber?: string;
    vehicleType: string;
    date: string;
    time: string;
    passengers: number;
    luggage: number;
    specialRequests?: string;
    estimatedPrice: string;
}

export interface HubtelVerificationResult {
    success: boolean;
    verified: boolean;
    status: 'Paid' | 'Unpaid' | 'Refunded' | 'Unknown' | 'Error';
    transactionId?: string;
    amount?: number;
    errorReason?: string;
    rawResponse?: any; // For debugging (never includes secrets)
}

// =============================================================================
// API CONSTANTS
// =============================================================================

// Checkout initiation endpoint
export const HUBTEL_API_ENDPOINT = 'https://payproxyapi.hubtel.com/items/initiate';

// Status check endpoint (CORRECT per Hubtel documentation)
// Format: https://rmsc.hubtel.com/v1/merchantaccount/merchants/{merchantId}/transactions/status?clientReference={ref}
export const HUBTEL_BASE_URL = process.env.HUBTEL_BASE_URL || 'https://rmsc.hubtel.com';

// =============================================================================
// AUTHENTICATION
// =============================================================================

/**
 * Get Base64 encoded credentials for Basic Auth
 * Single source of truth for Hubtel authentication
 */
export const getHubtelAuthHeader = (): string => {
    const clientId = process.env.HUBTEL_CLIENT_ID || '';
    const clientSecret = process.env.HUBTEL_CLIENT_SECRET || '';

    if (!clientId || !clientSecret) {
        console.error('[Hubtel] Missing API credentials - check HUBTEL_CLIENT_ID and HUBTEL_CLIENT_SECRET');
    }

    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    return `Basic ${credentials}`;
};

/**
 * Validate Hubtel configuration
 */
export const isHubtelConfigured = (): boolean => {
    const clientId = process.env.HUBTEL_CLIENT_ID;
    const clientSecret = process.env.HUBTEL_CLIENT_SECRET;
    const merchantAccount = process.env.HUBTEL_MERCHANT_ACCOUNT_NUMBER;

    return !!(
        clientId &&
        clientSecret &&
        merchantAccount &&
        clientId !== 'your_hubtel_client_id' &&
        clientSecret !== 'your_hubtel_client_secret' &&
        merchantAccount !== 'your_hubtel_merchant_account_number'
    );
};

// =============================================================================
// STATUS VERIFICATION (CORE FUNCTION)
// =============================================================================

/**
 * Verify transaction status directly with Hubtel's API
 * This is the ONLY source of truth for payment verification
 * 
 * @param clientReference - The unique reference for the transaction
 * @returns HubtelVerificationResult with verified status
 */
export const hubtelGetTransactionStatus = async (
    clientReference: string
): Promise<HubtelVerificationResult> => {
    // Use HUBTEL_MERCHANT_ID for status checks (different from HUBTEL_MERCHANT_ACCOUNT_NUMBER used for checkout!)
    const merchantId = process.env.HUBTEL_MERCHANT_ID;

    if (!merchantId) {
        return {
            success: false,
            verified: false,
            status: 'Error',
            errorReason: 'HUBTEL_MERCHANT_ID not configured - this is required for status checks'
        };
    }

    if (!clientReference) {
        return {
            success: false,
            verified: false,
            status: 'Error',
            errorReason: 'clientReference is required'
        };
    }

    // Build the correct URL per Hubtel documentation
    const statusUrl = `${HUBTEL_BASE_URL}/v1/merchantaccount/merchants/${merchantId}/transactions/status?clientReference=${encodeURIComponent(clientReference)}`;

    console.log('[Hubtel] Checking transaction status for:', clientReference);
    // NOTE: We intentionally do NOT log the full URL as it could reveal merchant ID patterns

    try {
        const response = await fetch(statusUrl, {
            method: 'GET',
            headers: {
                'Authorization': getHubtelAuthHeader(),
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'User-Agent': 'Quarhire-App/1.0'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[Hubtel] Status check failed:', response.status);
            // Don't log errorText as it might contain sensitive info in some edge cases

            return {
                success: false,
                verified: false,
                status: 'Error',
                errorReason: `HTTP ${response.status}: ${response.status === 403 ? 'IP not whitelisted or invalid credentials' : 'Request failed'}`
            };
        }

        const result = await response.json();
        console.log('[Hubtel] Status check response received');

        // Normalize response (handle both PascalCase and camelCase)
        const responseCode = result.ResponseCode || result.responseCode;
        const data = result.Data || result.data;

        // Handle array responses (some endpoints return arrays)
        const transactionData = Array.isArray(data) ? data[0] : data;

        if (!transactionData) {
            return {
                success: true,
                verified: false,
                status: 'Unknown',
                errorReason: 'No transaction data in response',
                rawResponse: result
            };
        }

        const status = transactionData.Status || transactionData.status;
        const isPaid = status === 'Paid' || status === 'Success' || status === 'Successful';

        return {
            success: true,
            verified: true,
            status: isPaid ? 'Paid' : (status === 'Unpaid' ? 'Unpaid' : (status === 'Refunded' ? 'Refunded' : 'Unknown')),
            transactionId: transactionData.TransactionId || transactionData.transactionId,
            amount: transactionData.Amount || transactionData.amount,
            rawResponse: {
                responseCode,
                status,
                clientReference: transactionData.ClientReference || transactionData.clientReference,
                amount: transactionData.Amount || transactionData.amount,
                date: transactionData.Date || transactionData.date
            }
        };

    } catch (error: any) {
        console.error('[Hubtel] Status check error:', error.message);
        return {
            success: false,
            verified: false,
            status: 'Error',
            errorReason: `Network error: ${error.message}`
        };
    }
};

// =============================================================================
// UTILITY FUNCTIONS
// =============================================================================

/**
 * Generate a unique payment reference (max 32 characters)
 */
export const generatePaymentReference = (): string => {
    const timestamp = Date.now().toString(36).toUpperCase();
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
    // Format: QRH-{timestamp}-{random} = max ~20 chars
    return `QRH-${timestamp}-${randomString}`;
};

/**
 * Get vehicle display name
 */
const getVehicleName = (vehicleType: string): string => {
    const vehicleNames: { [key: string]: string } = {
        'economy': 'Sedan',
        'executive': 'Mini SUV',
        'suv': 'Premium SUV',
        'van': 'Executive Van'
    };
    return vehicleNames[vehicleType] || vehicleType;
};

/**
 * Format booking data for Hubtel description
 */
export const formatBookingDescription = (bookingData: BookingData): string => {
    const vehicleName = getVehicleName(bookingData.vehicleType);
    const destination = bookingData.customDestination || bookingData.destination;

    // Keep description concise
    return `Quarhire ${vehicleName} - ${bookingData.pickupLocation} to ${destination}`;
};

/**
 * Create checkout request object
 */
export const createCheckoutRequest = (
    bookingData: BookingData,
    totalAmount: number,
    clientReference: string,
    baseUrl: string
): HubtelCheckoutRequest => {
    const merchantAccountNumber = process.env.HUBTEL_MERCHANT_ACCOUNT_NUMBER || '';

    return {
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        description: formatBookingDescription(bookingData),
        callbackUrl: `${baseUrl}/api/hubtel/callback`,
        returnUrl: `${baseUrl}/booking/success?ref=${clientReference}`,
        cancellationUrl: `${baseUrl}/booking?cancelled=true`,
        merchantAccountNumber,
        clientReference,
        payeeName: bookingData.name,
        payeeMobileNumber: bookingData.phone,
        payeeEmail: bookingData.email
    };
};

/**
 * Check if response code indicates success
 */
export const isSuccessResponse = (responseCode: string): boolean => {
    return responseCode === '0000';
};
