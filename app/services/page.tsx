import FeatureCard from '@/components/FeatureCard';

export default function Services() {
  const services = [
    {
      icon: 'ri-plane-line',
      title: 'Airport Pickups & Drop-offs',
      description: 'Professional transfers to and from Kotoka International Airport with flight tracking, meet & greet service, and punctual arrivals.',
      features: ['Flight tracking technology', 'Meet & greet at arrivals', 'Professional name boards', 'Luggage assistance', 'Terminal navigation help']
    },
    {
      icon: 'ri-hotel-line',
      title: 'Hotel & Airbnb Transfers',
      description: 'Comfortable rides to your accommodation with local knowledge, direct routes, and assistance with check-in locations.',
      features: ['Direct hotel transfers', 'Airbnb location assistance', 'Local area knowledge', 'Flexible pickup times', 'Accommodation coordination']
    },
    {
      icon: 'ri-briefcase-line',
      title: 'Corporate & Executive Transport',
      description: 'Premium transportation for business travelers with executive vehicles, professional service, and corporate billing options.',
      features: ['Executive vehicle fleet', 'Professional chauffeurs', 'Corporate billing', 'Meeting coordination', 'Business traveler priority']
    },
    {
      icon: 'ri-group-line',
      title: 'Group & Family Rides',
      description: 'Spacious vehicles for families and groups with ample luggage space, child seat options, and comfortable seating.',
      features: ['Large capacity vehicles', 'Family-friendly service', 'Child seat availability', 'Group coordination', 'Extra luggage space']
    },
    {
      icon: 'ri-user-heart-line',
      title: 'Personalized Meet & Greet',
      description: 'Professional drivers waiting at arrivals with name boards, assistance with luggage, and warm Ghanaian hospitality.',
      features: ['Professional name boards', 'Luggage assistance', 'Arrival hall pickup', 'Personal attention', 'Warm welcome service']
    },
    {
      icon: 'ri-time-line',
      title: '24/7 Service',
      description: 'Round-the-clock availability for early morning flights, late night arrivals, and emergency transportation needs.',
      features: ['24-hour availability', 'Early morning pickups', 'Late night service', 'Emergency transport', 'Holiday coverage']
    }
  ];

  const processSteps = [
    {
      step: '1',
      title: 'Book Your Ride',
      description: 'Choose your preferred booking method - WhatsApp, phone, or online form. Provide your flight details and destination.',
      icon: 'ri-smartphone-line'
    },
    {
      step: '2',
      title: 'Confirmation',
      description: 'Receive booking confirmation with driver details, vehicle information, and pickup instructions.',
      icon: 'ri-check-line'
    },
    {
      step: '3',
      title: 'Flight Tracking',
      description: 'We monitor your flight status and adjust pickup time automatically for delays or early arrivals.',
      icon: 'ri-plane-line'
    },
    {
      step: '4',
      title: 'Meet & Greet',
      description: 'Your driver waits at arrivals with a name board, assists with luggage, and escorts you to the vehicle.',
      icon: 'ri-user-heart-line'
    },
    {
      step: '5',
      title: 'Comfortable Transfer',
      description: 'Enjoy a safe, comfortable ride to your destination with professional service and local insights.',
      icon: 'ri-car-line'
    }
  ];

  return (
    <main>
      <section className="relative py-32 bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Customer%20service%20representative%20helping%20travelers%20at%20Ghana%20airport%2C%20professional%20assistance%20desk%2C%20modern%20airport%20terminal%2C%20helpful%20staff%20providing%20information%2C%20clean%20professional%20environment%2C%20warm%20lighting%2C%20people%20asking%20questions%20and%20getting%20answers%2C%20friendly%20service%20atmosphere&width=1920&height=800&seq=faqs-hero-background&orientation=landscape"
            alt="Airport Transfer Services"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[#0074C8]/20 backdrop-blur-sm border border-[#0074C8]/30 rounded-full px-6 py-2 mb-6">
              <p className="text-[#0097F2] font-medium">Our Services</p>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Airport Transfer Services
            </h1>
            <p className="text-2xl text-[#DDE2E9] mb-6">
              Comprehensive transportation solutions for all your Accra airport transfer needs
            </p>
            <p className="text-lg text-[#DDE2E9]/80 leading-relaxed max-w-3xl mx-auto">
              From individual travelers to large groups, we provide safe, reliable, and comfortable transfers with professional service and transparent pricing.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F8F9FA] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/50 rounded-full blur-3xl -ml-48 -mt-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/50 rounded-full blur-3xl -mr-48 -mb-48"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block bg-[#0074C8]/10 backdrop-blur-sm border border-[#0074C8]/20 rounded-full px-6 py-3 mb-6">
              <span className="text-[#0074C8] font-semibold text-sm uppercase tracking-wide">Our Services</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-6">Complete Range of Services</h2>
            <p className="text-xl text-[#2B2F35] max-w-3xl mx-auto leading-relaxed">Whether you're arriving, departing, or need transportation around Accra, we have the perfect service for your needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-[#DDE2E9]/30 hover:border-[#0074C8]/30 transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0074C8]/10 to-[#0097F2]/10 rounded-full -mr-16 -mt-16"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0074C8] to-[#0097F2] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <i className="ri-plane-line text-3xl text-white w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4 group-hover:text-[#0074C8] transition-colors">Airport Pickups & Drop-offs</h3>
                <p className="text-[#2B2F35] mb-6 leading-relaxed">Professional transfers to and from Kotoka International Airport with flight tracking, meet & greet service, and punctual arrivals.</p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0074C8]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0074C8] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Flight tracking technology</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0074C8]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0074C8] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Meet & greet at arrivals</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0074C8]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0074C8] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Professional name boards</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0074C8]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0074C8] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Luggage assistance</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-[#DDE2E9]/30 hover:border-[#0097F2]/30 transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0097F2]/10 to-[#0074C8]/10 rounded-full -mr-16 -mt-16"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0097F2] to-[#0074C8] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <i className="ri-hotel-line text-3xl text-white w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4 group-hover:text-[#0097F2] transition-colors">Hotel & Airbnb Transfers</h3>
                <p className="text-[#2B2F35] mb-6 leading-relaxed">Comfortable rides to your accommodation with local knowledge, direct routes, and assistance with check-in locations.</p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0097F2]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0097F2] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Direct hotel transfers</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0097F2]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0097F2] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Airbnb location assistance</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0097F2]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0097F2] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Local area knowledge</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0097F2]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0097F2] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Flexible pickup times</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-[#DDE2E9]/30 hover:border-[#0074C8]/30 transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0074C8]/10 to-[#0097F2]/10 rounded-full -mr-16 -mt-16"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0074C8] to-[#0097F2] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <i className="ri-briefcase-line text-3xl text-white w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4 group-hover:text-[#0074C8] transition-colors">Corporate & Executive Transport</h3>
                <p className="text-[#2B2F35] mb-6 leading-relaxed">Premium transportation for business travelers with executive vehicles, professional service, and corporate billing options.</p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0074C8]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0074C8] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Executive vehicle fleet</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0074C8]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0074C8] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Professional chauffeurs</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0074C8]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0074C8] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Corporate billing</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0074C8]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0074C8] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Meeting coordination</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-[#DDE2E9]/30 hover:border-[#0097F2]/30 transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0097F2]/10 to-[#0074C8]/10 rounded-full -mr-16 -mt-16"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0097F2] to-[#0074C8] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <i className="ri-group-line text-3xl text-white w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4 group-hover:text-[#0097F2] transition-colors">Group & Family Rides</h3>
                <p className="text-[#2B2F35] mb-6 leading-relaxed">Spacious vehicles for families and groups with ample luggage space, child seat options, and comfortable seating.</p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0097F2]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0097F2] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Large capacity vehicles</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0097F2]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0097F2] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Family-friendly service</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0097F2]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0097F2] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Child seat availability</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0097F2]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0097F2] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Group coordination</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-[#DDE2E9]/30 hover:border-[#0074C8]/30 transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0074C8]/10 to-[#0097F2]/10 rounded-full -mr-16 -mt-16"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0074C8] to-[#0097F2] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <i className="ri-user-heart-line text-3xl text-white w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4 group-hover:text-[#0074C8] transition-colors">Personalized Meet & Greet</h3>
                <p className="text-[#2B2F35] mb-6 leading-relaxed">Professional drivers waiting at arrivals with name boards, assistance with luggage, and warm Ghanaian hospitality.</p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0074C8]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0074C8] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Professional name boards</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0074C8]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0074C8] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Luggage assistance</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0074C8]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0074C8] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Arrival hall pickup</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0074C8]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0074C8] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Personal attention</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-[#DDE2E9]/30 hover:border-[#0097F2]/30 transform hover:-translate-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0097F2]/10 to-[#0074C8]/10 rounded-full -mr-16 -mt-16"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0097F2] to-[#0074C8] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <i className="ri-time-line text-3xl text-white w-8 h-8 flex items-center justify-center"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4 group-hover:text-[#0097F2] transition-colors">24/7 Service</h3>
                <p className="text-[#2B2F35] mb-6 leading-relaxed">Round-the-clock availability for early morning flights, late night arrivals, and emergency transportation needs.</p>

                <div className="space-y-3">
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0097F2]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0097F2] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">24-hour availability</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0097F2]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0097F2] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Early morning pickups</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0097F2]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0097F2] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Late night service</span>
                  </div>
                  <div className="flex items-center text-sm text-[#2B2F35] bg-[#0097F2]/5 p-3 rounded-lg">
                    <div className="w-6 h-6 bg-[#0097F2] rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      <i className="ri-check-line text-white text-xs w-3 h-3 flex items-center justify-center"></i>
                    </div>
                    <span className="font-medium">Emergency transport</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F8F9FA] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/50 rounded-full blur-3xl -ml-48 -mt-48"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/50 rounded-full blur-3xl -mr-48 -mb-48"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block bg-[#0074C8]/10 backdrop-blur-sm border border-[#0074C8]/20 rounded-full px-6 py-2 mb-6">
              <p className="text-[#0074C8] font-semibold text-sm uppercase tracking-wide">Premium Fleet</p>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-6">
              Choose Your Perfect Ride
            </h2>
            <p className="text-xl text-[#2B2F35] max-w-3xl mx-auto leading-relaxed">
              From comfortable sedans to spacious vans, our diverse fleet ensures the perfect vehicle for every journey and group size.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#DDE2E9]/30">
              <div className="relative overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Modern%20silver%20Honda%20Accord%20sedan%20parked%20at%20Kotoka%20International%20Airport%20Ghana%2C%20professional%20airport%20transfer%20vehicle%2C%20clean%20and%20polished%20exterior%2C%20bright%20daylight%20photography%2C%20airport%20terminal%20visible%20in%20background%2C%20premium%20sedan%20for%20business%20travelers%2C%20high-end%20transportation%20service&width=600&height=300&seq=honda-accord-fleet&orientation=landscape"
                  alt="Honda Accord - Sedan"
                  className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-[#0074C8] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-[#0A0A0A] group-hover:text-[#0074C8] transition-colors">
                    Sedan
                  </h3>
                  <div className="w-12 h-12 bg-[#0074C8]/10 rounded-full flex items-center justify-center group-hover:bg-[#0074C8] transition-colors">
                    <i className="ri-car-line text-[#0074C8] group-hover:text-white text-xl w-5 h-5 flex items-center justify-center"></i>
                  </div>
                </div>

                <p className="text-[#2B2F35] mb-6 leading-relaxed">
                  Perfect for business travelers and couples. Honda Accord offers reliability, comfort, and fuel efficiency for your airport transfer.
                </p>

                <div className="flex items-center gap-8 mb-6 p-4 bg-[#DDE2E9]/30 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0074C8]/20 rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-[#0074C8] text-sm w-4 h-4 flex items-center justify-center"></i>
                    </div>
                    <span className="font-semibold text-[#0A0A0A]">1-3 passengers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0074C8]/20 rounded-full flex items-center justify-center">
                      <i className="ri-luggage-cart-line text-[#0074C8] text-sm w-4 h-4 flex items-center justify-center"></i>
                    </div>
                    <span className="font-semibold text-[#0A0A0A]">2-3 bags</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0074C8] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">Air conditioning</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0074C8] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">Professional driver</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0074C8] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">Clean interior</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0074C8] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">Fuel efficient</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#DDE2E9]/30">
              <div className="relative overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=White%20Toyota%20Land%20Cruiser%20SUV%20parked%20at%20Kotoka%20International%20Airport%20Ghana%2C%20premium%20airport%20transfer%20vehicle%2C%20luxury%20SUV%20for%20family%20groups%2C%20clean%20and%20polished%20exterior%2C%20bright%20daylight%20photography%2C%20airport%20terminal%20visible%20in%20background%2C%20high-end%20transportation%20service&width=600&height=300&seq=landcruiser-fleet&orientation=landscape"
                  alt="Toyota Land Cruiser - SUV"
                  className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-[#0097F2] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Family Choice
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-[#0A0A0A] group-hover:text-[#0097F2] transition-colors">
                    Premium SUV
                  </h3>
                  <div className="w-12 h-12 bg-[#0097F2]/10 rounded-full flex items-center justify-center group-hover:bg-[#0097F2] transition-colors">
                    <i className="ri-car-fill text-[#0097F2] group-hover:text-white text-xl w-5 h-5 flex items-center justify-center"></i>
                  </div>
                </div>

                <p className="text-[#2B2F35] mb-6 leading-relaxed">
                  Ideal for families and groups. Toyota Land Cruiser provides superior comfort, safety, and ample space for passengers and luggage.
                </p>

                <div className="flex items-center gap-8 mb-6 p-4 bg-[#DDE2E9]/30 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0097F2]/20 rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-[#0097F2] text-sm w-4 h-4 flex items-center justify-center"></i>
                    </div>
                    <span className="font-semibold text-[#0A0A0A]">1-6 passengers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0097F2]/20 rounded-full flex items-center justify-center">
                      <i className="ri-luggage-cart-line text-[#0097F2] text-sm w-4 h-4 flex items-center justify-center"></i>
                    </div>
                    <span className="font-semibold text-[#0A0A0A]">4-6 bags</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0097F2] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">Spacious interior</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0097F2] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">High seating</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0097F2] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">Large luggage space</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0097F2] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">Family friendly</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#DDE2E9]/30">
              <div className="relative overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Luxury%20black%20executive%20sedan%20parked%20at%20Kotoka%20International%20Airport%20Ghana%2C%20premium%20business%20class%20vehicle%2C%20leather%20interior%20visible%20through%20windows%2C%20professional%20airport%20transfer%20service%2C%20clean%20and%20polished%20exterior%2C%20bright%20daylight%20photography%2C%20high-end%20transportation%20for%20executives&width=600&height=300&seq=executive-sedan-fleet&orientation=landscape"
                  alt="Mini SUV"
                  className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-[#0074C8] to-[#0097F2] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Executive
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-[#0A0A0A] group-hover:text-[#0074C8] transition-colors">
                    Mini SUV
                  </h3>
                  <div className="w-12 h-12 bg-gradient-to-r from-[#0074C8]/10 to-[#0097F2]/10 rounded-full flex items-center justify-center group-hover:from-[#0074C8] group-hover:to-[#0097F2] transition-all">
                    <i className="ri-vip-crown-line text-[#0074C8] group-hover:text-white text-xl w-5 h-5 flex items-center justify-center"></i>
                  </div>
                </div>

                <p className="text-[#2B2F35] mb-6 leading-relaxed">
                  Premium comfort for business executives and VIP travelers. Featuring luxury amenities and superior service standards.
                </p>

                <div className="flex items-center gap-8 mb-6 p-4 bg-[#DDE2E9]/30 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0074C8]/20 rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-[#0074C8] text-sm w-4 h-4 flex items-center justify-center"></i>
                    </div>
                    <span className="font-semibold text-[#0A0A0A]">1-3 passengers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0074C8]/20 rounded-full flex items-center justify-center">
                      <i className="ri-luggage-cart-line text-[#0074C8] text-sm w-4 h-4 flex items-center justify-center"></i>
                    </div>
                    <span className="font-semibold text-[#0A0A0A]">3-4 bags</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0074C8] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">Premium comfort</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0074C8] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">Leather seats</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0074C8] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">Extra legroom</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0074C8] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">Business amenities</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-[#DDE2E9]/30">
              <div className="relative overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Luxury%20white%20mini%20bus%20parked%20at%20Kotoka%20International%20Airport%20Ghana%2C%20premium%20group%20transportation%20vehicle%2C%20executive%20van%20for%20corporate%20events%2C%20clean%20and%20polished%20exterior%2C%20comfortable%20seating%20visible%20through%20windows%2C%20bright%20daylight%20photography%2C%20high-end%20group%20transfer%20service&width=600&height=300&seq=luxury-minibus-fleet&orientation=landscape"
                  alt="Luxury Mini Bus - Executive Van"
                  className="w-full h-64 object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 right-4 bg-[#0097F2] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Group Travel
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-[#0A0A0A] group-hover:text-[#0097F2] transition-colors">
                    Executive Van
                  </h3>
                  <div className="w-12 h-12 bg-[#0097F2]/10 rounded-full flex items-center justify-center group-hover:bg-[#0097F2] transition-colors">
                    <i className="ri-bus-line text-[#0097F2] group-hover:text-white text-xl w-5 h-5 flex items-center justify-center"></i>
                  </div>
                </div>

                <p className="text-[#2B2F35] mb-6 leading-relaxed">
                  Perfect for large groups and corporate events. Luxury mini bus with maximum comfort and professional service for group transfers.
                </p>

                <div className="flex items-center gap-8 mb-6 p-4 bg-[#DDE2E9]/30 rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0097F2]/20 rounded-full flex items-center justify-center">
                      <i className="ri-user-line text-[#0097F2] text-sm w-4 h-4 flex items-center justify-center"></i>
                    </div>
                    <span className="font-semibold text-[#0A0A0A]">7-12 passengers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#0097F2]/20 rounded-full flex items-center justify-center">
                      <i className="ri-luggage-cart-line text-[#0097F2] text-sm w-4 h-4 flex items-center justify-center"></i>
                    </div>
                    <span className="font-semibold text-[#0A0A0A]">8-12 bags</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0097F2] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">Group transport</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0097F2] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">Maximum comfort</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0097F2] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">Corporate events</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#DDE2E9]/50">
                    <i className="ri-check-line text-[#0097F2] w-4 h-4 flex items-center justify-center"></i>
                    <span className="text-sm text-[#2B2F35]">Tour groups</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-[#0074C8]/10 to-[#0097F2]/10 rounded-2xl p-8 border border-[#0074C8]/20">
              <h3 className="text-2xl font-bold text-[#0A0A0A] mb-4">
                Need Help Choosing?
              </h3>
              <p className="text-[#2B2F35] mb-6 max-w-2xl mx-auto">
                Our team is here to help you select the perfect vehicle for your needs. Contact us for personalized recommendations.
              </p>
              <a href="/contact"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#0074C8] to-[#0097F2] hover:shadow-lg hover:shadow-[#0074C8]/50 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer">
                <i className="ri-customer-service-2-line text-xl w-5 h-5 flex items-center justify-center"></i>
                Get Vehicle Recommendation
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-6">
              How It Works
            </h2>
            <p className="text-xl text-[#2B2F35] max-w-2xl mx-auto">
              Our simple 5-step process ensures a smooth and hassle-free airport transfer experience from booking to destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#0074C8] to-[#0097F2] rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className={`${step.icon} text-2xl text-white w-6 h-6 flex items-center justify-center`}></i>
                </div>
                <div className="w-8 h-8 bg-[#0A0A0A] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold text-[#0A0A0A] mb-3">{step.title}</h3>
                <p className="text-[#2B2F35] text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      <section className="py-20 bg-[#0A0A0A] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Book Your Transfer?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience the QuarHire difference with professional service, transparent pricing, and guaranteed punctuality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/booking"
              className="bg-white hover:bg-[#DDE2E9] text-[#0074C8] px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer">
              Book Now
            </a>
            <a href="https://wa.me/233240665648" target="_blank" rel="noopener noreferrer"
              className="border-2 border-white hover:bg-white hover:text-[#0074C8] text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer flex items-center justify-center">
              <i className="ri-whatsapp-line mr-2 w-5 h-5 flex items-center justify-center"></i>
              WhatsApp Quote
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
