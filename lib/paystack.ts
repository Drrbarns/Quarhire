/**
 * Paystack Payment Integration Utility
 * Handles payment initialization and verification
 */

export interface PaystackConfig {
    email: string;
    amount: number; // Amount in Kobo (multiply by 100)
    reference: string;
    metadata?: {
        custom_fields?: Array<{
            display_name: string;
            variable_name: string;
            value: string | number;
        }>;
        [key: string]: any;
    };
    onSuccess: (reference: string) => void;
    onClose: () => void;
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

/**
 * Initialize Paystack payment popup
 */
export const initializePaystackPayment = (config: PaystackConfig) => {
    // @ts-ignore - PaystackPop is loaded via script tag
    if (typeof PaystackPop === 'undefined') {
        console.error('Paystack SDK not loaded. Please add the Paystack script.');
        return null;
    }

    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    if (!publicKey || publicKey === 'pk_test_your_public_key_here') {
        console.error('Paystack public key not configured. Please set NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY in .env.local');
        return null;
    }

    // @ts-ignore
    const handler = PaystackPop.setup({
        key: publicKey,
        email: config.email,
        amount: config.amount,
        ref: config.reference,
        metadata: config.metadata,
        callback: function (response: any) {
            config.onSuccess(response.reference);
        },
        onClose: function () {
            config.onClose();
        }
    });

    return handler;
};

/**
 * Generate a unique payment reference
 */
export const generatePaymentReference = (): string => {
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 9);
    return `QRHRE-${timestamp}-${randomString}`.toUpperCase();
};

/**
 * Convert amount to Kobo (Paystack requires amount in smallest currency unit)
 */
export const convertToKobo = (amount: number): number => {
    return Math.round(amount * 100);
};

/**
 * Format booking data for Paystack metadata
 */
export const formatBookingMetadata = (bookingData: BookingData) => {
    return {
        custom_fields: [
            {
                display_name: 'Passenger Name',
                variable_name: 'passenger_name',
                value: bookingData.name
            },
            {
                display_name: 'Phone',
                variable_name: 'phone',
                value: bookingData.phone
            },
            {
                display_name: 'Pickup Location',
                variable_name: 'pickup_location',
                value: bookingData.pickupLocation
            },
            {
                display_name: 'Destination',
                variable_name: 'destination',
                value: bookingData.customDestination || bookingData.destination
            },
            {
                display_name: 'Vehicle Type',
                variable_name: 'vehicle_type',
                value: bookingData.vehicleType
            },
            {
                display_name: 'Pickup Date',
                variable_name: 'pickup_date',
                value: bookingData.date
            },
            {
                display_name: 'Pickup Time',
                variable_name: 'pickup_time',
                value: bookingData.time
            },
            {
                display_name: 'Passengers',
                variable_name: 'passengers',
                value: bookingData.passengers
            }
        ],
        booking_type: 'airport_transfer',
        flight_number: bookingData.flightNumber || 'N/A',
        airline: bookingData.airline || 'N/A'
    };
};
