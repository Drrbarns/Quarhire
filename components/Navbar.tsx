'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo - Centered */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <img 
                src="/Quarhire2.png" 
                alt="Quarhire Logo" 
                className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Navigation - Left side */}
          <div className="hidden xl:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            <Link 
              href="/" 
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-gray-700 hover:text-[#0074C8]' : 'text-white/90 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/services" 
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-gray-700 hover:text-[#0074C8]' : 'text-white/90 hover:text-white'
              }`}
            >
              Services
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-gray-700 hover:text-[#0074C8]' : 'text-white/90 hover:text-white'
              }`}
            >
              About
            </Link>
            <Link 
              href="/faqs" 
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-gray-700 hover:text-[#0074C8]' : 'text-white/90 hover:text-white'
              }`}
            >
              FAQs
            </Link>
            <Link 
              href="/contact" 
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled ? 'text-gray-700 hover:text-[#0074C8]' : 'text-white/90 hover:text-white'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* CTA Button - Right side */}
          <div className="hidden md:flex items-center gap-4">
            <div className={`hidden lg:flex items-center gap-2 text-xs font-medium transition-colors duration-300 ${
              scrolled ? 'text-gray-600' : 'text-white/80'
            }`}>
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>24/7 Available</span>
            </div>
            <Link 
              href="/booking" 
              className="px-6 py-3 bg-[#0074C8] text-white rounded-full font-semibold text-sm transition-all duration-300 hover:bg-[#005da0] hover:shadow-lg hover:shadow-[#0074C8]/30 hover:scale-105"
            >
              Request Pickup
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              scrolled 
                ? 'text-gray-700 hover:bg-gray-100' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <i className={`ri-${isOpen ? 'close' : 'menu'}-line text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`md:hidden transition-all duration-300 ${
          scrolled ? 'bg-white border-t border-gray-200' : 'bg-black/95 backdrop-blur-xl border-t border-white/10'
        }`}>
          <div className="max-w-7xl mx-auto px-4 py-6 space-y-2">
            <Link 
              href="/" 
              className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-50 hover:text-[#0074C8]' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/services" 
              className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-50 hover:text-[#0074C8]' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link 
              href="/about" 
              className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-50 hover:text-[#0074C8]' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/faqs" 
              className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-50 hover:text-[#0074C8]' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(false)}
            >
              FAQs
            </Link>
            <Link 
              href="/contact" 
              className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-50 hover:text-[#0074C8]' 
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-4">
              <Link 
                href="/booking" 
                className="block w-full text-center px-4 py-3 bg-[#0074C8] text-white rounded-xl font-semibold transition-all duration-300 hover:bg-[#005da0]"
                onClick={() => setIsOpen(false)}
              >
                Request Pickup
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
