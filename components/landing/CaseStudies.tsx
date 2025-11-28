/*
============================================================
CaseStudies Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the Case Studies section for the landing page.
- Uses Tailwind CSS for layout and styling.
- Displays a list of case studies from the 'caseStudies' array.
- To add or update case studies, edit the 'caseStudies' array.
- To change layout or content, edit the JSX in the CaseStudies component.

Back-end Follow Through:
- If dynamic case studies are needed, replace the array with API calls or props.
- For navigation, ensure the links match the case studies routing structure.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The Case Studies section can be reused or extended for a full case studies page.
- For additional integration, see README or API documentation.
*/
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const caseStudies = [
  {
    title: 'Global E-commerce Expansion',
    client: 'TechRetail Inc.',
    challenge: 'Needed to scale logistics operations across 20+ countries',
    solution: 'Implemented integrated logistics platform with real-time tracking',
    results: [
      '40% reduction in delivery times',
      '25% cost savings in logistics operations',
      '99.9% on-time delivery rate',
    ],
    image: '/images/case-studies/ecommerce.png',
  },
  {
    title: 'Cold Chain Optimization',
    client: 'FreshFoods Ltd.',
    challenge: 'Maintaining temperature control across supply chain',
    solution: 'Deployed IoT-enabled temperature monitoring system',
    results: [
      'Zero temperature violations',
      '30% reduction in product spoilage',
      '50% improvement in delivery efficiency',
    ],
    image: '/images/case-studies/cold-chain.png',
  },
  {
    title: 'Last-Mile Revolution',
    client: 'UrbanDelivery Co.',
    challenge: 'Inefficient last-mile delivery in metropolitan areas',
    solution: 'AI-powered route optimization and delivery automation',
    results: [
      '60% reduction in delivery time',
      '45% decrease in fuel consumption',
      '95% customer satisfaction rate',
    ],
    image: '/images/case-studies/last-mile.png',
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-20 min-h-screen flex items-center bg-white">
      <div className="container mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how we've helped businesses transform their logistics operations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {study.title}
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  {study.client}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Challenge</h4>
                    <p className="text-gray-600">{study.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Solution</h4>
                    <p className="text-gray-600">{study.solution}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Results</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {study.results.map((result, resultIndex) => (
                        <li key={resultIndex}>{result}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  href={`/case-studies/${study.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center gap-2 text-blue-600 font-medium mt-6 hover:text-blue-700 transition-colors"
                >
                  Read Full Case Study
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/case-studies"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
} 