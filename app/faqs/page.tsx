
import FAQAccordion from '@/components/FAQAccordion';
import Link from 'next/link';

export default function FAQs() {
  const faqs = [
    {
      question: 'How do I book a ride with Quarhire?',
      answer: 'You can book a ride through our online booking form on the website, call us directly at +233 240 665 648 or +233 302 938 717, or send us a message on WhatsApp at +233 240 665 648. We recommend booking at least 2 hours before your flight arrival for guaranteed availability.'
    },
    {
      question: 'Can I book ahead of time?',
      answer: 'Yes, absolutely! We encourage advance bookings to ensure availability. You can book days, weeks, or even months in advance. We\'ll send you a confirmation email and reminder closer to your travel date.'
    },
    {
      question: 'Are your drivers professional and licensed?',
      answer: 'All our drivers are professionally trained, licensed, and have extensive experience in airport transfers. They undergo background checks and regular training to maintain our high service standards. Our drivers are also knowledgeable about Accra and surrounding areas.'
    },
    {
      question: 'Do you track flight delays?',
      answer: 'Yes, we monitor all flights in real-time. If your flight is delayed, we automatically adjust the pickup time. If your flight arrives early, we\'ll be notified and can often accommodate earlier pickup times. You don\'t need to worry about calling us for flight changes.'
    },
    {
      question: 'How do payments work?',
      answer: 'We are fully cashless. Payments are made online during booking via our secure checkout. We accept debit/credit cards and Ghana Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo Money).'
    },
    {
      question: 'Do you accept cash payments?',
      answer: 'No. To keep things safe and convenient, QuarHire does not accept cash payments. Please pay online by card or Mobile Money during booking.'
    },
    {
      question: 'What if I can\'t find my driver at the airport?',
      answer: 'Your driver will be waiting in the arrivals area with a sign displaying your name. If you can\'t locate them, call the number provided in your confirmation email. Our drivers are instructed to wait up to 60 minutes after your flight lands.'
    },
    {
      question: 'Do you provide child car seats?',
      answer: 'Yes, we can provide child car seats upon request. Please mention this requirement when booking and specify the age/weight of the child. This service may incur a small additional fee.'
    },
    {
      question: 'What areas do you serve?',
      answer: 'We primarily serve Kotoka International Airport and destinations within Greater Accra. We also provide services to nearby regions including Tema, Kasoa, and other areas within a 50km radius of Accra. Contact us for destinations outside this area.'
    },
    {
      question: 'Can I make multiple stops during my journey?',
      answer: 'Yes, multiple stops can be arranged. Please mention this when booking as it may affect the pricing and travel time. We\'re happy to accommodate stops for shopping, business meetings, or other requirements.'
    },
    {
      question: 'What is your cancellation policy?',
      answer: 'You can cancel your booking free of charge up to 2 hours before the scheduled pickup time. Cancellations within 2 hours may incur a small fee. We understand that travel plans can change and try to be as flexible as possible.'
    },
    {
      question: 'Do you operate 24/7?',
      answer: 'Yes, we provide 24/7 service to accommodate all flight schedules. Whether your flight arrives at 3 AM or departs at midnight, we\'ll be there. Our customer service is also available around the clock for any urgent inquiries.'
    },
    {
      question: 'What happens if my flight is cancelled?',
      answer: 'If your flight is cancelled, simply contact us as soon as possible. We\'ll cancel your booking without any charges and help you reschedule for your new travel date if needed.'
    }
  ];

  return (
    <main>
      <section className="relative py-32 bg-[#0A0A0A] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://readdy.ai/api/search-image?query=Customer%20service%20representative%20helping%20travelers%20at%20Ghana%20airport%2C%20professional%20assistance%20desk%2C%20modern%20airport%20terminal%2C%20helpful%20staff%20providing%20information%2C%20clean%20professional%20environment%2C%20warm%20lighting%2C%20people%20asking%20questions%20and%20getting%20answers%2C%20friendly%20service%20atmosphere&width=1920&height=800&seq=faqs-hero-background&orientation=landscape"
            alt="Customer Service at Airport"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block bg-[#0074C8]/20 backdrop-blur-sm border border-[#0074C8]/30 rounded-full px-6 py-2 mb-6">
              <p className="text-[#0097F2] font-medium">Help Center</p>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-2xl text-[#DDE2E9] mb-6">
              Find answers to common questions about our airport pickup services
            </p>
            <p className="text-lg text-[#DDE2E9]/80 leading-relaxed max-w-3xl mx-auto">
              Get instant answers to your questions about booking, payments, service areas, and more. Our comprehensive FAQ covers everything you need to know about QuarHire.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#DDE2E9]/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-6">
                Common Questions
              </h2>
              <p className="text-xl text-[#2B2F35]">
                Here are answers to the most frequently asked questions about our services. Can't find what you're looking for? Contact us directly.
              </p>
            </div>

            <div className="mb-10 bg-white rounded-2xl shadow-lg border border-[#DDE2E9] overflow-hidden">
              <div className="bg-gradient-to-r from-[#0074C8] to-[#0097F2] px-6 py-5 text-white">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center bg-white/20 rounded-xl">
                    <i className="ri-bank-card-line text-xl w-5 h-5 flex items-center justify-center"></i>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold">Cashless Payments</h3>
                </div>
                <p className="text-white/90 mt-2 text-center">
                  Pay securely online — we do not accept cash.
                </p>
              </div>
              <div className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-[#DDE2E9] bg-[#F8F9FA]">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0074C8]/10 text-[#0074C8] flex-shrink-0">
                      <i className="ri-bank-card-line text-xl w-5 h-5 flex items-center justify-center"></i>
                    </div>
                    <div>
                      <div className="font-bold text-[#0A0A0A]">Card Payments</div>
                      <div className="text-sm text-[#2B2F35]">Visa / Mastercard and supported debit cards</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-xl border border-[#DDE2E9] bg-[#F8F9FA]">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0097F2]/10 text-[#0097F2] flex-shrink-0">
                      <i className="ri-smartphone-line text-xl w-5 h-5 flex items-center justify-center"></i>
                    </div>
                    <div>
                      <div className="font-bold text-[#0A0A0A]">Mobile Money</div>
                      <div className="text-sm text-[#2B2F35]">MTN MoMo / Vodafone Cash / AirtelTigo Money</div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0074C8] to-[#0097F2] hover:shadow-lg hover:shadow-[#0074C8]/50 text-white px-7 py-3.5 rounded-xl font-semibold transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer"
                  >
                    <i className="ri-secure-payment-line w-4 h-4 flex items-center justify-center"></i>
                    Pay & Book Now
                  </Link>
                  <p className="text-xs text-[#2B2F35] mt-3">
                    Payments are processed securely via Paystack.
                  </p>
                </div>
              </div>
            </div>

            <FAQAccordion faqs={faqs} />

            <div className="mt-16 bg-white p-8 rounded-xl shadow-lg text-center">
              <h3 className="text-2xl font-semibold text-[#0A0A0A] mb-4">
                Still Have Questions?
              </h3>
              <p className="text-[#2B2F35] mb-6">
                Our customer service team is available 24/7 to help you with any questions or special requirements.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="tel:+233240665648"
                  className="bg-[#0A0A0A] hover:bg-[#2B2F35] text-white px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center justify-center">
                  <i className="ri-phone-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                  Call: +233 240 665 648
                </a>
                <a href="https://wa.me/233240665648" target="_blank" rel="noopener noreferrer"
                  className="bg-gradient-to-r from-[#0074C8] to-[#0097F2] hover:shadow-lg text-white px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center justify-center">
                  <i className="ri-whatsapp-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                  WhatsApp Us
                </a>
                <Link href="/contact"
                  className="bg-[#DDE2E9] hover:bg-[#DDE2E9]/70 text-[#0A0A0A] px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center justify-center">
                  <i className="ri-mail-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                  Send Email
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0A0A0A] mb-6">
              Ready to Book?
            </h2>
            <p className="text-xl text-[#2B2F35] mb-8">
              Now that you have all the information you need, book your reliable airport pickup service with Quarhire.
            </p>

            <Link href="/booking"
              className="bg-gradient-to-r from-[#0074C8] to-[#0097F2] hover:shadow-lg hover:shadow-[#0074C8]/50 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 whitespace-nowrap cursor-pointer inline-block">
              Book Your Ride Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
