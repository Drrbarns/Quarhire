'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setShowSuccess(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <main>
      <section className="relative min-h-[500px] flex items-center text-white overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://readdy.ai/api/search-image?query=Professional%20customer%20service%20team%20in%20Ghana%2C%20friendly%20staff%20at%20modern%20office%2C%20contact%20center%20with%20phones%20and%20computers%2C%20welcoming%20business%20environment%2C%20professional%20atmosphere&width=1920&height=500&seq=contact-hero&orientation=landscape"
            alt="Contact Us"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-black/15"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-[#DDE2E9] mb-8">
              Get in touch with our team for any questions or special requirements
            </p>
            <p className="text-lg text-[#DDE2E9]/80 leading-relaxed">
              We're here to help with any questions about our services or to assist with your booking.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 bg-gradient-to-b from-white to-[#F5F7FA]">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-block bg-[#0074C8]/10 text-[#0074C8] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Contact Us
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A0A0A] mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-xl text-[#2B2F35] max-w-2xl mx-auto">
                Have questions or ready to book? We're here to make your journey seamless and comfortable.
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Contact Cards */}
              <div className="lg:col-span-1 space-y-6">
                {/* Phone Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-[#DDE2E9]/50">
                  <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#0074C8] to-[#0097F2] rounded-xl mb-4">
                    <i className="ri-phone-line text-2xl text-white w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Call Us Anytime</h3>
                  <p className="text-[#0074C8] font-semibold text-lg mb-1">+233 123 456 789</p>
                  <p className="text-sm text-[#2B2F35]/70">Available 24/7 for your convenience</p>
                </div>

                {/* Email Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-[#DDE2E9]/50">
                  <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#0074C8] to-[#0097F2] rounded-xl mb-4">
                    <i className="ri-mail-line text-2xl text-white w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Email Us</h3>
                  <p className="text-[#0074C8] font-semibold text-lg mb-1">info@quarhire.com</p>
                  <p className="text-sm text-[#2B2F35]/70">Response within 2 hours</p>
                </div>

                {/* WhatsApp Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-[#DDE2E9]/50">
                  <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-xl mb-4">
                    <i className="ri-whatsapp-line text-2xl text-white w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">WhatsApp</h3>
                  <a href="https://wa.me/233123456789" target="_blank" rel="noopener noreferrer" className="text-[#25D366] font-semibold text-lg mb-1 block hover:underline cursor-pointer">
                    +233 123 456 789
                  </a>
                  <p className="text-sm text-[#2B2F35]/70">Quick chat support</p>
                </div>

                {/* Location Card */}
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-[#DDE2E9]/50">
                  <div className="w-14 h-14 flex items-center justify-center bg-gradient-to-br from-[#0074C8] to-[#0097F2] rounded-xl mb-4">
                    <i className="ri-map-pin-line text-2xl text-white w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <h3 className="text-lg font-bold text-[#0A0A0A] mb-2">Visit Us</h3>
                  <p className="text-[#2B2F35] font-semibold mb-1">Accra, Ghana</p>
                  <p className="text-sm text-[#2B2F35]/70">Serving Greater Accra Region</p>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-[#DDE2E9]/50">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0A0A0A] mb-2">Send Us a Message</h3>
                  <p className="text-[#2B2F35] mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
                  
                  <form id="contact_form" data-readdy-form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    const formData = new FormData(form);
                    const textarea = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
                    
                    if (textarea && textarea.value.length > 500) {
                      alert('Message must be 500 characters or less');
                      return;
                    }
                    
                    fetch('https://readdy.ai/api/form/d4dl9ue820p5j87gaqqg', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                      },
                      body: new URLSearchParams(formData as any).toString()
                    })
                    .then(response => {
                      if (response.ok) {
                        alert('Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
                        form.reset();
                        const charCount = document.getElementById('char-count');
                        if (charCount) charCount.textContent = '0';
                      } else {
                        alert('Sorry, there was an error sending your message. Please try again.');
                      }
                    })
                    .catch(() => {
                      alert('Sorry, there was an error sending your message. Please try again.');
                    });
                  }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          className="w-full px-4 py-3 border-2 border-[#DDE2E9] rounded-xl focus:ring-2 focus:ring-[#0074C8] focus:border-[#0074C8] transition-all text-sm"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 border-2 border-[#DDE2E9] rounded-xl focus:ring-2 focus:ring-[#0074C8] focus:border-[#0074C8] transition-all text-sm"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="w-full px-4 py-3 border-2 border-[#DDE2E9] rounded-xl focus:ring-2 focus:ring-[#0074C8] focus:border-[#0074C8] transition-all text-sm"
                          placeholder="+233 123 456 789"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="subject"
                            required
                            className="w-full px-4 py-3 border-2 border-[#DDE2E9] rounded-xl focus:ring-2 focus:ring-[#0074C8] focus:border-[#0074C8] transition-all text-sm appearance-none bg-white pr-10 cursor-pointer"
                          >
                            <option value="">Select a subject</option>
                            <option value="booking">Booking Inquiry</option>
                            <option value="pricing">Pricing Information</option>
                            <option value="complaint">Service Complaint</option>
                            <option value="compliment">Service Compliment</option>
                            <option value="corporate">Corporate Services</option>
                            <option value="other">Other</option>
                          </select>
                          <i className="ri-arrow-down-s-line absolute right-3 top-1/2 -translate-y-1/2 text-[#2B2F35] pointer-events-none w-5 h-5 flex items-center justify-center"></i>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={6}
                        maxLength={500}
                        className="w-full px-4 py-3 border-2 border-[#DDE2E9] rounded-xl focus:ring-2 focus:ring-[#0074C8] focus:border-[#0074C8] transition-all text-sm resize-vertical"
                        placeholder="Tell us how we can help you..."
                        onChange={(e) => {
                          const charCount = document.getElementById('char-count');
                          if (charCount) {
                            charCount.textContent = e.target.value.length.toString();
                          }
                        }}
                      ></textarea>
                      <div className="text-right text-sm text-[#2B2F35]/70 mt-2">
                        <span id="char-count">0</span>/500 characters
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[#0074C8] to-[#0097F2] hover:shadow-xl hover:shadow-[#0074C8]/30 text-white py-4 px-8 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] whitespace-nowrap cursor-pointer"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Bottom Section - Map & Hours */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Business Hours */}
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-[#DDE2E9]/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#0074C8]/10 rounded-xl mr-4">
                    <i className="ri-time-line text-2xl text-[#0074C8] w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">Business Hours</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#DDE2E9]">
                    <span className="text-[#2B2F35] font-medium">Airport Pickups</span>
                    <span className="font-bold text-[#0074C8]">24/7</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#DDE2E9]">
                    <span className="text-[#2B2F35] font-medium">Customer Service</span>
                    <span className="font-bold text-[#0074C8]">24/7</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#2B2F35] font-medium">Office Hours</span>
                    <span className="font-bold text-[#0A0A0A]">8AM - 6PM</span>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-lg border border-[#DDE2E9]/50">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 flex items-center justify-center bg-[#0074C8]/10 rounded-xl mr-4">
                    <i className="ri-map-2-line text-2xl text-[#0074C8] w-6 h-6 flex items-center justify-center"></i>
                  </div>
                  <h3 className="text-xl font-bold text-[#0A0A0A]">Find Us on the Map</h3>
                </div>
                <div className="rounded-xl overflow-hidden h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.7174586266785!2d-0.1969!3d5.6037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9084b2b7a773%3A0x72f7d1c6b1b1b1b1!2sAccra%2C%20Ghana!5e0!3m2!1sen!2sus!4v1234567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
