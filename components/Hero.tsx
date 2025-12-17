'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    'https://static.readdy.ai/image/8e94e1476ded2dfd78d904370fe1b75f/3ad36e7dbb4cdee890de83fd045b7b20.jpeg',
    'https://readdy.ai/api/search-image?query=Brand%20new%20modern%20white%20Toyota%20Hiace%20premium%20passenger%20van%20parked%20at%20Kotoka%20International%20Airport%20Ghana%20during%20golden%20hour%20sunset%2C%20latest%20model%20luxury%20minibus%2C%20sleek%20contemporary%20design%2C%20warm%20orange%20sunset%20lighting%2C%20professional%20airport%20shuttle%20service%20vehicle%2C%20high-end%20automotive%20photography%2C%20pristine%20condition%2C%20spacious%20comfortable%20transport%20for%20groups%2C%20welcoming%20atmosphere&width=1920&height=1080&seq=hero-slide-toyota-hiace-new&orientation=landscape',
    'https://readdy.ai/api/search-image?query=Professional%20African%20chauffeur%20in%20formal%20uniform%20holding%20welcome%20sign%20at%20airport%20arrivals%20hall%2C%20smiling%20warmly%2C%20modern%20airport%20interior%2C%20bright%20natural%20lighting%2C%20premium%20meet%20and%20greet%20service%2C%20professional%20hospitality%20photography%2C%20clean%20contemporary%20setting%2C%20welcoming%20gesture&width=1920&height=1080&seq=hero-slide-updated-3&orientation=landscape'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${currentSlide === index ? 'opacity-100' : 'opacity-0'
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center">
        <div className="max-w-4xl mx-auto space-y-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <i className="ri-plane-line text-white"></i>
            <span className="text-white text-sm font-medium">Kotoka International Airport</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div>
          </div>

          {/* Headline */}
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight">
              Your Journey,
              <br />
              <span className="bg-gradient-to-r from-[#0097F2] to-[#00B4FF] bg-clip-text text-transparent">
                Our Promise
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Premium airport transfers in Accra. Professional drivers, modern vehicles, and seamless service from touchdown to your destination.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 max-w-2xl mx-auto border-t border-white/10 mt-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">500+</div>
              <div className="text-white/80 text-sm">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">24/7</div>
              <div className="text-white/80 text-sm">Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-1">5★</div>
              <div className="text-white/80 text-sm">Rating</div>
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
            className={`rounded-full transition-all duration-300 ${currentSlide === index
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
