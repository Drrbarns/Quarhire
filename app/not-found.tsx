import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-extrabold bg-gradient-to-r from-[#0074C8] to-[#0097F2] bg-clip-text text-transparent mb-4">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#0074C8] to-[#0097F2] mx-auto rounded-full"></div>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or the link is incorrect.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0074C8] to-[#0097F2] text-white rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-[#0074C8]/40 hover:scale-105"
          >
            <i className="ri-home-line"></i>
            Go to Homepage
            <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1"></i>
          </Link>
          
          <Link
            href="/booking"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0074C8] border-2 border-[#0074C8] rounded-xl font-semibold transition-all duration-300 hover:bg-[#0074C8] hover:text-white hover:scale-105"
          >
            <i className="ri-calendar-check-line"></i>
            Book a Ride
          </Link>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Or visit:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/services" className="text-[#0074C8] hover:text-[#0097F2] transition-colors">
              Services
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/about" className="text-[#0074C8] hover:text-[#0097F2] transition-colors">
              About Us
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/contact" className="text-[#0074C8] hover:text-[#0097F2] transition-colors">
              Contact
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/faqs" className="text-[#0074C8] hover:text-[#0097F2] transition-colors">
              FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}