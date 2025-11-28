/*
============================================================
LogisticProvider Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the main provider UI for logistics tracking and management.
- Uses Tailwind CSS for layout and styling.
- Mock data for shipments and notifications is defined at the top of the file.
- Notification dropdown is included with filter bubbles (All, Unread, Read).
- To change the provider layout or add new widgets, edit the JSX in the LogisticProvider component.

Back-end Follow Through:
- To connect to real data, replace the mockShipments and mockNotifications objects with API calls or props.
- For notifications, connect the notification logic to a real-time service or REST API.
- If using a global state manager (Redux, Zustand, etc.), move state logic out of this component and into the store.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The notification dropdown and filter logic can be reused in other pages for consistency.
- For additional integration, see README or API documentation.
*/

import Image from 'next/image';
import React, { useState } from 'react';

type Region = 'North America' | 'Europe' | 'Asia Pacific';

const mockShipments = {
    'All': [
        {
            id: '1',
            number: 'NA-202312345',
            status: 'In transit',
            category: 'Food',
            departure: '12-2-22',
            arrival: '17-2-22',
            driver: 'Mr. John',
            region: 'North America' as Region
        },
        {
            id: '2',
            number: 'EU-202312346',
            status: 'Completed',
            category: 'Clothes',
            departure: '10-2-22',
            arrival: '15-2-22',
            driver: 'Ms. Jane',
            region: 'Europe' as Region
        },
        {
            id: '3',
            number: 'AP-202312347',
            status: 'Prepared',
            category: 'Electronics',
            departure: '14-2-22',
            arrival: '19-2-22',
            driver: 'Mr. Smith',
            region: 'Asia Pacific' as Region
        },
        {
            id: '4',
            number: 'NA-202312348',
            status: 'Failed',
            category: 'Furniture',
            departure: '13-2-22',
            arrival: '18-2-22',
            driver: 'Mr. Brown',
            region: 'North America' as Region
        }
    ],
    'Prepared': [
        {
            id: '5',
            number: 'AP-202312349',
            status: 'Prepared',
            category: 'Electronics',
            departure: '15-2-22',
            arrival: '20-2-22',
            driver: 'Mr. Wilson',
            region: 'Asia Pacific' as Region
        },
        {
            id: '6',
            number: 'EU-202312350',
            status: 'Prepared',
            category: 'Food',
            departure: '16-2-22',
            arrival: '21-2-22',
            driver: 'Ms. Davis',
            region: 'Europe' as Region
        }
    ],
    'In-transit': [
        {
            id: '7',
            number: 'NA-202312351',
            status: 'In transit',
            category: 'Clothes',
            departure: '11-2-22',
            arrival: '16-2-22',
            driver: 'Mr. Taylor',
            region: 'North America' as Region
        },
        {
            id: '8',
            number: 'AP-202312352',
            status: 'In transit',
            category: 'Electronics',
            departure: '13-2-22',
            arrival: '18-2-22',
            driver: 'Ms. Anderson',
            region: 'Asia Pacific' as Region
        }
    ],
    'Completed': [
        {
            id: '9',
            number: 'EU-202312353',
            status: 'Completed',
            category: 'Furniture',
            departure: '08-2-22',
            arrival: '13-2-22',
            driver: 'Mr. Martinez',
            region: 'Europe' as Region
        },
        {
            id: '10',
            number: 'NA-202312354',
            status: 'Completed',
            category: 'Food',
            departure: '09-2-22',
            arrival: '14-2-22',
            driver: 'Ms. Garcia',
            region: 'North America' as Region
        }
    ],
    'Failed': [
        {
            id: '11',
            number: 'AP-202312355',
            status: 'Failed',
            category: 'Electronics',
            departure: '10-2-22',
            arrival: '15-2-22',
            driver: 'Mr. Robinson',
            region: 'Asia Pacific' as Region
        },
        {
            id: '12',
            number: 'EU-202312356',
            status: 'Failed',
            category: 'Clothes',
            departure: '11-2-22',
            arrival: '16-2-22',
            driver: 'Ms. Clark',
            region: 'Europe' as Region
        }
    ]
};

const statusColors: Record<string, string> = {
'In transit': 'bg-yellow-100 text-yellow-800',
Completed: 'bg-green-100 text-green-800',
Prepared: 'bg-blue-100 text-blue-800',
Failed: 'bg-red-100 text-red-800',
};

