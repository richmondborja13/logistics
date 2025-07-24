/*
============================================================
Hero Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the Hero section for the landing page.
- Uses Tailwind CSS for layout and styling.
- Displays a headline, description, call-to-action buttons, and animation.
- To update text or links, edit the JSX in the Hero component.
- To change the animation, update the LottieAnimation import or props.

Back-end Follow Through:
- If dynamic content is needed, replace static values with API calls or props.
- For personalized hero sections, connect to user or marketing APIs.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The Hero section can be reused or extended for other landing or marketing pages.
- For additional integration, see README or API documentation.
*/
'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import Header from './Header';

const LottieAnimation = dynamic(() => import('./LottieAnimation'), { ssr: false });

export default function Hero() {
  return (
    <>
      <Header />
      <section id="hero" className="relative min-h-screen flex items-center bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-10 py-15">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-start">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Revolutionize Your Logistics for a Smarter Supply Chain
              </h1>
              <p className="text-xl text-blue-100">
                Optimize your operations with our comprehensive logistics services. From warehousing to last-mile delivery, we've got you covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/registration" 
                  className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
                >
                  Get Started
                </Link>
                <Link 
                  href="/services" 
                  className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px] ml-8 md:ml-16">
              <LottieAnimation />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>
    </>
  );
} 