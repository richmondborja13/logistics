/*
============================================================
Header Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the main header and navigation for the landing page.
- Uses Tailwind CSS for layout and styling.
- Handles both desktop and mobile navigation, including dropdowns and active section highlighting.
- To update navigation links or sections, edit the SECTION_IDS array and JSX.
- To change layout or content, edit the JSX in the Header component.

Back-end Follow Through:
- If dynamic navigation or user info is needed, replace static values with API calls or props.
- For authentication-aware navigation, connect to user context or API.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The Header can be reused or extended for other pages requiring navigation.
- For additional integration, see README or API documentation.
*/
"use client";
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { Building2, Briefcase, BookOpen, MessageSquare, Package, DollarSign, HelpCircle } from 'lucide-react';

const SECTION_IDS = [
  'hero',
  'about',
  'case-studies',
  'blog',
  'testimonials',
  'faq',
  'services',
  'pricing',
  'contact',
];

const aboutDropdownItems = [
  {
    id: 'about',
    title: 'About',
    description: 'Learn about our company and mission',
    icon: Building2,
    href: '/#about',
  },
  {
    id: 'case-studies',
    title: 'Case Studies',
    description: 'Explore our successful logistics solutions',
    icon: Briefcase,
    href: '/#case-studies',
  },
  {
    id: 'blog',
    title: 'Blog',
    description: 'Read the latest logistics insights and news',
    icon: BookOpen,
    href: '/#blog',
  },
  {
    id: 'testimonials',
    title: 'Testimonials',
    description: 'See what our clients say about us',
    icon: MessageSquare,
    href: '/#testimonials',
  },
  {
    id: 'faq',
    title: 'FAQ',
    description: 'Find answers to frequently asked questions',
    icon: HelpCircle,
    href: '/#faq',
  },
];

const servicesPricingDropdownItems = [
  {
    id: 'services',
    title: 'Services',
    description: 'Comprehensive logistics solutions for your business',
    icon: Package,
    href: '/#services',
  },
  {
    id: 'pricing',
    title: 'Pricing',
    description: 'Transparent pricing plans tailored to your needs',
    icon: DollarSign,
    href: '/#pricing',
  },
];

