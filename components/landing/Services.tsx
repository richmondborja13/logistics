/*
============================================================
Services Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the Services section for the landing page.
- Uses Tailwind CSS for layout and styling.
- Displays a list of services from the 'services' array.
- To add or update services, edit the 'services' array.
- To change layout or content, edit the JSX in the Services component.

Back-end Follow Through:
- If dynamic services are needed, replace the array with API calls or props.
- For localization, connect text content to a translation provider or API.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The Services section can be reused or extended for other service or feature pages.
- For additional integration, see README or API documentation.
*/
'use client';

import { Truck, Warehouse, Globe, Package, Route, Shield } from 'lucide-react';

const services = [
  {
    icon: Truck,
    title: 'Transportation',
    description: 'Efficient road, rail, and air freight solutions for your cargo needs.',
  },
  {
    icon: Warehouse,
    title: 'Warehousing',
    description: 'State-of-the-art storage facilities with advanced inventory management.',
  },
  {
    icon: Globe,
    title: 'International Shipping',
    description: 'Seamless cross-border logistics with customs clearance support.',
  },
  {
    icon: Package,
    title: 'Last-Mile Delivery',
    description: 'Reliable final delivery solutions for customer satisfaction.',
  },
  {
    icon: Route,
    title: 'Route Optimization',
    description: 'AI-powered route planning for maximum efficiency.',
  },
  {
    icon: Shield,
    title: 'Supply Chain Security',
    description: 'Comprehensive security measures to protect your cargo.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Logistics Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive logistics solutions tailored to your business needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <service.icon className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 