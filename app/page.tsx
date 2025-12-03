
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import TestimonialCard from '@/components/TestimonialCard';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <section className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#0074C8]/10 to-[#0097F2]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-[#0097F2]/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative group">
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-[#0097F2]/30 to-[#0074C8]/20 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500">
                <img 
                  src="https://readdy.ai/api/search-image?query=Professional%20luxury%20sedan%20car%20interior%20with%20premium%20leather%20seats%20and%20modern%20dashboard%2C%20clean%20minimalist%20background%2C%20high-end%20vehicle%20interior%2C%20comfortable%20seating%2C%20professional%20transportation%20service%2C%20blue%20accent%20lighting%2C%20modern%20automotive%20design&width=600&height=700&seq=welcome-img&orientation=portrait"
                  alt="Premium Service"
                  className="w-full h-auto object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#0074C8] via-[#0097F2] to-[#0074C8] p-8 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                <div className="text-white text-center">
                  <div className="text-5xl font-extrabold mb-2 bg-gradient-to-b from-white to-white/80 bg-clip-text text-transparent">5+</div>
                  <div className="text-sm font-semibold uppercase tracking-wider">Years Experience</div>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/30 rounded-full blur-sm"></div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0074C8]/10 to-[#0097F2]/10 rounded-full border border-[#0074C8]/20 backdrop-blur-sm">
                <span className="text-[#0074C8] text-sm font-semibold">Welcome to Quarhire</span>
                <div className="w-1.5 h-1.5 bg-[#0097F2] rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Your Journey Starts with{' '}
                <span className="bg-gradient-to-r from-[#0074C8] to-[#0097F2] bg-clip-text text-transparent">
                  Comfort
                </span>
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                  At Quarhire, we understand that your travel experience begins the moment you land. Our premium airport pickup service ensures you start your journey in Ghana with comfort, safety, and peace of mind.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  With professional drivers, modern vehicles, and 24/7 availability, we're committed to making your transportation seamless and stress-free.
                </p>
              </div>
              <Link 
                href="/about" 
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#0074C8] to-[#0097F2] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-[#0074C8]/40 hover:scale-105 whitespace-nowrap"
              >
                Learn More About Us
                <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#0074C8]/5 to-[#0097F2]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
              <span className="text-[#0074C8] text-sm font-semibold">Why Choose Us</span>
              <div className="w-1.5 h-1.5 bg-[#0097F2] rounded-full"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Premium Features for Your{' '}
              <span className="bg-gradient-to-r from-[#0074C8] to-[#0097F2] bg-clip-text text-transparent">
                Comfort
              </span>
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Experience the difference with our comprehensive range of services designed for your convenience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon="ri-shield-check-line"
              title="Safe & Secure"
              description="All our drivers are thoroughly vetted and trained professionals. Your safety is our top priority with GPS tracking and 24/7 support."
              accentColor="#0074C8"
            />
            <FeatureCard 
              icon="ri-time-line"
              title="Always On Time"
              description="We monitor flight schedules in real-time to ensure we're there when you land, no matter if your flight is early or delayed."
              accentColor="#0097F2"
            />
            <FeatureCard 
              icon="ri-car-line"
              title="Premium Vehicles"
              description="Travel in style with our fleet of well-maintained, comfortable vehicles equipped with modern amenities for your journey."
              accentColor="#0074C8"
            />
            <FeatureCard 
              icon="ri-customer-service-line"
              title="24/7 Support"
              description="Our dedicated customer service team is available round the clock to assist you with bookings, changes, or any concerns."
              accentColor="#0097F2"
            />
            <FeatureCard 
              icon="ri-money-dollar-circle-line"
              title="Transparent Pricing"
              description="No hidden fees or surprise charges. What you see is what you pay, with competitive rates for premium service."
              accentColor="#0074C8"
            />
            <FeatureCard 
              icon="ri-map-pin-line"
              title="Local Expertise"
              description="Our drivers know Ghana inside out, ensuring the fastest and safest routes to your destination every time."
              accentColor="#0097F2"
            />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#0097F2]/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-[#0074C8]/5 to-transparent rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#0074C8]/10 to-[#0097F2]/10 rounded-full border border-[#0074C8]/20 mb-6">
              <span className="text-[#0074C8] text-sm font-semibold">Our Services</span>
              <div className="w-1.5 h-1.5 bg-[#0097F2] rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Tailored{' '}
              <span className="bg-gradient-to-r from-[#0074C8] to-[#0097F2] bg-clip-text text-transparent">
                Transportation
              </span>{' '}
              Solutions
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              From airport transfers to city tours, we've got all your transportation needs covered
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0074C8] to-[#0097F2] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0074C8] to-[#0097F2] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <i className="ri-plane-line text-4xl text-white group-hover:text-[#0074C8] transition-colors duration-500"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors duration-500">Airport Pickup</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                  Reliable pickup service from Kotoka International Airport to any destination in Accra and beyond.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-500"></div>
            </div>

            <div className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0074C8] to-[#0097F2] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0074C8] to-[#0097F2] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <i className="ri-map-pin-line text-4xl text-white group-hover:text-[#0074C8] transition-colors duration-500"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors duration-500">City Transfers</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                  Comfortable transportation for business meetings, hotel transfers, or personal appointments across the city.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-500"></div>
            </div>

            <div className="group relative bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-100 hover:border-transparent transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] cursor-pointer overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0074C8] to-[#0097F2] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0074C8] to-[#0097F2] rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:scale-110 transition-all duration-500 shadow-lg">
                  <i className="ri-compass-line text-4xl text-white group-hover:text-[#0074C8] transition-colors duration-500"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors duration-500">Hourly Hire</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-white/90 transition-colors duration-500">
                  Need a driver for the day? Book our hourly service for flexible transportation on your schedule.
                </p>
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-500"></div>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/services" 
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#0074C8] to-[#0097F2] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-[#0074C8]/40 hover:scale-105 whitespace-nowrap"
            >
              View All Services
              <i className="ri-arrow-right-line w-5 h-5 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1"></i>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-gradient-to-b from-gray-50/50 to-white relative overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-gradient-to-l from-[#0097F2]/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-gradient-to-r from-[#0074C8]/10 to-transparent rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
              <span className="text-[#0074C8] text-sm font-semibold">Testimonials</span>
              <div className="w-1.5 h-1.5 bg-[#0097F2] rounded-full"></div>
            </div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
              What Our{' '}
              <span className="bg-gradient-to-r from-[#0074C8] to-[#0097F2] bg-clip-text text-transparent">
                Customers
              </span>{' '}
              Say
            </h2>
            <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
              Don't just take our word for it - hear from travelers who've experienced our service
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              name="Sarah Johnson"
              role="Business Traveler"
              image="https://readdy.ai/api/search-image?query=Professional%20business%20woman%20smiling%20portrait%2C%20confident%20female%20executive%2C%20modern%20professional%20headshot%2C%20clean%20simple%20background%2C%20natural%20lighting%2C%20corporate%20professional%20photo&width=200&height=200&seq=testimonial-1&orientation=squarish"
              rating={5}
              text="Exceptional service! The driver was waiting for me at arrivals with a name sign, and the car was spotless. Made my business trip to Accra so much smoother."
            />
            <TestimonialCard 
              name="Michael Osei"
              role="Tourist"
              image="https://readdy.ai/api/search-image?query=Friendly%20African%20man%20smiling%20portrait%2C%20casual%20professional%20male%2C%20warm%20welcoming%20expression%2C%20clean%20simple%20background%2C%20natural%20lighting%2C%20authentic%20portrait%20photo&width=200&height=200&seq=testimonial-2&orientation=squarish"
              rating={5}
              text="First time in Ghana and Quarhire made everything easy. Professional, punctual, and the driver even gave me great tips about the city. Highly recommend!"
            />
            <TestimonialCard 
              name="Emma Williams"
              role="Family Traveler"
              image="https://readdy.ai/api/search-image?query=Cheerful%20woman%20smiling%20portrait%2C%20friendly%20female%20traveler%2C%20warm%20genuine%20smile%2C%20clean%20simple%20background%2C%20natural%20lighting%2C%20authentic%20portrait%20photo&width=200&height=200&seq=testimonial-3&orientation=squarish"
              rating={5}
              text="Traveling with kids can be stressful, but Quarhire made it effortless. Spacious vehicle, child seats available, and the driver was so patient and helpful."
            />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-gradient-to-br from-[#0074C8] via-[#0088E0] to-[#0097F2] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4"></div>
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 mb-8">
            <span className="text-white text-sm font-semibold">Get Started Today</span>
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
            Ready to Experience{' '}
            <span className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Premium Transportation?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-white/95 mb-12 leading-relaxed max-w-3xl mx-auto">
            Book your ride now and enjoy a seamless journey from the airport to your destination. Available 24/7 for your convenience.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/booking" 
              className="group relative px-8 py-4 bg-white text-[#0074C8] rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-2xl whitespace-nowrap overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Book Your Ride Now
                <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1"></i>
              </span>
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-transparent text-white border-2 border-white/80 hover:bg-white hover:text-[#0074C8] rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 whitespace-nowrap backdrop-blur-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
