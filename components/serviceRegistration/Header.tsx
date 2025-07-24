/*
============================================================
ServiceRegistrationHeader Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the header for the service registration pages.
- Uses Tailwind CSS for layout and styling.
- Displays the site title and tagline.
- To update branding or tagline, edit the JSX in the ServiceRegistrationHeader component.

Back-end Follow Through:
- If dynamic branding or tagline is needed, replace static values with API calls or props.
- For authentication-aware headers, connect to user context or API.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The header can be reused or extended for other registration or onboarding pages.
- For additional integration, see README or API documentation.
*/
import Link from 'next/link';

export default function ServiceRegistrationHeader() {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white shadow z-50">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="text-2xl font-bold tracking-tight hover:text-blue-200 transition-colors">
          Ship Happens
        </Link>
        <div className="flex flex-col items-end justify-center">
          <span className="font-medium text-blue-100 text-sm text-right">Delivering Possibilities, Connecting the World.</span>
          <span className="text-xs text-blue-50 leading-tight">Est. 2008</span>
        </div>
      </nav>
    </header>
  );
} 