const TopBar: React.FC<{
    activeFilter: string;
    setActiveFilter: (filter: string) => void;
}> = ({ activeFilter, setActiveFilter }) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-4">
                <button 
                    className={`px-4 py-2 rounded font-medium border ${
                        activeFilter === 'All' 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white/80 backdrop-blur-sm text-gray-700 border-blue-200 hover:bg-white/90'
                    }`}
                    onClick={() => setActiveFilter('All')}
                >
                    All
                </button>
                <button 
                    className={`px-4 py-2 rounded font-medium border ${
                        activeFilter === 'Prepared' 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white/80 backdrop-blur-sm text-gray-700 border-blue-200 hover:bg-white/90'
                    }`}
                    onClick={() => setActiveFilter('Prepared')}
                >
                    Prepared
                </button>
                <button 
                    className={`px-4 py-2 rounded font-medium border ${
                        activeFilter === 'In-transit' 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white/80 backdrop-blur-sm text-gray-700 border-blue-200 hover:bg-white/90'
                    }`}
                    onClick={() => setActiveFilter('In-transit')}
                >
                    In-transit
                </button>
                <button 
                    className={`px-4 py-2 rounded font-medium border ${
                        activeFilter === 'Completed' 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white/80 backdrop-blur-sm text-gray-700 border-blue-200 hover:bg-white/90'
                    }`}
                    onClick={() => setActiveFilter('Completed')}
                >
                    Completed
                </button>
                <button 
                    className={`px-4 py-2 rounded font-medium border ${
                        activeFilter === 'Failed' 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white/80 backdrop-blur-sm text-gray-700 border-blue-200 hover:bg-white/90'
                    }`}
                    onClick={() => setActiveFilter('Failed')}
                >
                    Failed
                </button>
            </div>
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    placeholder="Search order, items..."
                    className="px-3 py-2 border border-blue-200 rounded focus:outline-none focus:ring w-56 bg-white/80 backdrop-blur-sm"
                />
                <button className="px-3 py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded hover:bg-white/90">Sort</button>
                <button className="px-3 py-2 bg-blue-600 text-white rounded border border-blue-600">Add filter</button>
            </div>
        </div>
    );
};

const ShipmentCard: React.FC<{ shipment: typeof mockShipments['All'][0] }> = ({ shipment }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow p-5 flex flex-col space-y-2 border border-blue-100">
        <div className="flex items-center justify-between">
            <div className="font-semibold text-gray-700">{shipment.number}</div>
            <span className={`text-xs px-2 py-1 rounded ${statusColors[shipment.status] || 'bg-gray-100 text-gray-500'}`}>{shipment.status}</span>
        </div>
        <div className="text-sm text-gray-500">
            Category: <span className="text-gray-700">{shipment.category}</span>
            <span className="ml-2 text-blue-600">({shipment.region})</span>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
            <div>
                <div>Departure</div>
                <div className="text-gray-700">{shipment.departure}</div>
            </div>
            <div>
                <div>Arrival</div>
                <div className="text-gray-700">{shipment.arrival}</div>
            </div>
        </div>
        <div className="flex items-center justify-between mt-2">
            <div className="text-xs text-gray-500">Driver: <span className="text-gray-700">{shipment.driver}</span></div>
            <div className="flex space-x-2">
                <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-blue-100">📞</button>
                <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-blue-100">💬</button>
            </div>
        </div>
    </div>
);

// Google Maps embed URL (replace with your own as needed)
const GOOGLE_MAPS_EMBED_URL =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019019857726!2d-122.4194151846812!3d37.7749297797597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c7e6b1b1b%3A0x4a0b8b8b8b8b8b8b!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus';

