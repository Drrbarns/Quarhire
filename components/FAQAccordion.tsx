
'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md border border-[#DDE2E9]">
          <button
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[#DDE2E9]/20 transition-colors cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="font-semibold text-[#0A0A0A] pr-4">{faq.question}</h3>
            <i className={`ri-${openIndex === index ? 'subtract' : 'add'}-line text-[#0074C8] text-xl flex-shrink-0 w-5 h-5 flex items-center justify-center`}></i>
          </button>
          
          {openIndex === index && (
            <div className="px-6 pb-4">
              <p className="text-[#2B2F35] leading-relaxed">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
