'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';

const VEHICLE_LABELS: Record<string, string> = {
  economy: 'Sedan',
  executive: 'Mini SUV',
  suv: 'Premium SUV',
  van: 'Executive Mini Van',
};

function PayContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');
  const [booking, setBooking] = useState<{
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    price: number;
    payment_reference: string;
    vehicle_type: string;
    pickup_location: string;
    destination: string;
    pickup_date: string;
    pickup_time: string;
    passengers: number;
    luggage: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    if (!ref) {
      setError('Missing booking reference');
      setLoading(false);
      return;
    }
    fetch(`/api/bookings/by-ref?ref=${encodeURIComponent(ref)}`)
      .then((res) => {
        if (!res.ok) return res.json().then((d) => { throw new Error(d.error || 'Booking not found'); });
        return res.json();
      })
      .then(setBooking)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [ref]);

  const handlePayNow = async () => {
    if (!booking) return;
    setPaying(true);
    try {
      const res = await fetch('/api/hubtel/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalAmount: booking.price,
          description: `Quarhire transfer - ${booking.pickup_location} to ${booking.destination}`,
          clientReference: booking.payment_reference,
          name: booking.customer_name,
          email: booking.customer_email,
          phone: booking.customer_phone,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Payment initiation failed');
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }
      throw new Error('No payment URL received');
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Payment failed');
    } finally {
      setPaying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <i className="ri-loader-4-line animate-spin text-4xl text-[#0074C8] mb-4"></i>
          <p className="text-[#2B2F35]">Loading your reservation...</p>
        </div>
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
          <i className="ri-error-warning-line text-5xl text-red-500 mb-4"></i>
          <h1 className="text-xl font-bold text-[#0A0A0A] mb-2">Unable to load reservation</h1>
          <p className="text-[#2B2F35] mb-6">{error || 'Booking not found or already paid.'}</p>
          <Link href="/booking" className="inline-block px-6 py-3 bg-[#0074C8] text-white font-semibold rounded-xl hover:bg-[#005da0]">
            Make a new booking
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl shadow-xl border border-[#DDE2E9] overflow-hidden">
        <div className="bg-gradient-to-r from-[#0074C8] to-[#0097F2] p-6 text-white text-center">
          <h1 className="text-2xl font-bold">Complete Your Payment</h1>
          <p className="text-white/90 mt-1">Reference: {booking.payment_reference}</p>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Trip</span>
            <span className="font-medium text-[#0A0A0A]">{booking.pickup_location} → {booking.destination}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Date & time</span>
            <span className="font-medium text-[#0A0A0A]">{booking.pickup_date} at {booking.pickup_time}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Vehicle</span>
            <span className="font-medium text-[#0A0A0A]">{VEHICLE_LABELS[booking.vehicle_type] || booking.vehicle_type}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Passengers / Luggage</span>
            <span className="font-medium text-[#0A0A0A]">{booking.passengers} pax, {booking.luggage} bags</span>
          </div>
          <div className="border-t border-[#DDE2E9] pt-4 flex justify-between items-center">
            <span className="font-bold text-[#0A0A0A]">Amount due</span>
            <span className="text-2xl font-bold text-[#0074C8]">GHS {Number(booking.price).toFixed(2)}</span>
          </div>
        </div>
        <div className="p-6 pt-0 flex flex-col gap-3">
          <button
            onClick={handlePayNow}
            disabled={paying}
            className="w-full py-4 bg-gradient-to-r from-[#0074C8] to-[#0097F2] text-white font-bold rounded-xl hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {paying ? (
              <>
                <i className="ri-loader-4-line animate-spin text-xl"></i>
                Redirecting to payment...
              </>
            ) : (
              <>
                <i className="ri-bank-card-line text-xl"></i>
                Pay Now
              </>
            )}
          </button>
          <Link href="/booking" className="text-center text-sm text-[#0074C8] hover:underline">
            Cancel and return to booking
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function BookingPayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <i className="ri-loader-4-line animate-spin text-4xl text-[#0074C8]"></i>
      </div>
    }>
      <PayContent />
    </Suspense>
  );
}
