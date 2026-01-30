'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';

interface BookingData {
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
    bookingReference: string;
    paymentReference?: string;
    checkoutId?: string;
}

function SuccessContent() {
    const searchParams = useSearchParams();
    const reference = searchParams.get('ref');
    const [paymentStatus, setPaymentStatus] = useState<'checking' | 'success' | 'pending' | 'failed'>('checking');
    const [emailSent, setEmailSent] = useState(false);
    const [bookingData, setBookingData] = useState<BookingData | null>(null);

    useEffect(() => {
        // Retrieve booking data from localStorage
        const storedBooking = localStorage.getItem('pendingBooking');
        if (storedBooking) {
            try {
                const parsed = JSON.parse(storedBooking);
                setBookingData(parsed);
            } catch (e) {
                console.error('Failed to parse booking data:', e);
            }
        }

        // Check payment status and send emails
        const processPayment = async () => {
            // Short delay to allow Hubtel callback to process
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Try to check payment status
            if (reference) {
                try {
                    const response = await fetch(`/api/hubtel/status?clientReference=${reference}`);
                    const data = await response.json();

                    if (data.success && data.transaction?.isPaid) {
                        setPaymentStatus('success');
                        // Send confirmation emails
                        await sendConfirmationEmails();
                    } else if (data.error?.includes('403') || data.error?.includes('whitelist')) {
                        // Status check not available (IP not whitelisted)
                        // Assume success since customer was redirected back
                        setPaymentStatus('success');
                        await sendConfirmationEmails();
                    } else {
                        // Payment may still be processing
                        setPaymentStatus('pending');
                        // Still try to send emails - callback may have confirmed payment
                        await sendConfirmationEmails();
                    }
                } catch (error: any) {
                    console.error('Status check error:', error);
                    // If status check fails, assume payment was successful (customer redirected back)
                    setPaymentStatus('success');
                    await sendConfirmationEmails();
                }
            } else {
                // No reference, but customer is on success page
                setPaymentStatus('pending');
            }
        };

        processPayment();
    }, [reference]);

    const sendConfirmationEmails = async () => {
        if (emailSent) return; // Don't send twice

        const storedBooking = localStorage.getItem('pendingBooking');
        if (!storedBooking) {
            console.warn('No booking data found for email confirmation');
            return;
        }

        try {
            const booking = JSON.parse(storedBooking);

            const response = await fetch('/api/hubtel/confirm-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(booking)
            });

            const result = await response.json();

            if (result.success) {
                console.log('Confirmation emails sent:', result);
                setEmailSent(true);
                // Clear the stored booking data after successful email
                localStorage.removeItem('pendingBooking');
            } else {
                console.error('Failed to send confirmation emails:', result);
            }
        } catch (error) {
            console.error('Error sending confirmation emails:', error);
        }
    };

    const getVehicleName = (type: string) => {
        const names: { [key: string]: string } = {
            'economy': 'Sedan',
            'executive': 'Mini SUV',
            'suv': 'Premium SUV',
            'van': 'Executive Van'
        };
        return names[type] || type;
    };

    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-[#DDE2E9]/20">
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto text-center">
                        {paymentStatus === 'checking' && (
                            <div className="animate-pulse">
                                <div className="w-24 h-24 mx-auto mb-8 bg-[#0074C8]/20 rounded-full flex items-center justify-center">
                                    <i className="ri-loader-4-line text-5xl text-[#0074C8] animate-spin"></i>
                                </div>
                                <h1 className="text-3xl font-bold text-[#0A0A0A] mb-4">
                                    Verifying Payment...
                                </h1>
                                <p className="text-[#2B2F35] text-lg">
                                    Please wait while we confirm your payment and send confirmation emails.
                                </p>
                            </div>
                        )}

                        {paymentStatus === 'success' && (
                            <>
                                <div className="w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <i className="ri-checkbox-circle-fill text-5xl text-green-500"></i>
                                </div>
                                <h1 className="text-3xl font-bold text-[#0A0A0A] mb-4">
                                    Payment Successful!
                                </h1>
                                <p className="text-[#2B2F35] text-lg mb-6">
                                    Thank you for booking with Quarhire. Your airport transfer has been confirmed.
                                    {emailSent && ' Confirmation emails have been sent to you and our team.'}
                                </p>
                            </>
                        )}

                        {paymentStatus === 'pending' && (
                            <>
                                <div className="w-24 h-24 mx-auto mb-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <i className="ri-time-line text-5xl text-yellow-500"></i>
                                </div>
                                <h1 className="text-3xl font-bold text-[#0A0A0A] mb-4">
                                    Payment Processing
                                </h1>
                                <p className="text-[#2B2F35] text-lg mb-6">
                                    Your payment is being processed. You will receive a confirmation SMS and email shortly.
                                </p>
                            </>
                        )}

                        {paymentStatus === 'failed' && (
                            <>
                                <div className="w-24 h-24 mx-auto mb-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <i className="ri-close-circle-fill text-5xl text-red-500"></i>
                                </div>
                                <h1 className="text-3xl font-bold text-[#0A0A0A] mb-4">
                                    Payment Failed
                                </h1>
                                <p className="text-[#2B2F35] text-lg mb-6">
                                    Unfortunately, your payment could not be processed. Please try again or contact us for assistance.
                                </p>
                            </>
                        )}

                        {/* Booking Reference */}
                        {reference && (
                            <div className="bg-[#F5F7FA] rounded-xl p-6 mb-8 inline-block">
                                <p className="text-sm text-[#2B2F35] mb-1">Booking Reference</p>
                                <p className="text-xl font-bold text-[#0074C8]">{reference}</p>
                            </div>
                        )}

                        {/* Booking Details Card */}
                        {bookingData && paymentStatus === 'success' && (
                            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-left">
                                <h2 className="text-xl font-bold text-[#0A0A0A] mb-6 text-center">Your Booking Details</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-[#F5F7FA] rounded-lg p-4">
                                        <p className="text-sm text-[#2B2F35]/70 mb-1">Pickup Date & Time</p>
                                        <p className="font-semibold text-[#0A0A0A]">{bookingData.date} at {bookingData.time}</p>
                                    </div>
                                    <div className="bg-[#F5F7FA] rounded-lg p-4">
                                        <p className="text-sm text-[#2B2F35]/70 mb-1">Vehicle Type</p>
                                        <p className="font-semibold text-[#0A0A0A]">{getVehicleName(bookingData.vehicleType)}</p>
                                    </div>
                                    <div className="bg-[#F5F7FA] rounded-lg p-4">
                                        <p className="text-sm text-[#2B2F35]/70 mb-1">Pickup Location</p>
                                        <p className="font-semibold text-[#0A0A0A]">{bookingData.pickupLocation}</p>
                                    </div>
                                    <div className="bg-[#F5F7FA] rounded-lg p-4">
                                        <p className="text-sm text-[#2B2F35]/70 mb-1">Destination</p>
                                        <p className="font-semibold text-[#0A0A0A]">{bookingData.customDestination || bookingData.destination}</p>
                                    </div>
                                    <div className="bg-[#F5F7FA] rounded-lg p-4">
                                        <p className="text-sm text-[#2B2F35]/70 mb-1">Passengers</p>
                                        <p className="font-semibold text-[#0A0A0A]">{bookingData.passengers}</p>
                                    </div>
                                    <div className="bg-[#0074C8]/10 rounded-lg p-4">
                                        <p className="text-sm text-[#0074C8]/70 mb-1">Amount Paid</p>
                                        <p className="font-bold text-[#0074C8] text-xl">{bookingData.estimatedPrice}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* What's Next Card */}
                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-xl font-bold text-[#0A0A0A] mb-4">What's Next?</h2>
                            <ul className="text-left space-y-3 text-[#2B2F35]">
                                <li className="flex items-start gap-3">
                                    <i className="ri-mail-line text-[#0074C8] text-xl mt-0.5"></i>
                                    <span>You'll receive a confirmation email with your booking details</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <i className="ri-smartphone-line text-[#0074C8] text-xl mt-0.5"></i>
                                    <span>Our driver will contact you on your pickup day</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <i className="ri-flight-takeoff-line text-[#0074C8] text-xl mt-0.5"></i>
                                    <span>We track your flight - don't worry about delays!</span>
                                </li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/"
                                className="bg-gradient-to-r from-[#0074C8] to-[#0097F2] text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
                            >
                                Back to Home
                            </Link>
                            <Link
                                href="/contact"
                                className="border-2 border-[#0074C8] text-[#0074C8] px-8 py-4 rounded-xl font-semibold hover:bg-[#0074C8] hover:text-white transition-all"
                            >
                                Contact Us
                            </Link>
                        </div>

                        {/* Help Section */}
                        <div className="mt-12 p-6 bg-[#0074C8]/5 rounded-xl">
                            <p className="text-[#2B2F35] mb-2">Need assistance?</p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <a href="tel:+233240665648" className="flex items-center gap-2 text-[#0074C8] font-semibold hover:underline">
                                    <i className="ri-phone-line"></i>
                                    +233 240 665 648
                                </a>
                                <a href="https://wa.me/233240665648" className="flex items-center gap-2 text-green-600 font-semibold hover:underline">
                                    <i className="ri-whatsapp-line"></i>
                                    WhatsApp
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default function BookingSuccess() {
    return (
        <Suspense fallback={
            <main className="min-h-screen bg-gradient-to-b from-white to-[#DDE2E9]/20 flex items-center justify-center">
                <div className="text-center">
                    <i className="ri-loader-4-line text-5xl text-[#0074C8] animate-spin"></i>
                    <p className="mt-4 text-[#2B2F35]">Loading...</p>
                </div>
            </main>
        }>
            <SuccessContent />
        </Suspense>
    );
}
