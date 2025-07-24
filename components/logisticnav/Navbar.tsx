/*
============================================================
Navbar Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the main navigation sidebar for the logistics registration system.
- Uses Tailwind CSS for layout and styling.
- Navigation items are defined in the navItems array; update this array to add or remove navigation links.
- The sidebar supports collapse/expand functionality for improved UX.
- User info and logout button are included at the top and bottom, respectively.
- To change navigation structure or icons, edit the navItems array and related JSX.

Back-end Follow Through:
- To connect to real user data, replace the userName and userRole props with values from authentication/user context or API.
- For navigation permissions, conditionally render navItems based on user roles or permissions from the back-end.
- If using a global state manager (Redux, Zustand, etc.), move user state logic out of this component and into the store.
- Ensure any new navigation routes from the back-end are mapped to the navItems array and handled in the router.

Integration Notes:
- The sidebar navigation logic can be reused in other pages for consistency.
- For additional integration, see README or API documentation.
*/
"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Home,Search,Package,FileText,BarChart,Users,LogOut,ChevronLeft,ChevronRight
} from 'lucide-react';

interface NavbarProps {
    userName?: string;
    userRole?: string;
}

const Navbar: React.FC<NavbarProps> = ({ 
    userName = "John Doe", 
    userRole = "Logistics Manager" 
}) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const isActive = (path: string) => {
        if (path === '/logistics/dashboard') {
            return pathname === path || pathname === '/logistics' ? 'text-blue-600 bg-blue-50 rounded px-2 py-1' : 'text-gray-700 hover:text-blue-600';
        }
        return pathname === path ? 'text-blue-600 bg-blue-50 rounded px-2 py-1' : 'text-gray-700 hover:text-blue-600';
    };

    const navItems = [
        { name: 'Dashboard', path: '/logistics/dashboard', icon: <Home className="w-5 h-5 mr-2" /> },
        { name: 'Tracking', path: '/logistics/tracking', icon: <Search className="w-5 h-5 mr-2" /> },
        { name: 'Orders', path: '/logistics/orders', icon: <Package className="w-5 h-5 mr-2" /> },
        { name: 'Documents', path: '/logistics/documents', icon: <FileText className="w-5 h-5 mr-2" /> },
        { name: 'Report', path: '/logistics/report', icon: <BarChart className="w-5 h-5 mr-2" /> },
    ];

    return (
        <aside className={`bg-white ${isCollapsed ? 'w-16' : 'w-56'} min-h-screen p-6 flex flex-col border-r transition-all duration-200`}> 
            {/* Collapse/Expand Button */}
            <button
                className={`absolute top-4 left-${isCollapsed ? '16' : '56'} -translate-x-1/2 z-10 bg-white border rounded-full shadow p-1 transition-all duration-200 ${isCollapsed ? '' : ''}`}
                style={{ left: isCollapsed ? '4rem' : '14rem' }}
                onClick={() => setIsCollapsed((prev) => !prev)}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
                {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            {/* User Info */}
            {!isCollapsed && (
            <>
            <button className="flex items-center mb-4 w-full hover:bg-gray-100 rounded-lg transition relative group" onClick={() => router.push('/logistics/profile')} aria-label="Go to profile">
                <div className="w-12 h-12 rounded-full bg-gray-200 mr-3" />
                <div className="text-left">
                    <div className="font-semibold">{userName}</div>
                    <div className="text-xs text-gray-500">{userRole}</div>
                </div>
                <span className="absolute left-1/2 -translate-x-1/2 -top-7 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">Profile</span>
            </button>
            <hr className="border-t border-gray-200 mb-6" />
            </>
            )}
            <nav className="flex-1">
                <ul className={`space-y-4 ${isCollapsed ? 'flex flex-col items-center' : ''}`}>
                    {navItems.map((item) => (
                        <li key={item.path}>
                            <Link 
                                href={item.path}
                                className={`font-medium cursor-pointer flex items-center ${isActive(item.path)} ${isCollapsed ? 'justify-center' : ''}`}
                            >
                                {React.cloneElement(item.icon, { className: `w-5 h-5 ${isCollapsed ? '' : 'mr-2'}` })}
                                {!isCollapsed && item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <button 
                className={`mt-10 text-sm text-gray-500 hover:text-red-500 flex items-center ${isCollapsed ? 'justify-center' : ''}`}
                onClick={() => router.push('/')}
            >
                <LogOut className={`w-5 h-5 ${isCollapsed ? '' : 'mr-2'}`} />
                {!isCollapsed && 'Logout'}
            </button>
        </aside>
    );
};

export default Navbar; 