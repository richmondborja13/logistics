/*
============================================================
About Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the About section for the landing page.
- Uses Tailwind CSS for layout and styling.
- Displays company stats and core values.
- To update stats or values, edit the 'stats' and 'values' arrays.
- To change layout or content, edit the JSX in the About component.

Back-end Follow Through:
- If dynamic stats or values are needed, replace the arrays with API calls or props.
- For localization, connect text content to a translation provider or API.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The About section can be reused or extended for other informational pages.
- For additional integration, see README or API documentation.
*/
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';

const stats = [
  { label: 'Years Experience', value: '15+' },
  { label: 'Global Locations', value: '50+' },
  { label: 'Satisfied Clients', value: '1000+' },
  { label: 'Annual Deliveries', value: '1M+' },
];

const values = [
  'Customer-Centric Approach',
  'Innovation in Logistics',
  'Environmental Responsibility',
  'Reliability & Trust',
  'Global Network',
  '24/7 Support',
];

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[550px] w-full">
            <Image
              src="/images/about-logistics.png"
              alt="Modern logistics operations"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover rounded-xl"
            />
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Your Trusted Logistics Partner
              </h2>
              <p className="text-xl text-gray-600">
                With over 15 years of experience, we've been at the forefront of logistics innovation, helping businesses streamline their supply chains and achieve operational excellence.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Our Core Values
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 