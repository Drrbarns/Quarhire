'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [showVehiclePicker, setShowVehiclePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const datePickerRef = useRef<HTMLDivElement>(null);
  const locationPickerRef = useRef<HTMLDivElement>(null);
  const vehiclePickerRef = useRef<HTMLDivElement>(null);

  const slides = [
    'https://static.readdy.ai/image/8e94e1476ded2dfd78d904370fe1b75f/3ad36e7dbb4cdee890de83fd045b7b20.jpeg',
    'https://readdy.ai/api/search-image?query=Brand%20new%20modern%20white%20Toyota%20Hiace%20premium%20passenger%20van%20parked%20at%20Kotoka%20International%20Airport%20Ghana%20during%20golden%20hour%20sunset%2C%20latest%20model%20luxury%20minibus%2C%20sleek%20contemporary%20design%2C%20warm%20orange%20sunset%20lighting%2C%20professional%20airport%20shuttle%20service%20vehicle%2C%20high-end%20automotive%20photography%2C%20pristine%20condition%2C%20spacious%20comfortable%20transport%20for%20groups%2C%20welcoming%20atmosphere&width=1920&height=1080&seq=hero-slide-toyota-hiace-new&orientation=landscape',
    'https://readdy.ai/api/search-image?query=Professional%20African%20chauffeur%20in%20formal%20uniform%20holding%20welcome%20sign%20at%20airport%20arrivals%20hall%2C%20smiling%20warmly%2C%20modern%20airport%20interior%2C%20bright%20natural%20lighting%2C%20premium%20meet%20and%20greet%20service%2C%20professional%20hospitality%20photography%2C%20clean%20contemporary%20setting%2C%20welcoming%20gesture&width=1920&height=1080&seq=hero-slide-updated-3&orientation=landscape'
  ];

  const accraAreas = [
    'East Legon', 'West Legon', 'Cantonments', 'Osu', 'Labone', 'Airport Residential',
    'Roman Ridge', 'Ridge', 'Dzorwulu', 'Trasacco Valley', 'Lakeside Estate', 'Teshie',
    'Nungua', 'Tema', 'Spintex Road', 'McCarthy Hill', 'Dansoman', 'Kokomlemle',
    'Adabraka', 'Asylum Down', 'Kaneshie', 'Odorkor', 'Mallam', 'Kasoa',
    'Weija', 'Sakumono', 'Teshie-Nungua', 'La', 'Labadi', 'Jamestown',
    'Ussher Town', 'James Town', 'Korle Bu', 'Korle Gonno', 'Mamprobi', 'Chorkor',
    'Dansoman', 'Dansoman Estates', 'Gbawe', 'Mallam Junction', 'Awoshie', 'Pokuase',
    'Achimota', 'Achimota Forest', 'Dzorwulu', 'Ring Road', 'Kanda', 'Nima',
    'Mamobi', 'New Town', 'Old Fadama', 'Abelemkpe', 'Tesano', 'Alajo',
    'Kwashieman', 'Darkuman', 'Dansoman', 'Kokrobite', 'Bortianor', 'Prampram'
  ];

  const vehicles = [
    { type: 'Sedan', icon: 'ri-car-line', description: 'Comfortable 4-seater for individuals or couples', capacity: '1-4 passengers' },
    { type: 'SUV', icon: 'ri-roadster-line', description: 'Spacious 6-seater with extra luggage space', capacity: '1-6 passengers' },
    { type: 'Van', icon: 'ri-bus-line', description: 'Large 12-seater for groups and families', capacity: '1-12 passengers' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
      if (locationPickerRef.current && !locationPickerRef.current.contains(event.target as Node)) {
        setShowLocationPicker(false);
      }
      if (vehiclePickerRef.current && !vehiclePickerRef.current.contains(event.target as Node)) {
        setShowVehiclePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const filteredAreas = accraAreas.filter(area =>
    area.toLowerCase().includes(searchLocation.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const handleTimeSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedTime(e.target.value);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setShowLocationPicker(false);
    setSearchLocation('');
  };

  const handleVehicleSelect = (vehicle: string) => {
    setSelectedVehicle(vehicle);
    setShowVehiclePicker(false);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url('${slide}')`
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0074C8]/20 via-transparent to-[#0097F2]/20"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <i className="ri-plane-line text-white"></i>
              <span className="text-white text-sm font-medium">Kotoka International Airport</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
                Your Journey,
                <br />
                <span className="bg-gradient-to-r from-[#0097F2] to-[#00B4FF] bg-clip-text text-transparent">
                  Our Promise
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl leading-relaxed">
                Premium airport transfers in Accra. Professional drivers, modern vehicles, and seamless service from touchdown to your destination.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0074C8] text-white rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-[#005da0] hover:shadow-2xl hover:shadow-[#0074C8]/50 hover:scale-105"
              >
                Request Pickup
                <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1"></i>
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md text-white border-2 border-white/30 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-[#0074C8] hover:border-white"
              >
                Explore Services
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center lg:text-left">
                <div className="text-4xl font-bold text-white mb-1">500+</div>
                <div className="text-white/80 text-sm">Happy Customers</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-4xl font-bold text-white mb-1">24/7</div>
                <div className="text-white/80 text-sm">Available</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-4xl font-bold text-white mb-1">5★</div>
                <div className="text-white/80 text-sm">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="relative">
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">Quick Booking</h3>
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-semibold">
                      Instant Confirm
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">Get your ride confirmed in minutes</p>
                </div>

                <div className="space-y-4">
                  {/* Date & Time Picker */}
                  <div className="relative" ref={datePickerRef}>
                    <div 
                      onClick={() => setShowDatePicker(!showDatePicker)}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        selectedDate || selectedTime ? 'bg-[#0074C8]' : 'bg-[#0074C8]/10 group-hover:bg-[#0074C8]'
                      }`}>
                        <i className={`text-xl transition-colors ${
                          selectedDate || selectedTime ? 'text-white' : 'text-[#0074C8] group-hover:text-white'
                        } ri-calendar-line`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Select Date & Time</div>
                        <div className="text-sm text-gray-500">
                          {selectedDate && selectedTime 
                            ? `${formatDate(selectedDate)} at ${selectedTime}`
                            : selectedDate 
                            ? formatDate(selectedDate)
                            : 'Choose your arrival date'
                          }
                        </div>
                      </div>
                      <i className={`ri-arrow-${showDatePicker ? 'up' : 'down'}-s-line text-gray-400 transition-transform`}></i>
                    </div>
                    
                    {showDatePicker && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Date</label>
                            <input
                              type="date"
                              min={new Date().toISOString().split('T')[0]}
                              value={selectedDate}
                              onChange={handleDateSelect}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0074C8] focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Time</label>
                            <input
                              type="time"
                              value={selectedTime}
                              onChange={handleTimeSelect}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0074C8] focus:border-transparent"
                            />
                          </div>
                          <button
                            onClick={() => setShowDatePicker(false)}
                            className="w-full px-4 py-2 bg-[#0074C8] text-white rounded-lg font-semibold hover:bg-[#005da0] transition-colors"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Location Picker */}
                  <div className="relative" ref={locationPickerRef}>
                    <div 
                      onClick={() => setShowLocationPicker(!showLocationPicker)}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        selectedLocation ? 'bg-[#0074C8]' : 'bg-[#0074C8]/10 group-hover:bg-[#0074C8]'
                      }`}>
                        <i className={`text-xl transition-colors ${
                          selectedLocation ? 'text-white' : 'text-[#0074C8] group-hover:text-white'
                        } ri-map-pin-line`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Pickup & Destination</div>
                        <div className="text-sm text-gray-500">
                          {selectedLocation || 'Airport to your location'}
                        </div>
                      </div>
                      <i className={`ri-arrow-${showLocationPicker ? 'up' : 'down'}-s-line text-gray-400 transition-transform`}></i>
                    </div>
                    
                    {showLocationPicker && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-80 overflow-hidden flex flex-col">
                        <div className="p-4 border-b border-gray-200 sticky top-0 bg-white">
                          <input
                            type="text"
                            placeholder="Search areas in Accra..."
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0074C8] focus:border-transparent"
                            autoFocus
                          />
                        </div>
                        <div className="overflow-y-auto max-h-64">
                          {filteredAreas.length > 0 ? (
                            <div className="p-2">
                              {filteredAreas.map((area, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleLocationSelect(area)}
                                  className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3"
                                >
                                  <i className="ri-map-pin-line text-[#0074C8]"></i>
                                  <span className="text-gray-900">{area}</span>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className="p-4 text-center text-gray-500">
                              No areas found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Vehicle Picker */}
                  <div className="relative" ref={vehiclePickerRef}>
                    <div 
                      onClick={() => setShowVehiclePicker(!showVehiclePicker)}
                      className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                        selectedVehicle ? 'bg-[#0074C8]' : 'bg-[#0074C8]/10 group-hover:bg-[#0074C8]'
                      }`}>
                        <i className={`text-xl transition-colors ${
                          selectedVehicle ? 'text-white' : 'text-[#0074C8] group-hover:text-white'
                        } ri-car-line`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">Choose Vehicle</div>
                        <div className="text-sm text-gray-500">
                          {selectedVehicle || 'Sedan, SUV, or Van'}
                        </div>
                      </div>
                      <i className={`ri-arrow-${showVehiclePicker ? 'up' : 'down'}-s-line text-gray-400 transition-transform`}></i>
                    </div>
                    
                    {showVehiclePicker && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
                        <div className="p-2">
                          {vehicles.map((vehicle, index) => (
                            <button
                              key={index}
                              onClick={() => handleVehicleSelect(vehicle.type)}
                              className={`w-full text-left px-4 py-4 hover:bg-gray-50 rounded-lg transition-colors flex items-start gap-4 ${
                                selectedVehicle === vehicle.type ? 'bg-[#0074C8]/5 border border-[#0074C8]/20' : ''
                              }`}
                            >
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                selectedVehicle === vehicle.type ? 'bg-[#0074C8]' : 'bg-gray-100'
                              }`}>
                                <i className={`text-xl ${
                                  selectedVehicle === vehicle.type ? 'text-white' : 'text-gray-600'
                                } ${vehicle.icon}`}></i>
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900 mb-1">{vehicle.type}</div>
                                <div className="text-xs text-gray-500 mb-1">{vehicle.description}</div>
                                <div className="text-xs font-medium text-[#0074C8]">{vehicle.capacity}</div>
                              </div>
                              {selectedVehicle === vehicle.type && (
                                <i className="ri-checkbox-circle-fill text-[#0074C8] text-xl"></i>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Link
                  href={`/booking${selectedDate || selectedTime || selectedLocation || selectedVehicle ? `?date=${selectedDate}&time=${selectedTime}&location=${encodeURIComponent(selectedLocation)}&vehicle=${encodeURIComponent(selectedVehicle)}` : ''}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#0074C8] to-[#0097F2] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-[#0074C8]/30 hover:scale-[1.02]"
                >
                  Request Pickup
                  <i className="ri-arrow-right-line"></i>
                </Link>

                <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-200 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <i className="ri-shield-check-line text-emerald-600"></i>
                    <span>Licensed</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="ri-money-dollar-circle-line text-emerald-600"></i>
                    <span>Fixed Price</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <i className="ri-time-line text-emerald-600"></i>
                    <span>On Time</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'w-10 h-3 bg-white shadow-lg' 
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
