/*
============================================================
FAQ Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the FAQ section for the landing page.
- Uses Tailwind CSS for layout and styling.
- Displays a list of FAQs from the 'faqs' array.
- To add or update FAQs, edit the 'faqs' array.
- To change layout or content, edit the JSX in the FAQ component.

Back-end Follow Through:
- If dynamic FAQs are needed, replace the array with API calls or props.
- For localization, connect text content to a translation provider or API.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The FAQ section can be reused or extended for help or support pages.
- For additional integration, see README or API documentation.
*/
'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: 'What types of cargo do you handle?',
    answer: 'We handle a wide range of cargo types including general merchandise, temperature-controlled goods, hazardous materials, oversized cargo, and more. Our specialized equipment and trained staff ensure safe handling of all cargo types.',
  },
  {
    question: 'Do you offer real-time tracking?',
    answer: 'Yes, we provide real-time tracking for all shipments through our advanced logistics platform. You can monitor your cargo\'s location, status, and estimated delivery time 24/7.',
  },
  {
    question: 'What is your service coverage area?',
    answer: 'We operate globally with a network of 50+ locations across major continents. Our extensive coverage ensures we can handle both domestic and international logistics needs.',
  },
  {
    question: 'How do you handle customs clearance?',
    answer: 'Our experienced customs team handles all documentation and clearance procedures. We maintain strong relationships with customs authorities worldwide to ensure smooth and efficient clearance.',
  },
  {
    question: 'What are your delivery timeframes?',
    answer: 'Delivery timeframes vary based on the service type, distance, and cargo specifications. We offer express, standard, and economy services to meet different timeline requirements.',
  },
  {
    question: 'Do you provide insurance coverage?',
    answer: 'Yes, we offer comprehensive cargo insurance options to protect your shipments. Our insurance policies cover various risks including damage, loss, and theft.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 min-h-screen flex items-center bg-white">
      <div className="container mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our logistics services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-0"
            >
              <button
                className="w-full py-6 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 