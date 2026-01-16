'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';

function SuccessContent() {
    const searchParams = useSearchParams();
    const reference = searchParams.get('ref');
    const [paymentStatus, setPaymentStatus] = useState<'checking' | 'success' | 'pending' | 'failed'>('checking');

    useEffect(() => {
        // Check payment status after a short delay
        const checkStatus = async () => {
            if (!reference) {
                setPaymentStatus('pending');
                return;
            }

            try {
                const response = await fetch(`/api/hubtel/status?clientReference=${reference}`);
                const data = await response.json();

                if (data.success && data.transaction?.isPaid) {
                    setPaymentStatus('success');
                } else if (data.transaction?.status === 'Unpaid') {
                    setPaymentStatus('pending');
                } else {
                    setPaymentStatus('pending'); // Default to pending, callback will confirm
                }
            } catch (error) {
                console.error('Status check error:', error);
                setPaymentStatus('pending'); // Assume pending until callback confirms
            }
        };

        // Delay check to allow callback to process first
        setTimeout(checkStatus, 2000);
    }, [reference]);

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
                                    Please wait while we confirm your payment.
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

                        {reference && (
                            <div className="bg-[#F5F7FA] rounded-xl p-6 mb-8 inline-block">
                                <p className="text-sm text-[#2B2F35] mb-1">Booking Reference</p>
                                <p className="text-xl font-bold text-[#0074C8]">{reference}</p>
                            </div>
                        )}

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
