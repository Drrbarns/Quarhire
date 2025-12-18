import FeatureCard from '@/components/FeatureCard';

export default function About() {
  const values = [
    {
      icon: 'ri-time-line',
      title: 'Punctuality',
      description: 'We understand the importance of time. Our flight-tracking system and confirmed bookings ensure we\'re always there when you need us.'
    },
    {
      icon: 'ri-user-star-line',
      title: 'Professionalism',
      description: 'Our courteous, experienced drivers provide exceptional service with local knowledge and customer-focused approach.'
    },
    {
      icon: 'ri-heart-line',
      title: 'Comfort',
      description: 'Well-maintained vehicles and personalized service ensure every journey is comfortable and stress-free.'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Safety',
      description: 'Licensed drivers, insured vehicles, and strict safety protocols guarantee your peace of mind throughout your journey.'
    },
    {
      icon: 'ri-price-tag-3-line',
      title: 'Transparency',
      description: 'Fixed, transparent rates with no hidden fees. You know exactly what you\'re paying before you book.'
    },
    {
      icon: 'ri-customer-service-2-line',
      title: 'Reliability',
      description: '24/7 availability and consistent service quality make us the trusted choice for airport transfers in Accra.'
    }
  ];

  const achievements = [
    {
      number: '500+',
      label: 'Happy Passengers',
      description: 'Successful airport transfers completed',
      icon: 'ri-user-smile-line'
    },
    {
      number: '99.8%',
      label: 'On-Time Rate',
      description: 'Punctuality record maintained',
      icon: 'ri-time-line'
    },
    {
      number: '24/7',
      label: 'Service Hours',
      description: 'Round-the-clock availability',
      icon: 'ri-24-hours-line'
    },
    {
      number: '5★',
      label: 'Average Rating',
      description: 'Customer satisfaction score',
      icon: 'ri-star-fill'
    }
  ];

  return (
    <main>
      <section className="relative py-32 bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://readdy.ai/api/search-image?query=Professional%20airport%20transfer%20service%20at%20Kotoka%20International%20Airport%20Ghana%20during%20golden%20hour%2C%20modern%20luxury%20vehicles%20parked%20at%20terminal%2C%20warm%20sunset%20lighting%20creating%20beautiful%20atmosphere%2C%20premium%20transportation%20service%2C%20wide%20angle%20view%20of%20airport%20with%20planes%20and%20vehicles%2C%20cinematic%20lighting%2C%20high-end%20automotive%20photography&width=1920&height=800&seq=about-hero-background&orientation=landscape"
            alt="QuarHire Airport Transfer Service"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[#0074C8]/20 backdrop-blur-sm border border-[#0074C8]/30 rounded-full px-6 py-2 mb-6">
              <p className="text-[#0097F2] font-medium">Our Story</p>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About QuarHire
            </h1>
            <p className="text-2xl text-[#DDE2E9] mb-6">
              Your trusted partner for reliable airport transfers in Accra, Ghana
            </p>
            <p className="text-lg text-[#DDE2E9]/80 leading-relaxed max-w-3xl mx-auto">
              From the runway to your destination, we drive your comfort with professional service, punctual arrivals, and a commitment to making every journey memorable.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#0074C8]/5 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-[#DDE2E9]/50 rounded-full px-4 py-2 mb-6">
                <span className="text-[#0A0A0A] font-semibold text-sm uppercase tracking-wide">Our Journey</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-8">
                Built on Trust & Excellence
              </h2>
              
              <div className="space-y-6 text-[#2B2F35] leading-relaxed text-lg">
                <p>
                  QuarHire was founded with a simple mission: to make airport transfers in Accra effortless, reliable, and comfortable for every traveler. We recognized the need for a professional transportation service that understands the unique challenges of airport pickups and the importance of first impressions.
                </p>
                <p>
                  Starting as a small family business, we've grown into Accra's trusted airport transfer service, serving thousands of passengers from around the world. Our success is built on the foundation of punctuality, professionalism, and genuine care for our passengers' comfort and safety.
                </p>
                <p>
                  Today, we continue to innovate and improve our services, incorporating flight-tracking technology, expanding our fleet, and training our drivers to provide the warm Ghanaian hospitality that makes every arrival special.
                </p>
              </div>
              
              <div className="mt-8 flex gap-4">
                <div className="bg-gradient-to-r from-[#0074C8] to-[#0097F2] text-white px-6 py-3 rounded-lg font-bold">
                  Est. 2015
                </div>
                <div className="bg-[#DDE2E9] text-[#0A0A0A] px-6 py-3 rounded-lg font-bold">
                  Family Owned
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-[#0074C8]/20 rounded-3xl -z-10"></div>
              <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#DDE2E9]/50 rounded-3xl -z-10"></div>
              
              <img 
                src="https://readdy.ai/api/search-image?query=Professional%20smiling%20African%20taxi%20driver%20in%20smart%20uniform%20standing%20beside%20modern%20luxury%20black%20sedan%20at%20Kotoka%20International%20Airport%20Accra%20Ghana%2C%20welcoming%20posture%20with%20open%20arms%2C%20bright%20sunny%20day%2C%20airport%20terminal%20visible%20in%20background%2C%20high%20quality%20professional%20photography%2C%20warm%20and%20inviting%20atmosphere%2C%20clean%20modern%20vehicle&width=600&height=400&seq=about-driver-new&orientation=landscape"
                alt="QuarHire professional driver"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover object-top relative z-10"
              />
              
              <div className="absolute bottom-8 left-8 bg-white p-6 rounded-xl shadow-xl max-w-xs z-20">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#0074C8]/20 rounded-full">
                    <i className="ri-check-line text-[#0074C8] text-xl w-5 h-5 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <div className="font-bold text-[#0A0A0A] text-lg">Verified Service</div>
                    <div className="text-[#2B2F35] text-sm">Licensed & Insured</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#DDE2E9]/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-white rounded-full px-4 py-2 mb-4">
              <span className="text-[#0074C8] font-semibold text-sm uppercase tracking-wide">What Drives Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-6">
              Our Mission & Values
            </h2>
            <p className="text-xl text-[#2B2F35] max-w-3xl mx-auto">
              We're committed to providing safe, reliable, and comfortable airport transfers while delivering exceptional customer service that reflects the warmth of Ghanaian hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <FeatureCard
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
                accentColor={index % 2 === 0 ? "#0074C8" : "#0097F2"}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-6">
              Why Choose QuarHire?
            </h2>
            <p className="text-xl text-[#2B2F35] max-w-3xl mx-auto mb-12">
              We go beyond just transportation - we provide peace of mind, comfort, and a warm welcome to Ghana.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {achievements.map((achievement, index) => (
              <div key={index} className="group relative bg-gradient-to-br from-[#0074C8]/10 to-[#0097F2]/10 p-8 rounded-2xl border-2 border-[#0074C8]/20 hover:border-[#0074C8] transition-all hover:shadow-xl">
                <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-[#0074C8]/20 rounded-full">
                  <i className={`${achievement.icon} text-[#0074C8] text-xl w-5 h-5 flex items-center justify-center`}></i>
                </div>
                
                <div className="text-4xl md:text-5xl font-bold text-[#0074C8] mb-3 group-hover:scale-110 transition-transform">
                  {achievement.number}
                </div>
                <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">
                  {achievement.label}
                </h3>
                <p className="text-[#2B2F35] text-sm">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <img 
                  src="https://readdy.ai/api/search-image?query=Fleet%20of%20premium%20black%20sedans%20and%20SUVs%20lined%20up%20at%20Kotoka%20International%20Airport%20Ghana%2C%20modern%20well-maintained%20luxury%20vehicles%2C%20professional%20airport%20transfer%20service%2C%20bright%20daylight%20photography%2C%20clean%20polished%20cars%2C%20airport%20terminal%20building%20visible%2C%20organized%20professional%20presentation%2C%20high-end%20transportation%20service&width=600&height=400&seq=about-fleet-new&orientation=landscape"
                  alt="QuarHire fleet"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover object-top"
                />
              </div>
            </div>
            
            <div className="order-1 md:order-2">
              <h3 className="text-3xl font-bold text-[#0A0A0A] mb-8">
                What Sets Us Apart
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-[#DDE2E9]/30 p-5 rounded-xl hover:bg-[#DDE2E9]/50 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#0074C8] rounded-lg flex-shrink-0">
                    <i className="ri-radar-line text-white text-lg w-5 h-5 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A0A0A] mb-1 text-lg">Flight Tracking Technology</h4>
                    <p className="text-[#2B2F35]">We monitor your flight status to ensure timely pickups, even with delays.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 bg-[#DDE2E9]/30 p-5 rounded-xl hover:bg-[#DDE2E9]/50 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#0097F2] rounded-lg flex-shrink-0">
                    <i className="ri-user-smile-line text-white text-lg w-5 h-5 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A0A0A] mb-1 text-lg">Meet & Greet Service</h4>
                    <p className="text-[#2B2F35]">Professional drivers wait at arrivals with name boards for easy identification.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 bg-[#DDE2E9]/30 p-5 rounded-xl hover:bg-[#DDE2E9]/50 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#0074C8] rounded-lg flex-shrink-0">
                    <i className="ri-map-pin-line text-white text-lg w-5 h-5 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A0A0A] mb-1 text-lg">Local Expertise</h4>
                    <p className="text-[#2B2F35]">Our drivers know Accra inside out, ensuring efficient routes and local insights.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 bg-[#DDE2E9]/30 p-5 rounded-xl hover:bg-[#DDE2E9]/50 transition-colors">
                  <div className="w-10 h-10 flex items-center justify-center bg-[#0097F2] rounded-lg flex-shrink-0">
                    <i className="ri-smartphone-line text-white text-lg w-5 h-5 flex items-center justify-center"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A0A0A] mb-1 text-lg">Multiple Booking Options</h4>
                    <p className="text-[#2B2F35]">Book via WhatsApp, phone, or online - whatever works best for you.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-[#0074C8] to-[#0097F2] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -ml-48 -mt-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0A0A0A]/10 rounded-full -mr-48 -mb-48"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience the QuarHire Difference?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied passengers who trust QuarHire for their airport transfers in Accra.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/booking" 
               className="bg-white hover:bg-[#DDE2E9] text-[#0074C8] px-10 py-5 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-3 shadow-xl">
              <i className="ri-calendar-check-line text-xl w-5 h-5 flex items-center justify-center"></i>
              Book Your Transfer
            </a>
            <a href="/contact" 
               className="border-3 border-white hover:bg-white hover:text-[#0074C8] text-white px-10 py-5 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer inline-flex items-center justify-center gap-3 shadow-xl">
              <i className="ri-message-3-line text-xl w-5 h-5 flex items-center justify-center"></i>
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
