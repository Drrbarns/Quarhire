/**
 * Hubtel Payment Integration Utility
 * Online Checkout API for Quarhire Airport Transfer Bookings
 * 
 * API Endpoint: https://payproxyapi.hubtel.com/items/initiate
 * Documentation: https://developers.hubtel.com/docs/business/api_documentation/payment_apis/online_checkout
 */

// Request interfaces
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

// Response interfaces
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

// API Constants
export const HUBTEL_API_ENDPOINT = 'https://payproxyapi.hubtel.com/items/initiate';
export const HUBTEL_STATUS_ENDPOINT = 'https://api-txnstatus.hubtel.com/transactions';

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
        totalAmount: parseFloat(totalAmount.toFixed(2)), // Ensure 2 decimal places
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

/**
 * Get Base64 encoded credentials for Basic Auth
 */
export const getHubtelAuthHeader = (): string => {
    const clientId = process.env.HUBTEL_CLIENT_ID || '';
    const clientSecret = process.env.HUBTEL_CLIENT_SECRET || '';
    const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    return `Basic ${credentials}`;
};

/**
 * Check if response code indicates success
 */
export const isSuccessResponse = (responseCode: string): boolean => {
    return responseCode === '0000';
};