const mobileNavItems = [
  { id: 'hero', label: 'Home', href: '/#hero' },
  { id: 'contact', label: 'Contact', href: '/#contact' },
];

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isServicesPricingDropdownOpen, setIsServicesPricingDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isMobileServicesPricingOpen, setIsMobileServicesPricingOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [aboutLabelOverride, setAboutLabelOverride] = useState<string | null>(null);
  const [servicesPricingLabelOverride, setServicesPricingLabelOverride] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const servicesPricingDropdownRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for active section
  useEffect(() => {
    const handleScroll = () => {
      let found = false;
      const allIds = [...SECTION_IDS];
      
      for (const id of allIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            setActiveSection(id);
            found = true;
            break;
          }
        }
      }
      if (!found) setActiveSection('');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clear label override when active section is one of the about dropdown sections
  // This allows the label to update dynamically based on scroll position
  useEffect(() => {
    const aboutSectionIds = aboutDropdownItems.map(item => item.id);
    if (aboutSectionIds.includes(activeSection)) {
      setAboutLabelOverride(null);
    }
  }, [activeSection]);

  // Ensure mobile accordions reflect the current active section
  useEffect(() => {
    const aboutSectionIds = aboutDropdownItems.map((item) => item.id);
    if (aboutSectionIds.includes(activeSection)) {
      setIsMobileAboutOpen(true);
    }
    if (['services', 'pricing'].includes(activeSection)) {
      setIsMobileServicesPricingOpen(true);
    }
  }, [activeSection]);

  // Reset mobile accordions when menu closes
  useEffect(() => {
    if (!isMobileMenuOpen) {
      setIsMobileAboutOpen(false);
      setIsMobileServicesPricingOpen(false);
    }
  }, [isMobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        dropdownRef.current.contains(event.target)
      ) {
        return;
      }
      setIsDropdownOpen(false);
    }
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Close Services/Pricing dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        servicesPricingDropdownRef.current &&
        event.target instanceof Node &&
        servicesPricingDropdownRef.current.contains(event.target)
      ) {
        return;
      }
      setIsServicesPricingDropdownOpen(false);
    }
    if (isServicesPricingDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isServicesPricingDropdownOpen]);

  // Helper for active link style (only visual state, sizing handled in base classes)
  const activeLink =
    'bg-white text-blue-700 font-semibold shadow-sm';

  const aboutLabel = aboutLabelOverride
    ? aboutLabelOverride
    : activeSection === 'case-studies'
      ? 'Case Studies'
      : activeSection === 'blog'
      ? 'Blog'
      : activeSection === 'testimonials'
      ? 'Testimonials'
      : activeSection === 'faq'
      ? 'FAQ'
      : 'About';

  const getServicesPricingLabel = () => {
    if (activeSection === 'pricing') {
      return 'Pricing';
    }
    return 'Services';
  };

  const servicesPricingLabel =
    servicesPricingLabelOverride ?? getServicesPricingLabel();

  const isAboutSectionActive = aboutDropdownItems.some((item) => item.id === activeSection);
  const isServicesPricingSectionActive = servicesPricingDropdownItems.some(
    (item) => item.id === activeSection
  );

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-900 text-white shadow z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold tracking-tight">Ship Happens</div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-4">
          <Link
            href="/#hero"
            className={`px-4 py-1 rounded-full hover:bg-white/10 hover:text-white transition-colors font-medium ${
              activeSection === 'hero' ? activeLink : 'text-white'
            }`}
          >
            Home
          </Link>
          
          {/* About Dropdown (click to open/close) */}
          <div className="relative" ref={dropdownRef}>
            <button
              className={`px-4 py-1 rounded-full hover:bg-white/10 hover:text-white transition-colors font-medium flex items-center gap-1 focus:outline-none ${
                ['about', 'case-studies', 'blog', 'testimonials', 'faq'].includes(activeSection)
                  ? activeLink
                  : 'text-white'
              }`}
              onClick={() => setIsDropdownOpen((open) => !open)}
              aria-expanded={isDropdownOpen}
            >
              {aboutLabel}
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                  {aboutDropdownItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                  <Link
                        key={item.id}
                        href={item.href}
                        className={`block px-4 py-3 hover:bg-blue-50 transition-colors ${
                          isActive ? 'bg-blue-50' : ''
                    }`}
                    onClick={() => {
                      setAboutLabelOverride(item.title);
                      setIsDropdownOpen(false);
                    }}
                  >
                        <div className="flex items-start gap-3">
                          <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                            isActive ? 'bg-blue-100' : 'bg-gray-100'
                          }`}>
                            <Icon className={`w-5 h-5 ${
                              isActive ? 'text-blue-600' : 'text-gray-600'
                            }`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`font-semibold text-sm mb-1 ${
                              isActive ? 'text-blue-600' : 'text-gray-900'
                            }`}>
                              {item.title}
                            </div>
                            <div className="text-xs text-gray-600 line-clamp-2">
                              {item.description}
                            </div>
                          </div>
                        </div>
                  </Link>
                    );
                  })}
                </div>
              )}
          </div>

          {/* Services & Pricing Merged Dropdown */}
          <div className="relative" ref={servicesPricingDropdownRef}>
            <button
              className={`px-4 py-1 rounded-full hover:bg-white/10 hover:text-white transition-colors font-medium flex items-center gap-1 focus:outline-none ${
                activeSection === 'services' || activeSection === 'pricing'
                  ? activeLink
                  : 'text-white'
            }`}
              onClick={() => setIsServicesPricingDropdownOpen((open) => !open)}
              aria-expanded={isServicesPricingDropdownOpen}
            >
              {servicesPricingLabel}
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${
                  isServicesPricingDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isServicesPricingDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                {servicesPricingDropdownItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.id;
                  return (
          <Link
                      key={item.id}
                      href={item.href}
                      className={`block px-4 py-3 hover:bg-blue-50 transition-colors ${
                        isActive ? 'bg-blue-50' : ''
                      }`}
                    onClick={() => {
                      setServicesPricingLabelOverride(item.title);
                      setIsServicesPricingDropdownOpen(false);
                    }}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                          isActive ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            isActive ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`font-semibold text-sm mb-1 ${
                            isActive ? 'text-blue-600' : 'text-gray-900'
                          }`}>
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-600 line-clamp-2">
                            {item.description}
                          </div>
                        </div>
                      </div>
          </Link>
                  );
                })}
              </div>
            )}
          </div>
          <Link
            href="/#contact"
            className={`px-4 py-1 rounded-full hover:bg-white/10 hover:text-white transition-colors font-medium ${
              activeSection === 'contact' ? activeLink : 'text-white'
            }`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="absolute top-0 right-0 h-full w-72 max-w-[80vw] bg-white text-gray-900 shadow-2xl rounded-l-3xl mobile-menu-slide px-6 py-6 space-y-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-2">
                {mobileNavItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={`flex items-center py-2 hover:text-blue-600 transition-colors ${
                        isActive ? 'text-blue-600 font-semibold' : ''
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="flex-1 text-left">{item.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-3">
                <div>
                  <button
                    className={`w-full flex items-center justify-between py-2 text-left font-semibold ${
                      isAboutSectionActive ? 'text-blue-600' : ''
                    }`}
                    onClick={() => setIsMobileAboutOpen((open) => !open)}
                    aria-expanded={isMobileAboutOpen}
                  >
                    <span>About</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isMobileAboutOpen ? 'rotate-180' : 'rotate-0'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isMobileAboutOpen && (
                    <div className="ml-3 space-y-2">
                      {aboutDropdownItems.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            className={`flex items-center py-1.5 text-sm hover:text-blue-600 transition-colors ${
                              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
                            }`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileAboutOpen(false);
                            }}
                          >
                            <span>{item.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div>
                  <button
                    className={`w-full flex items-center justify-between py-2 text-left font-semibold ${
                      isServicesPricingSectionActive ? 'text-blue-600' : ''
                    }`}
                    onClick={() => setIsMobileServicesPricingOpen((open) => !open)}
                    aria-expanded={isMobileServicesPricingOpen}
                  >
                    <span>Services & Pricing</span>
                    <svg
                      className={`w-4 h-4 transition-transform ${isMobileServicesPricingOpen ? 'rotate-180' : 'rotate-0'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isMobileServicesPricingOpen && (
                    <div className="ml-3 space-y-2">
                      {servicesPricingDropdownItems.map((item) => {
                        const isActive = activeSection === item.id;
                        return (
                          <Link
                            key={item.id}
                            href={item.href}
                            className={`flex items-center py-1.5 text-sm hover:text-blue-600 transition-colors ${
                              isActive ? 'text-blue-600 font-semibold' : 'text-gray-700'
                            }`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              setIsMobileServicesPricingOpen(false);
                            }}
                          >
                            <span>{item.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 