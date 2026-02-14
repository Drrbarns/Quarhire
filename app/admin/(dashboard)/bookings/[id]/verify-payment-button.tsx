'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface VerifyPaymentButtonProps {
    bookingId: string;
    paymentReference: string;
    currentStatus: string;
}

export default function VerifyPaymentButton({
    bookingId,
    paymentReference,
    currentStatus
}: VerifyPaymentButtonProps) {
    const [isVerifying, setIsVerifying] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
    const router = useRouter();

    // Only show for pending bookings
    if (currentStatus === 'paid' || currentStatus === 'completed') {
        return null;
    }

    const handleVerify = async () => {
        setIsVerifying(true);
        setResult(null);

        try {
            const response = await fetch('/api/hubtel/status-check', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    clientReference: paymentReference,
                    bookingId: bookingId
                })
            });

            const data = await response.json();

            if (data.status === 'Paid') {
                setResult({
                    success: true,
                    message: 'Payment confirmed! Booking updated to Paid.'
                });
                // Refresh the page to show updated status
                setTimeout(() => {
                    router.refresh();
                }, 1500);
            } else if (data.status === 'Unpaid') {
                setResult({
                    success: false,
                    message: 'Payment not yet received. Customer may not have completed payment.'
                });
            } else {
                setResult({
                    success: false,
                    message: data.message || 'Unable to verify payment status.'
                });
            }
        } catch (error: any) {
            setResult({
                success: false,
                message: 'Error checking payment: ' + error.message
            });
        } finally {
            setIsVerifying(false);
        }
    };

    return (
        <div className="bg-white rounded-2xl border border-[#DDE2E9] shadow-sm p-6">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Payment Verification</h3>

            <p className="text-sm text-gray-600 mb-4">
                If you suspect the customer paid but the status hasn't updated, use this to check with Hubtel directly.
            </p>

            <button
                onClick={handleVerify}
                disabled={isVerifying}
                className="w-full py-3 bg-[#0074C8] text-white rounded-xl font-medium hover:bg-[#005da0] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {isVerifying ? (
                    <>
                        <i className="ri-loader-4-line animate-spin"></i>
                        Checking with Hubtel...
                    </>
                ) : (
                    <>
                        <i className="ri-refresh-line"></i>
                        Verify Payment Status
                    </>
                )}
            </button>

            {result && (
                <div className={`mt-4 p-3 rounded-lg text-sm ${result.success
                        ? 'bg-green-50 text-green-700 border border-green-100'
                        : 'bg-yellow-50 text-yellow-700 border border-yellow-100'
                    }`}>
                    <div className="flex items-start gap-2">
                        <i className={`ri-${result.success ? 'check-double-line' : 'information-line'} mt-0.5`}></i>
                        <span>{result.message}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
