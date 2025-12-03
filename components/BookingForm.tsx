
'use client';

import { useState } from 'react';

export default function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pickupLocation: '',
    destination: '',
    date: '',
    time: '',
    passengers: '1',
    luggage: '1',
    vehicleType: 'economy',
    specialRequests: ''
  });

  const [estimatedPrice, setEstimatedPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const destinationPrices: { [key: string]: number } = {
    'Kotoka International Airport': 50,
    'Accra Mall': 40,
    'Labadi Beach': 45,
    'Osu Oxford Street': 35,
    'Tema': 60,
    'East Legon': 40,
    'Cantonments': 35,
    'Airport Residential Area': 45,
    'Spintex': 50,
    'Madina': 55,
    'Achimota': 45,
    'Dansoman': 50,
    'Kasoa': 70,
    'Weija': 65,
    'Aburi': 80,
    'Akosombo': 120,
    'Cape Coast': 180,
    'Kumasi': 250
  };

  const vehicleMultipliers: { [key: string]: number } = {
    'economy': 1,
    'suv': 1.4,
    'executive': 1.8,
    'van': 2.2
  };

  const calculatePrice = (data: typeof formData) => {
    const basePrice = destinationPrices[data.destination] || 0;
    const vehicleMultiplier = vehicleMultipliers[data.vehicleType] || 1;
    const passengerCharge = Math.max(0, parseInt(data.passengers) - 4) * 15;
    const luggageCharge = Math.max(0, parseInt(data.luggage) - 3) * 10;
    
    const total = (basePrice * vehicleMultiplier) + passengerCharge + luggageCharge;
    return total;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    if (name === 'destination' || name === 'vehicleType' || name === 'passengers' || name === 'luggage') {
      setEstimatedPrice(calculatePrice(newFormData));
    }
  };

  const handleSubmit = async (e: React.FormEvent, withPayment: boolean) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const submitUrl = withPayment 
        ? 'https://readdy.ai/api/form/d4dlfe9pkd5ovn9u69cg'
        : 'https://readdy.ai/api/form/d4dlfe9pkd5ovn9u69d0';

      const formBody = new URLSearchParams();
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('phone', formData.phone);
      formBody.append('pickupLocation', formData.pickupLocation);
      formBody.append('destination', formData.destination);
      formBody.append('date', formData.date);
      formBody.append('time', formData.time);
      formBody.append('passengers', formData.passengers);
      formBody.append('luggage', formData.luggage);
      formBody.append('vehicleType', formData.vehicleType);
      formBody.append('specialRequests', formData.specialRequests);
      formBody.append('estimatedPrice', `GHS ${estimatedPrice.toFixed(2)}`);

      const response = await fetch(submitUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        if (withPayment) {
          const paystackUrl = `https://paystack.com/pay/your-payment-link?amount=${estimatedPrice * 100}&email=${encodeURIComponent(formData.email)}&reference=${Date.now()}`;
          setSubmitMessage('Booking saved! Redirecting to payment...');
          setTimeout(() => {
            window.open(paystackUrl, '_blank');
          }, 1500);
        } else {
          setSubmitMessage('Reservation submitted successfully! We will contact you shortly.');
          setFormData({
            name: '',
            email: '',
            phone: '',
            pickupLocation: '',
            destination: '',
            date: '',
            time: '',
            passengers: '1',
            luggage: '1',
            vehicleType: 'economy',
            specialRequests: ''
          });
          setEstimatedPrice(0);
        }
      } else {
        setSubmitMessage('Submission failed. Please try again.');
      }
    } catch (error) {
      setSubmitMessage('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const basePrice = destinationPrices[formData.destination] || 0;
  const vehicleMultiplier = vehicleMultipliers[formData.vehicleType] || 1;
  const passengerCharge = Math.max(0, parseInt(formData.passengers) - 4) * 15;
  const luggageCharge = Math.max(0, parseInt(formData.luggage) - 3) * 10;

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Book Your Ride</h2>
            <p className="text-gray-600">Fill in the details below to reserve your airport transfer</p>
          </div>

          {submitMessage && (
            <div className={`mb-6 p-4 rounded-lg ${submitMessage.includes('success') || submitMessage.includes('saved') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {submitMessage}
            </div>
          )}

          <form id="booking-form">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  placeholder="+233 XX XXX XXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Location *</label>
                <input
                  type="text"
                  name="pickupLocation"
                  value={formData.pickupLocation}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
                  placeholder="Enter pickup address"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Destination *</label>
                <div className="relative">
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer text-sm bg-white"
                  >
                    <option value="">Select destination</option>
                    {Object.keys(destinationPrices).map(dest => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                  <i className="ri-map-pin-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Vehicle Type *</label>
                <div className="relative">
                  <select
                    name="vehicleType"
                    value={formData.vehicleType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 pr-10 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer text-sm bg-white"
                  >
                    <option value="economy">Economy Sedan (1-4 passengers)</option>
                    <option value="suv">Premium SUV (1-5 passengers)</option>
                    <option value="executive">Executive Sedan (1-4 passengers)</option>
                    <option value="van">Executive Van (1-7 passengers)</option>
                  </select>
                  <i className="ri-car-line absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Date *</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Time *</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Passengers *</label>
                <input
                  type="number"
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleChange}
                  min="1"
                  max="7"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Luggage *</label>
                <input
                  type="number"
                  name="luggage"
                  value={formData.luggage}
                  onChange={handleChange}
                  min="0"
                  max="10"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors text-sm"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests</label>
              <textarea
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                maxLength={500}
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none text-sm"
                placeholder="Any special requirements or notes..."
              ></textarea>
              <div className="text-right text-xs text-gray-500 mt-1">
                {formData.specialRequests.length}/500 characters
              </div>
            </div>

            {estimatedPrice > 0 && (
              <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Estimated Total:</span>
                  <span className="text-2xl font-bold text-blue-600">GHS {estimatedPrice.toFixed(2)}</span>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                disabled={isSubmitting || estimatedPrice === 0}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2"
              >
                <i className="ri-bank-card-line"></i>
                {isSubmitting ? 'Processing...' : 'Book Now & Pay'}
              </button>

              <button
                type="button"
                onClick={(e) => handleSubmit(e, false)}
                disabled={isSubmitting}
                className="w-full bg-gray-800 text-white py-4 rounded-lg font-semibold hover:bg-gray-900 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2"
              >
                <i className="ri-bookmark-line"></i>
                {isSubmitting ? 'Processing...' : 'Reserve Now (No Payment)'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-xl p-6 text-white sticky top-24">
          <h3 className="text-2xl font-bold mb-6">Price Calculator</h3>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center pb-3 border-b border-blue-400">
              <span className="text-blue-100">Base Price</span>
              <span className="font-semibold">GHS {basePrice.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center pb-3 border-b border-blue-400">
              <span className="text-blue-100">Vehicle Type</span>
              <span className="font-semibold">×{vehicleMultiplier}</span>
            </div>

            {passengerCharge > 0 && (
              <div className="flex justify-between items-center pb-3 border-b border-blue-400">
                <span className="text-blue-100">Extra Passengers</span>
                <span className="font-semibold">+GHS {passengerCharge.toFixed(2)}</span>
              </div>
            )}

            {luggageCharge > 0 && (
              <div className="flex justify-between items-center pb-3 border-b border-blue-400">
                <span className="text-blue-100">Extra Luggage</span>
                <span className="font-semibold">+GHS {luggageCharge.toFixed(2)}</span>
              </div>
            )}
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Estimated Total</span>
              <span className="text-3xl font-bold">GHS {estimatedPrice.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-3 text-sm text-blue-100">
            <div className="flex items-start gap-2">
              <i className="ri-information-line mt-0.5 flex-shrink-0"></i>
              <span>Prices are estimates and may vary based on traffic conditions</span>
            </div>
            <div className="flex items-start gap-2">
              <i className="ri-time-line mt-0.5 flex-shrink-0"></i>
              <span>Extra charges apply for passengers beyond 4 and luggage beyond 3 pieces</span>
            </div>
            <div className="flex items-start gap-2">
              <i className="ri-shield-check-line mt-0.5 flex-shrink-0"></i>
              <span>All bookings include insurance and professional driver service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