const MapSection = () => (
    <div className="bg-gray-100 rounded-xl h-full w-full flex flex-col items-center justify-start border p-2">
        <div className="w-full h-72 md:h-full rounded-xl overflow-hidden">
            <iframe
                title="Google Map"
                src={GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
        </div>
        <div className="mt-2 text-xs text-gray-500 w-full text-center">
            <span>Embed your map by changing the URL in <code>GOOGLE_MAPS_EMBED_URL</code> in this file.</span>
        </div>
    </div>
);

// Mock notifications for logistics theme
const mockNotifications = [
  {
    id: 1,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Sarah Johnson',
    nameColor: 'text-blue-600',
    message: 'Document Invoice_2024_001.pdf was approved.',
    detail: 'Approved by admin',
    time: '5 mins ago',
  },
  {
    id: 2,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'Michael Chen',
    nameColor: 'text-blue-600',
    message: 'Shipment NA-202312345 is now in transit.',
    detail: 'Track your shipment',
    time: '21 mins ago',
  },
  {
    id: 3,
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    name: 'John Doe',
    nameColor: 'text-gray-800',
    message: 'Order ORD-2024-002 has been delivered.',
    detail: 'Delivery completed',
    time: '2 hrs ago',
  },
  {
    id: 4,
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    name: 'Sarah Johnson',
    nameColor: 'text-gray-800',
    message: 'New document uploaded: BOL_TRK_789.pdf',
    detail: 'Pending approval',
    time: '3 hrs ago',
  },
  {
    id: 5,
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    name: 'Anna Lee',
    nameColor: 'text-gray-800',
    message: 'Reminder: Complete your service registration.',
    detail: '',
    time: '1 day ago',
  },
];

/**
 * LogisticProvider Component
 * Main provider page for logistics tracking and management.
 * See file-level comment for front-end and back-end integration notes.
 */
const LogisticProvider: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifFilter, setNotifFilter] = useState<'all' | 'unread' | 'read'>('all');

  const currentShipments = mockShipments[activeFilter as keyof typeof mockShipments];

  // Add read/unread status to notifications for filtering
  const notificationsWithStatus = mockNotifications.map((notif, idx) => ({
    ...notif,
    read: idx > 1, // First two are unread, rest are read for demo
  }));
  const filteredNotifications =
    notifFilter === 'all'
      ? notificationsWithStatus
      : notificationsWithStatus.filter((n) => notifFilter === 'read' ? n.read : !n.read);

  return (
    <div className="flex min-h-screen bg-gray-50 w-full">
        <main className="flex-1 p-8">
            {/* Page Title and Notification Bell Row */}
            <div className="flex items-center justify-between mb-6 relative w-full">
              <h1 className="text-2xl font-bold text-gray-800"> Tracking Page</h1>
              <button
                className="relative p-2 rounded-full bg-white shadow hover:bg-gray-100 focus:outline-none"
                onClick={() => setShowNotifications((prev) => !prev)}
                aria-label="Show notifications"
              >
                <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-4 w-96 bg-white rounded-xl shadow-2xl z-50 border border-gray-100 animate-fade-in">
                  <div className="px-6 pt-4 pb-2 border-b flex items-center justify-between">
                    <span className="font-semibold text-lg">Notifications</span>
                    <button className="p-1 text-gray-400 hover:text-gray-600" onClick={() => setShowNotifications(false)} aria-label="Close notifications">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  {/* Filter Bubbles */}
                  <div className="flex gap-2 px-6 py-3 border-b">
                    {['all', 'unread', 'read'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setNotifFilter(type as 'all' | 'unread' | 'read')}
                        className={`px-4 py-1 rounded-full text-sm font-medium transition border 
                          ${notifFilter === type
                            ? 'bg-blue-50 text-blue-600 border-blue-200 shadow'
                            : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'}`}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                  <ul className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                    {filteredNotifications.map((notif) => (
                      <li key={notif.id} className="flex items-start gap-3 px-6 py-4 hover:bg-gray-50 transition">
                        <Image
                          src={notif.avatar}
                          alt={notif.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover mt-1"
                          unoptimized
                        />
                        <div className="flex-1">
                          <div className="text-sm">
                            <span className={`font-semibold ${notif.nameColor}`}>{notif.name}</span>
                            <span className="ml-1 text-gray-700">{notif.message}</span>
                          </div>
                          {notif.detail && <div className="text-xs text-gray-400 mt-0.5">{notif.detail}</div>}
                        </div>
                        <div className="text-xs text-gray-400 whitespace-nowrap mt-1">{notif.time}</div>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center py-3 border-t">
                    <a href="#" className="text-blue-600 text-sm font-medium hover:underline">See all incoming activity</a>
                  </div>
                </div>
              )}
            </div>
            <TopBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Left: Shipment Cards */}
                <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* New Package Card */}
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center p-6 border border-dashed border-blue-200 cursor-pointer hover:bg-white/90 transition">
                            <div className="text-5xl mb-2">📦</div>
                            <div className="font-semibold text-lg mb-1">New Package</div>
                            <div className="text-gray-400 text-sm">Add new shipment</div>
                            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded border border-blue-600">+</button>
                        </div>
                        {/* Shipment Cards */}
                        {currentShipments.map((shipment) => (
                            <ShipmentCard key={shipment.id} shipment={shipment} />
                        ))}
                    </div>
                </div>
                {/* Right: Map Section */}
                <div className="w-full lg:w-[400px] xl:w-[500px] min-h-[350px]">
                    <MapSection />
                </div>
            </div>
        </main>
    </div>
    );
};

export default LogisticProvider;
