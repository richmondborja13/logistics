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
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

const SECTION_IDS = [
  'hero',
  'about',
  'case-studies',
  'blog',
  'testimonials',
  'services',
  'pricing',
  'contact',
];

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for active section
  useEffect(() => {
    const handleScroll = () => {
      let found = false;
      for (const id of SECTION_IDS) {
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

  // Helper for active link style
  const activeLink =
    'underline underline-offset-4 text-blue-200 font-semibold';

  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow z-50">
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
        <div className="hidden lg:flex gap-6">
          <Link href="/#hero" className={`hover:underline underline-offset-4 hover:text-blue-200 transition-colors font-medium ${activeSection === 'hero' ? activeLink : ''}`}>Home</Link>
          
          {/* About Dropdown (click to open/close) */}
          <div className="relative" ref={dropdownRef}>
            <button
              className={`hover:underline underline-offset-4 hover:text-blue-200 transition-colors font-medium flex items-center gap-1 focus:outline-none ${['about','case-studies','blog','testimonials'].includes(activeSection) ? activeLink : ''}`}
              onClick={() => setIsDropdownOpen((open) => !open)}
              aria-expanded={isDropdownOpen}
            >
              About
              <svg className={`w-4 h-4 transform transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <Link href="/#about" className={`block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors ${activeSection === 'about' ? 'font-semibold underline text-blue-600' : ''}`} onClick={() => setIsDropdownOpen(false)}>About Us</Link>
                <Link href="/#case-studies" className={`block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors ${activeSection === 'case-studies' ? 'font-semibold underline text-blue-600' : ''}`} onClick={() => setIsDropdownOpen(false)}>Case Studies</Link>
                <Link href="/#blog" className={`block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors ${activeSection === 'blog' ? 'font-semibold underline text-blue-600' : ''}`} onClick={() => setIsDropdownOpen(false)}>Blog</Link>
                <Link href="/#testimonials" className={`block px-4 py-2 text-gray-800 hover:bg-blue-50 hover:text-blue-600 transition-colors ${activeSection === 'testimonials' ? 'font-semibold underline text-blue-600' : ''}`} onClick={() => setIsDropdownOpen(false)}>Testimonials</Link>
              </div>
            )}
          </div>

          <Link href="/#services" className={`hover:underline underline-offset-4 hover:text-blue-200 transition-colors font-medium ${activeSection === 'services' ? activeLink : ''}`}>Services</Link>
          <Link href="/#pricing" className={`hover:underline underline-offset-4 hover:text-blue-200 transition-colors font-medium ${activeSection === 'pricing' ? activeLink : ''}`}>Pricing</Link>
          <Link href="/#contact" className={`hover:underline underline-offset-4 hover:text-blue-200 transition-colors font-medium ${activeSection === 'contact' ? activeLink : ''}`}>Contact</Link>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-blue-900 to-blue-700 shadow-lg z-50">
            <div className="px-4 py-2 space-y-1">
              <Link 
                href="/#hero" 
                className={`block py-2 hover:text-blue-200 transition-colors ${activeSection === 'hero' ? activeLink : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              {/* Collapsible About Dropdown */}
              <div>
                <button
                  className={`w-full flex items-center justify-between font-medium py-2 focus:outline-none ${['about','case-studies','blog','testimonials'].includes(activeSection) ? activeLink : ''}`}
                  onClick={() => setIsMobileAboutOpen((open) => !open)}
                  aria-expanded={isMobileAboutOpen}
                >
                  <span>About</span>
                  <svg
                    className={`w-4 h-4 transform transition-transform duration-200 ${isMobileAboutOpen ? 'rotate-180' : 'rotate-0'}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMobileAboutOpen && (
                  <div className="pl-4 space-y-1">
                    <Link 
                      href="/#about" 
                      className={`block py-2 hover:text-blue-200 transition-colors ${activeSection === 'about' ? activeLink : ''}`}
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileAboutOpen(false); }}
                    >
                      About Us
                    </Link>
                    <Link 
                      href="/#case-studies" 
                      className={`block py-2 hover:text-blue-200 transition-colors ${activeSection === 'case-studies' ? activeLink : ''}`}
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileAboutOpen(false); }}
                    >
                      Case Studies
                    </Link>
                    <Link 
                      href="/#blog" 
                      className={`block py-2 hover:text-blue-200 transition-colors ${activeSection === 'blog' ? activeLink : ''}`}
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileAboutOpen(false); }}
                    >
                      Blog
                    </Link>
                    <Link 
                      href="/#testimonials" 
                      className={`block py-2 hover:text-blue-200 transition-colors ${activeSection === 'testimonials' ? activeLink : ''}`}
                      onClick={() => { setIsMobileMenuOpen(false); setIsMobileAboutOpen(false); }}
                    >
                      Testimonials
                    </Link>
                  </div>
                )}
              </div>

              <Link 
                href="/#services" 
                className={`block py-2 hover:text-blue-200 transition-colors ${activeSection === 'services' ? activeLink : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                href="/#pricing" 
                className={`block py-2 hover:text-blue-200 transition-colors ${activeSection === 'pricing' ? activeLink : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link 
                href="/#contact" 
                className={`block py-2 hover:text-blue-200 transition-colors ${activeSection === 'contact' ? activeLink : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 