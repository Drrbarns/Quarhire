
'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  generatePaymentReference,
  formatBookingDescription,
  type BookingData
} from '@/lib/hubtel';

function BookingFormContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupLocation: 'Kotoka International Airport',
    customPickupLocation: '',
    destination: serviceParam || '',
    customDestination: '',
    airline: '',
    flightNumber: '',
    vehicleType: 'economy',
    date: '',
    time: '',
    passengers: 1,
    luggage: 1,
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');


  // Fixed pricing per vehicle type
  const vehiclePrices: { [key: string]: number } = {
    'economy': 5,      // Sedan (TEST PRICE - change back to 600 for production)
    'suv': 1500,         // Premium SUV
    'executive': 900,    // Mini SUV
    'van': 2000          // Executive Van
  };

  const calculatePrice = () => {
    const basePrice = vehiclePrices[formData.vehicleType] || 0;

    return {
      basePrice,
      total: basePrice.toFixed(2)
    };
  };

  const priceBreakdown = calculatePrice();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'passengers' || name === 'luggage' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = async (includePayment: boolean) => {
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Generate booking reference
      const bookingRef = `QRHRE-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

      // Prepare email data for the booking email API
      const emailData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        pickupLocation: formData.customPickupLocation || formData.pickupLocation,
        destination: formData.customDestination || formData.destination,
        customDestination: formData.customDestination,
        airline: formData.airline,
        flightNumber: formData.flightNumber,
        vehicleType: formData.vehicleType,
        date: formData.date,
        time: formData.time,
        passengers: formData.passengers,
        luggage: formData.luggage,
        specialRequests: formData.specialRequests,
        estimatedPrice: `GHS ${priceBreakdown.total}`,
        bookingReference: bookingRef,
        paymentStatus: includePayment ? 'paid' : 'reserved',
        paymentReference: includePayment ? bookingRef : undefined
      };

      // Send booking confirmation emails to customer and admin
      try {
        const emailResponse = await fetch('/api/booking/email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(emailData)
        });

        if (emailResponse.ok) {
          const emailResult = await emailResponse.json();
          console.log('Email sent successfully:', emailResult);
        } else {
          const errorData = await emailResponse.json();
          console.warn('Email API returned error:', errorData);
        }
      } catch (emailError) {
        console.warn('Email sending failed:', emailError);
        // Continue anyway - we'll still show success to user
      }

      // Also try to submit to external API (legacy)
      try {
        const submitData = new URLSearchParams();
        Object.entries(formData).forEach(([key, value]) => {
          submitData.append(key, value.toString());
        });
        submitData.append('estimatedPrice', `GHS ${priceBreakdown.total}`);
        submitData.append('paymentIncluded', includePayment ? 'Yes' : 'No');
        submitData.append('bookingReference', bookingRef);

        const response = await fetch('https://readdy.ai/api/public/form/submit/cm6a0rvqr000bqhz2aqwxqvqy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: submitData.toString()
        });

        if (!response.ok) {
          console.warn('External API returned non-OK status:', response.status);
        }
      } catch (apiError) {
        console.warn('External API submission failed:', apiError);
        // Continue anyway - we'll still show success to user
      }

      // Show success message
      if (includePayment) {
        setSubmitMessage('Initiating payment... Please wait.');

        try {
          // Create Hubtel checkout session
          const bookingData: BookingData = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            pickupLocation: formData.customPickupLocation || formData.pickupLocation,
            destination: formData.destination,
            customDestination: formData.customDestination,
            airline: formData.airline,
            flightNumber: formData.flightNumber,
            vehicleType: formData.vehicleType,
            date: formData.date,
            time: formData.time,
            passengers: formData.passengers,
            luggage: formData.luggage,
            specialRequests: formData.specialRequests,
            estimatedPrice: `GHS ${priceBreakdown.total}`
          };

          const checkoutResponse = await fetch('/api/hubtel/checkout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              totalAmount: parseFloat(priceBreakdown.total),
              description: formatBookingDescription(bookingData),
              clientReference: bookingRef,
              name: formData.name,
              email: formData.email,
              phone: formData.phone
            })
          });

          const checkoutData = await checkoutResponse.json();

          if (checkoutData.success && checkoutData.checkoutUrl) {
            setSubmitMessage('Redirecting to payment page...');

            // Store booking data in localStorage for the success page
            const bookingDataForStorage = {
              ...bookingData,
              bookingReference: bookingRef,
              checkoutId: checkoutData.checkoutId
            };
            localStorage.setItem('pendingBooking', JSON.stringify(bookingDataForStorage));

            // Redirect to Hubtel checkout page
            window.location.href = checkoutData.checkoutUrl;
            return; // Don't reset form - user will be redirected
          } else {
            setSubmitMessage(`Payment initialization failed: ${checkoutData.message || 'Please try again or contact support.'}`);
          }
        } catch (paymentError) {
          console.error('Payment error:', paymentError);
          setSubmitMessage('Payment system error. Your booking has been saved. Please try paying again or contact us at +233 240 665 648');
        }
      } else {
        // Show booking details to user
        setSubmitMessage(`Booking reserved successfully! A confirmation email has been sent to ${formData.email}.
        
Booking Details:
📋 Reference: ${bookingRef}
📅 Date: ${formData.date} at ${formData.time}
🚗 Vehicle: ${formData.vehicleType === 'economy' ? 'Sedan' : formData.vehicleType === 'executive' ? 'Mini SUV' : formData.vehicleType === 'suv' ? 'Premium SUV' : 'Executive Van'}
📍 Pickup: ${formData.customPickupLocation || formData.pickupLocation}
📍 Destination: ${formData.customDestination || formData.destination}
💰 Price: GHS ${priceBreakdown.total}

We'll contact you at ${formData.phone} to confirm your booking!`);
      }

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          pickupLocation: 'Kotoka International Airport',
          customPickupLocation: '',
          destination: '',
          customDestination: '',
          airline: '',
          flightNumber: '',
          vehicleType: 'economy',
          date: '',
          time: '',
          passengers: 1,
          luggage: 1,
          specialRequests: ''
        });
        setSubmitMessage('');
      }, includePayment ? 3000 : 10000);

    } catch (error) {
      console.error('Submission error:', error);
      setSubmitMessage('An error occurred. Please try again or call us at +233 240 665 648');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-[#DDE2E9]/20">
      <section className="relative min-h-[400px] sm:min-h-[500px] bg-[#0A0A0A] text-white overflow-hidden flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Professional%20airport%20transfer%20booking%20desk%20at%20modern%20travel%20agency%2C%20friendly%20African%20staff%20helping%20travelers%20with%20reservations%2C%20clean%20contemporary%20office%20interior%20with%20computers%20and%20comfortable%20seating%2C%20warm%20welcoming%20atmosphere%2C%20bright%20natural%20lighting%2C%20high-end%20customer%20service%20environment%2C%20professional%20business%20setting&width=1920&height=800&seq=booking-hero-bg&orientation=landscape"
            alt="Book Your Airport Transfer"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-16 sm:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[#0074C8]/20 backdrop-blur-sm border border-[#0074C8]/30 rounded-full px-4 sm:px-6 py-2 mb-4 sm:mb-6">
              <p className="text-[#0097F2] font-medium text-sm sm:text-base">Easy Booking Process</p>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Book Your Airport Transfer
            </h1>
            <p className="text-lg sm:text-xl text-[#DDE2E9] max-w-2xl mx-auto px-4">
              Reserve your ride in minutes. Professional service, transparent pricing, and guaranteed comfort for your journey.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 lg:py-20 relative">
        <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#0074C8]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#0097F2]/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-[#DDE2E9]/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#0074C8] to-[#0097F2] p-6 sm:p-8 text-white">
                    <div className="flex items-center gap-3 sm:gap-4 mb-2">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl">
                        <i className="ri-calendar-check-line text-xl sm:text-2xl w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"></i>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-bold">Reservation Details</h2>
                    </div>
                    <p className="text-white/90 text-base sm:text-lg">Fill in your travel information below</p>
                  </div>

                  <form id="booking-form" data-readdy-form className="p-6 sm:p-8">
                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0A] mb-4 sm:mb-6 flex items-center gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-[#0074C8]/10 rounded-lg">
                          <i className="ri-user-line text-[#0074C8] w-4 h-4 flex items-center justify-center"></i>
                        </div>
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="sm:col-span-1">
                          <label className="block text-sm font-bold text-[#0A0A0A] mb-2 sm:mb-3">Full Name *</label>
                          <input
                            type="text"
                            required
                            className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-[#DDE2E9] rounded-xl focus:outline-none focus:border-[#0074C8] transition-all text-sm sm:text-base bg-[#DDE2E9]/20"
                            placeholder="John Doe"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="sm:col-span-1">
                          <label className="block text-sm font-bold text-[#0A0A0A] mb-2 sm:mb-3">Email Address *</label>
                          <input
                            type="email"
                            required
                            className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-[#DDE2E9] rounded-xl focus:outline-none focus:border-[#0074C8] transition-all text-sm sm:text-base bg-[#DDE2E9]/20"
                            placeholder="john@example.com"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-bold text-[#0A0A0A] mb-2 sm:mb-3">Phone Number *</label>
                          <input
                            type="tel"
                            required
                            className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-[#DDE2E9] rounded-xl focus:outline-none focus:border-[#0074C8] transition-all text-sm sm:text-base bg-[#DDE2E9]/20"
                            placeholder="+233 240 665 648"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0A] mb-4 sm:mb-6 flex items-center gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-[#0097F2]/10 rounded-lg">
                          <i className="ri-map-pin-line text-[#0097F2] w-4 h-4 flex items-center justify-center"></i>
                        </div>
                        Trip Details
                      </h3>
                      <div className="space-y-4 sm:space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-[#0A0A0A] mb-2 sm:mb-3">Pickup Location *</label>
                          <div className="relative">
                            <input
                              type="text"
                              required
                              disabled
                              className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-[#DDE2E9] rounded-xl text-sm sm:text-base bg-[#DDE2E9]/40 cursor-not-allowed"
                              value={formData.pickupLocation}
                              readOnly
                            />
                            <i className="ri-lock-line absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#0074C8] pointer-events-none text-lg sm:text-xl w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
                          </div>

                        </div>

                        <div>
                          <label className="block text-sm font-bold text-[#0A0A0A] mb-2 sm:mb-3">Custom Pickup Location</label>
                          <div className="relative">
                            <input
                              type="text"
                              name="customPickupLocation"
                              className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-[#DDE2E9] rounded-xl focus:outline-none focus:border-[#0074C8] transition-all text-sm sm:text-base bg-white"
                              placeholder="Enter your specific pickup address (e.g., Hotel name, street address)..."
                              value={formData.customPickupLocation}
                              onChange={handleInputChange}
                            />
                            <i className="ri-map-pin-add-line absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#0074C8] pointer-events-none text-lg sm:text-xl w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
                          </div>
                          <p className="text-xs text-[#2B2F35] mt-1.5">Optional: Specify your exact pickup location within the airport area or nearby</p>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-[#0A0A0A] mb-2 sm:mb-3">Destination *</label>
                          <div className="bg-[#F8FAFB] border border-[#DDE2E9] rounded-xl p-4 sm:p-5 space-y-3">
                            <div>
                              <label className="block text-xs font-semibold text-[#2B2F35] mb-2 uppercase tracking-wide">Select from list</label>
                              <div className="relative">
                                <select
                                  name="destination"
                                  className="w-full px-4 sm:px-5 py-3 sm:py-4 pr-10 sm:pr-12 border-2 border-[#DDE2E9] rounded-xl focus:outline-none focus:border-[#0074C8] transition-all appearance-none cursor-pointer text-sm sm:text-base bg-white font-medium"
                                  value={formData.destination}
                                  onChange={(e) => {
                                    setFormData(prev => ({ ...prev, destination: e.target.value, customDestination: '' }));
                                  }}
                                >
                                  <option value="">Choose a location...</option>
                                  <option value="Accra Mall">Accra Mall</option>
                                  <option value="Labadi Beach">Labadi Beach</option>
                                  <option value="Osu Oxford Street">Osu Oxford Street</option>
                                  <option value="Tema">Tema</option>
                                  <option value="East Legon">East Legon</option>
                                  <option value="West Legon">West Legon</option>
                                  <option value="Cantonments">Cantonments</option>
                                  <option value="Osu">Osu</option>
                                  <option value="Labone">Labone</option>
                                  <option value="Airport Residential Area">Airport Residential Area</option>
                                  <option value="Roman Ridge">Roman Ridge</option>
                                  <option value="Ridge">Ridge</option>
                                  <option value="Dzorwulu">Dzorwulu</option>
                                  <option value="Trasacco Valley">Trasacco Valley</option>
                                  <option value="Lakeside Estate">Lakeside Estate</option>
                                  <option value="Teshie">Teshie</option>
                                  <option value="Nungua">Nungua</option>
                                  <option value="Spintex Road">Spintex Road</option>
                                  <option value="McCarthy Hill">McCarthy Hill</option>
                                  <option value="Dansoman">Dansoman</option>
                                  <option value="Dansoman Estates">Dansoman Estates</option>
                                  <option value="Kokomlemle">Kokomlemle</option>
                                  <option value="Adabraka">Adabraka</option>
                                  <option value="Asylum Down">Asylum Down</option>
                                  <option value="Kaneshie">Kaneshie</option>
                                  <option value="Odorkor">Odorkor</option>
                                  <option value="Mallam">Mallam</option>
                                  <option value="Mallam Junction">Mallam Junction</option>
                                  <option value="Weija">Weija</option>
                                  <option value="Sakumono">Sakumono</option>
                                  <option value="Teshie-Nungua">Teshie-Nungua</option>
                                  <option value="La">La</option>
                                  <option value="Labadi">Labadi</option>
                                  <option value="Jamestown">Jamestown</option>
                                  <option value="Ussher Town">Ussher Town</option>
                                  <option value="James Town">James Town</option>
                                  <option value="Korle Bu">Korle Bu</option>
                                  <option value="Korle Gonno">Korle Gonno</option>
                                  <option value="Mamprobi">Mamprobi</option>
                                  <option value="Chorkor">Chorkor</option>
                                  <option value="Gbawe">Gbawe</option>
                                  <option value="Awoshie">Awoshie</option>
                                  <option value="Pokuase">Pokuase</option>
                                  <option value="Achimota">Achimota</option>
                                  <option value="Achimota Forest">Achimota Forest</option>
                                  <option value="Ring Road">Ring Road</option>
                                  <option value="Kanda">Kanda</option>
                                  <option value="Nima">Nima</option>
                                  <option value="Mamobi">Mamobi</option>
                                  <option value="New Town">New Town</option>
                                  <option value="Old Fadama">Old Fadama</option>
                                  <option value="Abelemkpe">Abelemkpe</option>
                                  <option value="Tesano">Tesano</option>
                                  <option value="Alajo">Alajo</option>
                                  <option value="Kwashieman">Kwashieman</option>
                                  <option value="Darkuman">Darkuman</option>
                                  <option value="Kokrobite">Kokrobite</option>
                                  <option value="Bortianor">Bortianor</option>
                                  <option value="Spintex">Spintex</option>
                                  <option value="Madina">Madina</option>
                                  <option value="Aburi">Aburi</option>
                                </select>
                                <i className="ri-arrow-down-s-line absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#0074C8] pointer-events-none text-lg sm:text-xl w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
                              </div>
                            </div>

                            <div className="relative">
                              <div className="flex items-center gap-2 mb-2">
                                <div className="h-px flex-1 bg-[#DDE2E9]"></div>
                                <span className="text-xs font-medium text-[#2B2F35] uppercase tracking-wide">Or</span>
                                <div className="h-px flex-1 bg-[#DDE2E9]"></div>
                              </div>
                              <label className="block text-xs font-semibold text-[#2B2F35] mb-2 uppercase tracking-wide">Enter custom location</label>
                              <div className="relative">
                                <input
                                  type="text"
                                  name="customDestination"
                                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-[#DDE2E9] rounded-xl focus:outline-none focus:border-[#0074C8] transition-all text-sm sm:text-base bg-white"
                                  placeholder="Type your destination address..."
                                  value={formData.customDestination}
                                  onChange={(e) => {
                                    setFormData(prev => ({ ...prev, customDestination: e.target.value, destination: '' }));
                                  }}
                                />
                                <i className="ri-edit-line absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-[#0074C8] pointer-events-none text-lg sm:text-xl w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
                              </div>
                            </div>

                            {(formData.destination || formData.customDestination) && (
                              <div className="pt-2 border-t border-[#DDE2E9]">
                                <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                                  <i className="ri-check-circle-fill"></i>
                                  <span>Selected: {formData.customDestination || formData.destination}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-[#0A0A0A] mb-2 sm:mb-3">Pickup Date *</label>
                          <input
                            type="date"
                            required
                            className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-[#DDE2E9] rounded-xl focus:outline-none focus:border-[#0074C8] transition-all text-sm sm:text-base bg-[#DDE2E9]/20"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-[#0A0A0A] mb-2 sm:mb-3">Pickup Time *</label>
                          <input
                            type="time"
                            required
                            className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-[#DDE2E9] rounded-xl focus:outline-none focus:border-[#0074C8] transition-all text-sm sm:text-base bg-[#DDE2E9]/20"
                            name="time"
                            value={formData.time}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-[#0A0A0A] mb-2 sm:mb-3">Airline</label>
                          <input
                            type="text"
                            className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-[#DDE2E9] rounded-xl focus:outline-none focus:border-[#0074C8] transition-all text-sm sm:text-base bg-[#DDE2E9]/20"
                            placeholder="e.g., Emirates, KLM, British Airways"
                            name="airline"
                            value={formData.airline}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-[#0A0A0A] mb-2 sm:mb-3">Flight Number</label>
                          <input
                            type="text"
                            className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-[#DDE2E9] rounded-xl focus:outline-none focus:border-[#0074C8] transition-all text-sm sm:text-base bg-[#DDE2E9]/20"
                            placeholder="e.g., EK787, KL590"
                            name="flightNumber"
                            value={formData.flightNumber}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 sm:mb-8">
                      <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0A] mb-4 sm:mb-6 flex items-center gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-[#0074C8]/10 rounded-lg">
                          <i className="ri-car-line text-[#0074C8] w-4 h-4 flex items-center justify-center"></i>
                        </div>
                        Vehicle & Passengers
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        <div className="sm:col-span-2">
                          <label className="block text-sm font-bold text-[#0A0A0A] mb-2 sm:mb-3">Vehicle Type *</label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {[
                              { value: 'economy', label: 'Sedan', capacity: '1-4 passengers', icon: 'ri-car-line' },
                              { value: 'suv', label: 'Premium SUV', capacity: '1-5 passengers', icon: 'ri-truck-line' },
                              { value: 'executive', label: 'Mini SUV', capacity: '1-4 passengers', icon: 'ri-car-line' },
                              { value: 'van', label: 'Executive Van', capacity: '1-7 passengers', icon: 'ri-bus-line' }
                            ].map((vehicle) => (
                              <label
                                key={vehicle.value}
                                className={`relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.vehicleType === vehicle.value
                                  ? 'border-[#0074C8] bg-[#0074C8]/5'
                                  : 'border-[#DDE2E9] hover:border-[#0074C8]/50'
                                  }`}
                              >
                                <input
                                  type="radio"
                                  name="vehicleType"
                                  value={vehicle.value}
                                  checked={formData.vehicleType === vehicle.value}
                                  onChange={handleInputChange}
                                  className="sr-only"
                                />
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg ${formData.vehicleType === vehicle.value ? 'bg-[#0074C8]' : 'bg-[#DDE2E9]'
                                  }`}>
                                  <i className={`${vehicle.icon} text-lg sm:text-xl w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center ${formData.vehicleType === vehicle.value ? 'text-white' : 'text-[#0A0A0A]'
                                    }`}></i>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-bold text-[#0A0A0A] text-sm sm:text-base truncate">{vehicle.label}</div>
                                  <div className="text-xs sm:text-sm text-[#2B2F35]">{vehicle.capacity}</div>
                                </div>
                                {formData.vehicleType === vehicle.value && (
                                  <i className="ri-check-circle-fill text-[#0074C8] text-lg sm:text-xl w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center flex-shrink-0"></i>
                                )}
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-[#0A0A0A] mb-2 sm:mb-3">Number of Passengers *</label>
                          <input
                            type="number"
                            min="1"
                            max="7"
                            required
                            className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-[#DDE2E9] rounded-xl focus:outline-none focus:border-[#0074C8] transition-all text-sm sm:text-base bg-[#DDE2E9]/20"
                            name="passengers"
                            value={formData.passengers}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-[#0A0A0A] mb-2 sm:mb-3">Number of Luggage *</label>
                          <input
                            type="number"
                            min="0"
                            max="10"
                            required
                            className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-[#DDE2E9] rounded-xl focus:outline-none focus:border-[#0074C8] transition-all text-sm sm:text-base bg-[#DDE2E9]/20"
                            name="luggage"
                            value={formData.luggage}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-6 sm:mb-8">
                      <label className="block text-sm font-bold text-[#0A0A0A] mb-2 sm:mb-3">Special Requests</label>
                      <textarea
                        name="specialRequests"
                        maxLength={500}
                        rows={4}
                        className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-[#DDE2E9] rounded-xl focus:outline-none focus:border-[#0074C8] transition-all resize-none text-sm sm:text-base bg-[#DDE2E9]/20"
                        placeholder="Any special requirements or notes..."
                        value={formData.specialRequests}
                        onChange={handleInputChange}
                      />
                      <div className="text-right text-xs sm:text-sm text-[#2B2F35] mt-2">
                        {formData.specialRequests.length}/500 characters
                      </div>
                    </div>

                    {submitMessage && (
                      <div className={`mb-4 sm:mb-6 p-4 rounded-xl ${submitMessage.includes('success') || submitMessage.includes('saved')
                        ? 'bg-green-50 border-2 border-green-200 text-green-800'
                        : 'bg-red-50 border-2 border-red-200 text-red-800'
                        }`}>
                        <div className="flex items-center gap-3">
                          <i className={`${submitMessage.includes('success') || submitMessage.includes('saved')
                            ? 'ri-check-circle-fill'
                            : 'ri-error-warning-fill'
                            } text-lg sm:text-xl w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center`}></i>
                          <span className="font-semibold text-sm sm:text-base">{submitMessage}</span>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <button
                        type="button"
                        onClick={() => handleSubmit(false)}
                        disabled={isSubmitting || (!formData.destination && !formData.customDestination)}
                        className="w-full bg-[#0A0A0A] text-white py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg hover:bg-[#2B2F35] hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap flex items-center justify-center gap-2 sm:gap-3"
                      >
                        <i className="ri-bookmark-line text-lg sm:text-xl w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
                        <span className="hidden sm:inline">Reserve Now (No Payment)</span>
                        <span className="sm:hidden">Reserve Now</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSubmit(true)}
                        disabled={isSubmitting || (!formData.destination && !formData.customDestination)}
                        className="w-full bg-gradient-to-r from-[#0074C8] to-[#0097F2] text-white py-4 sm:py-5 rounded-xl font-bold text-base sm:text-lg hover:shadow-2xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap flex items-center justify-center gap-2 sm:gap-3"
                      >
                        <i className="ri-bank-card-line text-lg sm:text-xl w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
                        <span className="hidden sm:inline">Book Now & Pay</span>
                        <span className="sm:hidden">Book & Pay</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
                  <div className="bg-gradient-to-br from-[#0074C8] to-[#0097F2] rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 text-white">
                    <div className="flex items-center gap-3 mb-6 sm:mb-8">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-xl">
                        <i className="ri-calculator-line text-xl sm:text-2xl w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"></i>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold">Price Estimate</h3>
                    </div>

                    <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                      <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-white/20">
                        <span className="text-white/80 text-sm sm:text-base">Vehicle Type Price</span>
                        <span className="font-bold text-base sm:text-lg">GHS {priceBreakdown.basePrice.toFixed(2)}</span>
                      </div>

                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
                      <div className="text-white/80 text-xs sm:text-sm mb-2">Estimated Total</div>
                      <div className="text-3xl sm:text-4xl font-bold">GHS {priceBreakdown.total}</div>
                    </div>

                    <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm text-white/90">
                      <div className="flex items-start gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm p-3 sm:p-4 rounded-xl">
                        <i className="ri-information-line mt-0.5 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
                        <span>Fixed price based on vehicle type selected</span>
                      </div>

                    </div>
                  </div>

                  <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-[#DDE2E9]/50 p-6 sm:p-8">
                    <div className="flex items-center gap-3 mb-4 sm:mb-6">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-[#0074C8]/10 rounded-lg">
                        <i className="ri-customer-service-2-line text-[#0074C8] text-lg sm:text-xl w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-[#0A0A0A]">Need Help?</h4>
                    </div>
                    <p className="text-[#2B2F35] mb-4 sm:mb-6 text-sm sm:text-base">Our team is available 24/7 to assist you with your booking</p>
                    <div className="space-y-2 sm:space-y-3">
                      <a href="tel:+233240665648" className="flex items-center gap-2 sm:gap-3 text-[#0074C8] hover:text-[#0097F2] font-semibold transition-colors text-sm sm:text-base">
                        <i className="ri-phone-line w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
                        +233 240 665 648
                      </a>
                      <a href="https://wa.me/233240665648" className="flex items-center gap-2 sm:gap-3 text-[#0074C8] hover:text-[#0097F2] font-semibold transition-colors text-sm sm:text-base">
                        <i className="ri-whatsapp-line w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center"></i>
                        WhatsApp Us
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-[#DDE2E9]/50 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-gradient-to-br from-[#0074C8] to-[#0097F2] rounded-xl mb-4 sm:mb-6">
                  <i className="ri-time-line text-white text-xl sm:text-2xl w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0A] mb-3 sm:mb-4">Quick Response</h3>
                <p className="text-[#2B2F35] leading-relaxed text-sm sm:text-base">We'll confirm your booking within 30 minutes and send you all the details via email and SMS.</p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-[#DDE2E9]/50 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-gradient-to-br from-[#0074C8] to-[#0097F2] rounded-xl mb-4 sm:mb-6">
                  <i className="ri-shield-check-line text-white text-xl sm:text-2xl w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0A] mb-3 sm:mb-4">Safe & Secure</h3>
                <p className="text-[#2B2F35] leading-relaxed text-sm sm:text-base">Licensed drivers, insured vehicles, and strict safety protocols for your peace of mind.</p>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg border border-[#DDE2E9]/50 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-gradient-to-br from-[#0074C8] to-[#0097F2] rounded-xl mb-4 sm:mb-6">
                  <i className="ri-calendar-close-line text-white text-xl sm:text-2xl w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center"></i>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0A0A0A] mb-3 sm:mb-4">Free Cancellation</h3>
                <p className="text-[#2B2F35] leading-relaxed text-sm sm:text-base">Cancel or modify your booking up to 2 hours before pickup time at no extra charge.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-gradient-to-br from-[#F8FAFB] to-[#F0F4F8] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#0074C8] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-[#0097F2] rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-[#0A0A0A]">What Happens After Booking?</h2>
              <p className="text-lg sm:text-xl text-[#2B2F35] px-4">Your journey to a seamless airport transfer experience</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white border border-[#DDE2E9] rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#0074C8] rounded-xl flex-shrink-0">
                    <span className="text-lg sm:text-2xl font-bold text-white">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#0A0A0A]">Instant Confirmation</h3>
                    <p className="text-[#2B2F35] leading-relaxed text-sm sm:text-base">Receive immediate booking confirmation with reference number and estimated price.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#DDE2E9] rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#0097F2] rounded-xl flex-shrink-0">
                    <span className="text-lg sm:text-2xl font-bold text-white">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#0A0A0A]">Driver Assignment</h3>
                    <p className="text-[#2B2F35] leading-relaxed text-sm sm:text-base">We'll assign a professional driver and send you their details 24 hours before pickup.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#DDE2E9] rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#0074C8] rounded-xl flex-shrink-0">
                    <span className="text-lg sm:text-2xl font-bold text-white">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#0A0A0A]">Flight Monitoring</h3>
                    <p className="text-[#2B2F35] leading-relaxed text-sm sm:text-base">We track your flight status and adjust pickup time automatically for any delays.</p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-[#DDE2E9] rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all">
                <div className="flex items-start gap-3 sm:gap-4 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-[#0097F2] rounded-xl flex-shrink-0">
                    <span className="text-lg sm:text-2xl font-bold text-white">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[#0A0A0A]">Meet & Greet</h3>
                    <p className="text-[#2B2F35] leading-relaxed text-sm sm:text-base">Your driver will be waiting at arrivals with a name board for easy identification.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function Booking() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-[#0074C8] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#2B2F35] text-sm sm:text-base">Loading booking form...</p>
        </div>
      </div>
    }>
      <BookingFormContent />
    </Suspense>
  );
}
