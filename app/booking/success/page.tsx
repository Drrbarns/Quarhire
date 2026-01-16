'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState, useRef } from 'react';
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
    checkoutId?: string;
}

function SuccessContent() {
    const searchParams = useSearchParams();
    const reference = searchParams.get('ref');
    const [paymentStatus, setPaymentStatus] = useState<'checking' | 'success' | 'pending' | 'failed'>('checking');
    const [bookingData, setBookingData] = useState<BookingData | null>(null);
    const [emailStatus, setEmailStatus] = useState<'pending' | 'sending' | 'sent' | 'failed'>('pending');
    const emailSentRef = useRef(false);

    useEffect(() => {
        const processPaymentAndSendEmail = async () => {
            // Prevent double execution
            if (emailSentRef.current) return;

            // Get booking data from localStorage
            const storedBooking = localStorage.getItem('pendingBooking');

            if (!storedBooking) {
                console.log('No stored booking found in localStorage');
                if (reference) {
                    setPaymentStatus('success');
                } else {
                    setPaymentStatus('pending');
                }
                return;
            }

            let bookingInfo: BookingData;
            try {
                bookingInfo = JSON.parse(storedBooking);
                setBookingData(bookingInfo);
                console.log('Booking data loaded:', bookingInfo);
            } catch (e) {
                console.error('Failed to parse stored booking:', e);
                setPaymentStatus('pending');
                return;
            }

            // If we have a reference, payment was completed on Hubtel
            if (reference) {
                // Short delay for UX
                await new Promise(resolve => setTimeout(resolve, 1000));

                // Mark as successful
                setPaymentStatus('success');

                // Send confirmation email
                emailSentRef.current = true;
                setEmailStatus('sending');

                try {
                    console.log('Sending payment confirmation email to:', bookingInfo.email);

                    const response = await fetch('/api/booking/email', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            ...bookingInfo,
                            paymentStatus: 'paid',
                            paymentReference: reference
                        })
                    });

                    const result = await response.json();
                    console.log('Email API response:', result);

                    if (response.ok) {
                        console.log('✅ Payment confirmation email sent successfully');
                        setEmailStatus('sent');
                        // Clear stored booking after successful email
                        localStorage.removeItem('pendingBooking');
                    } else {
                        console.error('❌ Failed to send email:', result);
                        setEmailStatus('failed');
                    }
                } catch (error) {
                    console.error('Error sending payment confirmation email:', error);
                    setEmailStatus('failed');
                }
            } else {
                setPaymentStatus('pending');
            }
        };

        processPaymentAndSendEmail();
    }, [reference]);

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
                                    Confirming Payment...
                                </h1>
                                <p className="text-[#2B2F35] text-lg">
                                    Please wait while we finalize your booking.
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
                                </p>

                                {/* Email Status Indicator */}
                                <div className="mb-6">
                                    {emailStatus === 'sending' && (
                                        <p className="text-[#0074C8] flex items-center justify-center gap-2">
                                            <i className="ri-loader-4-line animate-spin"></i>
                                            Sending confirmation email...
                                        </p>
                                    )}
                                    {emailStatus === 'sent' && (
                                        <p className="text-green-600 flex items-center justify-center gap-2">
                                            <i className="ri-mail-check-line"></i>
                                            Confirmation email sent!
                                        </p>
                                    )}
                                    {emailStatus === 'failed' && (
                                        <p className="text-orange-600 flex items-center justify-center gap-2">
                                            <i className="ri-error-warning-line"></i>
                                            Email could not be sent. Contact us for confirmation.
                                        </p>
                                    )}
                                </div>
                            </>
                        )}

                        {paymentStatus === 'pending' && (
                            <>
                                <div className="w-24 h-24 mx-auto mb-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                    <i className="ri-time-line text-5xl text-yellow-500"></i>
                                </div>
                                <h1 className="text-3xl font-bold text-[#0A0A0A] mb-4">
                                    Booking Received
                                </h1>
                                <p className="text-[#2B2F35] text-lg mb-6">
                                    Your booking has been received. Please contact us to complete payment.
                                </p>
                            </>
                        )}

                        {paymentStatus === 'failed' && (
                            <>
                                <div className="w-24 h-24 mx-auto mb-8 bg-red-100 rounded-full flex items-center justify-center">
                                    <i className="ri-close-circle-fill text-5xl text-red-500"></i>
                                </div>
                                <h1 className="text-3xl font-bold text-[#0A0A0A] mb-4">
                                    Payment Issue
                                </h1>
                                <p className="text-[#2B2F35] text-lg mb-6">
                                    There was an issue with your payment. Please try again or contact us for assistance.
                                </p>
                            </>
                        )}

                        {reference && (
                            <div className="bg-[#F5F7FA] rounded-xl p-6 mb-8 inline-block">
                                <p className="text-sm text-[#2B2F35] mb-1">Booking Reference</p>
                                <p className="text-xl font-bold text-[#0074C8]">{reference}</p>
                            </div>
                        )}

                        {/* Booking Details Card */}
                        {bookingData && (
                            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 text-left">
                                <h2 className="text-xl font-bold text-[#0A0A0A] mb-6 text-center">Booking Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="flex items-start gap-3">
                                        <i className="ri-calendar-line text-[#0074C8] text-xl mt-0.5"></i>
                                        <div>
                                            <p className="text-sm text-[#2B2F35]">Date & Time</p>
                                            <p className="font-semibold text-[#0A0A0A]">{bookingData.date} at {bookingData.time}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <i className="ri-car-line text-[#0074C8] text-xl mt-0.5"></i>
                                        <div>
                                            <p className="text-sm text-[#2B2F35]">Vehicle</p>
                                            <p className="font-semibold text-[#0A0A0A]">{getVehicleName(bookingData.vehicleType)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <i className="ri-map-pin-line text-[#0074C8] text-xl mt-0.5"></i>
                                        <div>
                                            <p className="text-sm text-[#2B2F35]">Pickup</p>
                                            <p className="font-semibold text-[#0A0A0A]">{bookingData.pickupLocation}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <i className="ri-flag-line text-[#0074C8] text-xl mt-0.5"></i>
                                        <div>
                                            <p className="text-sm text-[#2B2F35]">Destination</p>
                                            <p className="font-semibold text-[#0A0A0A]">{bookingData.customDestination || bookingData.destination}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 md:col-span-2">
                                        <i className="ri-money-cny-circle-line text-[#0074C8] text-xl mt-0.5"></i>
                                        <div>
                                            <p className="text-sm text-[#2B2F35]">Amount Paid</p>
                                            <p className="font-bold text-xl text-green-600">{bookingData.estimatedPrice}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                            <h2 className="text-xl font-bold text-[#0A0A0A] mb-4">What's Next?</h2>
                            <ul className="text-left space-y-3 text-[#2B2F35]">
                                <li className="flex items-start gap-3">
                                    <i className="ri-mail-line text-[#0074C8] text-xl mt-0.5"></i>
                                    <span>Check your email for booking confirmation</span>
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
