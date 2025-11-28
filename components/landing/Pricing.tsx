/*
============================================================
Pricing Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the Pricing section for the landing page.
- Uses Tailwind CSS for layout and styling.
- Displays pricing plans from the 'plans' array.
- To add or update plans, edit the 'plans' array.
- To change layout or content, edit the JSX in the Pricing component.

Back-end Follow Through:
- If dynamic pricing is needed, replace the array with API calls or props.
- For payment integration, connect buttons to checkout or sales APIs.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The Pricing section can be reused or extended for other pricing or sales pages.
- For additional integration, see README or API documentation.
*/
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '499',
    description: 'Perfect for small businesses',
    features: [
      'Local Delivery Services',
      'Basic Tracking',
      'Email Support',
      'Standard Insurance',
      '5-Day Delivery Window',
    ],
  },
  {
    name: 'Professional',
    price: '999',
    description: 'Ideal for growing businesses',
    features: [
      'National Delivery Network',
      'Real-time Tracking',
      '24/7 Phone Support',
      'Enhanced Insurance',
      '3-Day Delivery Window',
      'Route Optimization',
      'Custom Packaging',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large-scale operations',
    features: [
      'Global Logistics Network',
      'Advanced Analytics',
      'Dedicated Account Manager',
      'Premium Insurance',
      'Same-Day Delivery Options',
      'Custom Solutions',
      'API Integration',
      'Priority Support',
    ],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 min-h-screen flex items-center bg-white">
      <div className="container mx-auto px-4 w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect logistics solution for your business needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              id={`pricing-${plan.name.toLowerCase()}`}
              className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-600 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className="text-gray-600">/month</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full mt-8 px-6 py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 