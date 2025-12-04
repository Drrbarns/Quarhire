import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-[#DDE2E9] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <img 
              src="https://static.readdy.ai/image/8e94e1476ded2dfd78d904370fe1b75f/5a821ca5aba312b2266d043ccc9a8171.jpeg" 
              alt="Quarhire Logo" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-[#DDE2E9] leading-relaxed">
              Your trusted partner for reliable and comfortable airport pickup services in Ghana.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[#2B2F35] hover:bg-[#0074C8] rounded-full transition-all duration-300 hover:scale-110">
                <i className="ri-facebook-fill text-xl w-5 h-5 flex items-center justify-center"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[#2B2F35] hover:bg-[#0074C8] rounded-full transition-all duration-300 hover:scale-110">
                <i className="ri-twitter-fill text-xl w-5 h-5 flex items-center justify-center"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[#2B2F35] hover:bg-[#0074C8] rounded-full transition-all duration-300 hover:scale-110">
                <i className="ri-instagram-fill text-xl w-5 h-5 flex items-center justify-center"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-[#2B2F35] hover:bg-[#0074C8] rounded-full transition-all duration-300 hover:scale-110">
                <i className="ri-linkedin-fill text-xl w-5 h-5 flex items-center justify-center"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-[#0074C8] transition-colors duration-300 flex items-center gap-2">
                  <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#0074C8] transition-colors duration-300 flex items-center gap-2">
                  <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#0074C8] transition-colors duration-300 flex items-center gap-2">
                  <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-[#0074C8] transition-colors duration-300 flex items-center gap-2">
                  <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/faqs" className="hover:text-[#0074C8] transition-colors duration-300 flex items-center gap-2">
                  <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0074C8] transition-colors duration-300 flex items-center gap-2">
                  <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-[#0074C8] transition-colors duration-300 flex items-center gap-2">
                  <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#0074C8] transition-colors duration-300 flex items-center gap-2">
                  <i className="ri-arrow-right-s-line w-4 h-4 flex items-center justify-center"></i>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <i className="ri-map-pin-line text-[#0074C8] text-xl mt-1 w-5 h-5 flex items-center justify-center"></i>
                <span>Accra, Ghana</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-phone-line text-[#0074C8] text-xl w-5 h-5 flex items-center justify-center"></i>
                <span>+233 24 668 6388</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-mail-line text-[#0074C8] text-xl w-5 h-5 flex items-center justify-center"></i>
                <span>info@quarhire.com</span>
              </li>
              <li className="flex items-start gap-3">
                <i className="ri-time-line text-[#0074C8] text-xl w-5 h-5 flex items-center justify-center"></i>
                <span>24/7 Available</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2B2F35] pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#DDE2E9] text-sm">
              © 2025 Quarhire. All rights reserved.
            </p>
            <Link 
              href="https://doctorbarns.com" 
              target="_blank"
              className="text-[#DDE2E9] hover:text-[#0074C8] text-sm transition-colors duration-300"
            >
              Powered by Doctor Barns Tech
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
