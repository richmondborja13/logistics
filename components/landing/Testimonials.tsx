/*
============================================================
Testimonials Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the Testimonials section for the landing page.
- Uses Tailwind CSS for layout and styling.
- Displays testimonials from the 'testimonials' array.
- To add or update testimonials, edit the 'testimonials' array.
- To change layout or content, edit the JSX in the Testimonials component.

Back-end Follow Through:
- If dynamic testimonials are needed, replace the array with API calls or props.
- For localization, connect text content to a translation provider or API.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The Testimonials section can be reused or extended for other testimonial or review pages.
- For additional integration, see README or API documentation.
*/
import Image from 'next/image';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Supply Chain Director',
    company: 'TechGlobal Inc.',
    image: '/images/testimonials/sarah-johnson.png',
    content: 'Their logistics solutions have transformed our supply chain operations. The real-time tracking and efficient delivery system have significantly reduced our operational costs.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Operations Manager',
    company: 'Global Retail Co.',
    image: '/images/testimonials/michael-chen.png',
    content: 'The team\'s expertise in international shipping and customs clearance has made our global expansion seamless. Their support is always available when we need it.',
    rating: 5,
  },
  {
    name: 'John Doe',
    role: 'Logistics Coordinator',
    company: 'EcoProducts Ltd.',
    image: '/images/testimonials/john-doe.png',
    content: 'Their commitment to sustainable logistics aligns perfectly with our company values. The eco-friendly transportation options have helped us reduce our carbon footprint.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50 min-h-screen flex items-center">
      <div className="container mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by leading businesses worldwide for reliable logistics solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  <p className="text-gray-600 text-sm">{testimonial.company}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 italic">&ldquo;{testimonial.content}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 