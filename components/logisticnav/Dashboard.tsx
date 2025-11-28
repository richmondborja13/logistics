/*
============================================================
Dashboard Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the main dashboard UI for the logistics registration system.
- Uses Tailwind CSS for layout and styling.
- Mock data for summary cards, tasks, locations, and tips is defined at the top of the file.
- Notification dropdown is included with filter bubbles (All, Unread, Read).
- To change the dashboard layout or add new widgets, edit the JSX in the Dashboard component.

Back-end Follow Through:
- To connect to real data, replace the mock data objects (mockReportData, mockTasks, etc.) with API calls or props.
- For notifications, connect the notification logic to a real-time service or REST API.
- If using a global state manager (Redux, Zustand, etc.), move state logic out of this component and into the store.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The notification dropdown and filter logic can be reused in other pages for consistency.
- For additional integration, see README or API documentation.
*/

import Image from 'next/image';
import React, { useState } from 'react';
// Import mock data from other files (copy here for simplicity)

// --- Mock Data for Tasks, Budget, Locations, Tips ---
const mockTasks = [
  {
    id: 1,
    title: 'Pack kitchen and fragile items',
    type: 'Packing',
    due: 'With in 1 days',
    assigned: 'Oliver Watson',
    status: 'Completed',
  },
  {
    id: 2,
    title: 'Collect necessary documents',
    type: 'Planning',
    due: 'With in 1 days',
    assigned: 'Marilia Watson',
    status: 'Completed',
  },
  {
    id: 3,
    title: 'Label boxes by room',
    type: 'Packing',
    due: 'With in 2 days',
    assigned: 'Oliver Watson',
    status: 'Completed',
  },
  {
    id: 4,
    title: 'Label boxes by room',
    type: 'Packing',
    due: 'With in 4 days',
    assigned: 'Emma Watson',
    status: 'In Progress',
  },
  {
    id: 5,
    title: 'Label boxes by room',
    type: 'Packing',
    due: 'With in 4 days',
    assigned: 'Marilia Watson',
    status: 'In Progress',
  },
];

const mockLocations = {
  current: {
    address: '123 Oak Street, Springfield, IL',
    time: '2:15 PM CST',
    date: 'September 31, 2024',
    distance: '1,500 miles',
  },
  newHome: {
    address: '789 Maple Avenue, San Francisco, CA',
    time: '12:15 PM PST',
    date: 'September 31, 2024',
    eta: 'November 14, 2024',
    timeDiff: '-2 hours',
  },
};

const mockTips = [
  {
    title: 'Label by Room',
    desc: 'Label boxes by room to make unpacking easier.',
    links: [
      { url: 'google.com', label: 'google.com' },
      { url: 'medium.com', label: 'medium.com' },
    ],
  },
  {
    title: 'Essentials Box',
    desc: 'Pack a separate box with essential items you\'ll need immediately after the move.',
    links: [
      { url: 'google.com', label: 'google.com' },
    ],
  },
  {
    title: 'Use Bubble Wrap',
    desc: 'Wrap fragile items in bubble wrap or soft towels to avoid breakage.',
    links: [
      { url: 'google.com', label: 'google.com' },
      { url: 'medium.com', label: 'medium.com' },
    ],
  },
];

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
 * Dashboard Component
 * Main dashboard for logistics registration UI.
 * See file-level comment for front-end and back-end integration notes.
 */
const Dashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifFilter, setNotifFilter] = useState<'all' | 'unread' | 'read'>('all');

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 relative">
        <div>
          <h2 className="text-2xl font-bold">Welcome to Dashboard, John Doe.</h2>
          <p className="text-gray-500 text-sm">Ready to take the next step in your move?</p>
        </div>
        {/* Notification Bell Icon */}
        <div className="flex items-center justify-end w-full md:w-auto relative">
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
      </div>
      {/* Tabs */}
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6 lg:col-span-2">
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
              <div className="text-2xl font-bold">32<span className="text-gray-400">/45</span></div>
              <div className="text-xs text-gray-500 mt-1">Total boxes packed</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
              <div className="text-2xl font-bold">3<span className="text-gray-400">/5</span></div>
              <div className="text-xs text-gray-500 mt-1">Total services ordered</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
              <div className="text-2xl font-bold">14<span className="text-gray-400">/18</span></div>
              <div className="text-xs text-gray-500 mt-1">Completed tasks</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
              <div className="text-2xl font-bold">65<span className="text-gray-400">%</span></div>
              <div className="text-xs text-gray-500 mt-1">Moving progress</div>
            </div>
          </div>
          {/* Tasks & Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tasks */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-gray-700">Tasks</div>
                <button className="text-xs text-blue-600">+ Add New</button>
              </div>
              <ul className="divide-y divide-gray-100">
                {mockTasks.map((task) => (
                  <li key={task.id} className="py-2 flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-800 text-sm">{task.title}</div>
                      <div className="text-xs text-gray-400">Type: {task.type}</div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className={`text-xs font-semibold ${task.status === 'Completed' ? 'text-green-600' : 'text-yellow-600'}`}>{task.status}</span>
                      <span className="text-xs text-gray-400">{task.due}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {/* Budget */}
            <div className="bg-white rounded-lg shadow p-4 flex flex-col justify-between">
              <div>
                <div className="font-semibold text-gray-700 mb-2">Moving Budget</div>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="text-xs text-gray-400">Total budget:</div>
                    <div className="font-bold text-lg">$5,000</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Spent:</div>
                    <div className="font-bold text-lg">$3,200</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">Remaining:</div>
                    <div className="font-bold text-lg">$1,800</div>
                  </div>
                </div>
                <div className="w-full h-20 flex items-end">
                  <div className="w-full h-2 bg-gray-200 rounded-full relative">
                    <div className="absolute left-0 top-0 h-2 bg-blue-500 rounded-full" style={{ width: '64%' }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-400">$850.00 on Sep 12</div>
            </div>
          </div>
          {/* Locations & Map */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Locations */}
            <div className="bg-white rounded-lg shadow p-4 md:col-span-1">
              <div className="font-semibold text-gray-700 mb-2">Moving Locations</div>
              <div className="mb-4">
                <div className="text-xs text-gray-400">Current location:</div>
                <div className="font-medium text-gray-800">{mockLocations.current.address}</div>
                <div className="text-xs text-gray-400">Distance to destination: {mockLocations.current.distance}</div>
                <div className="text-xs text-gray-400">{mockLocations.current.time} | {mockLocations.current.date}</div>
              </div>
              <div>
                <div className="text-xs text-gray-400">New home location:</div>
                <div className="font-medium text-gray-800">{mockLocations.newHome.address}</div>
                <div className="text-xs text-gray-400">Time Difference: {mockLocations.newHome.timeDiff}</div>
                <div className="text-xs text-gray-400">Estimated arrival: {mockLocations.newHome.eta}</div>
                <div className="text-xs text-gray-400">{mockLocations.newHome.time} | {mockLocations.newHome.date}</div>
              </div>
            </div>
            {/* Map */}
            <div className="bg-white rounded-lg shadow p-4 md:col-span-2 flex flex-col items-center justify-center">
              <div className="w-full h-64 rounded-lg overflow-hidden">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019019857726!2d-122.4194151846812!3d37.7749297797597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c7e6b1b1b%3A0x4a0b8b8b8b8b8b8b!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
        {/* Right Column: Tips */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold text-gray-700">Moving Tips <span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">AI Based</span></div>
              <button className="text-xs text-blue-600">↗</button>
            </div>
            <ul className="space-y-3">
              {mockTips.map((tip, idx) => (
                <li key={idx} className="border-b last:border-b-0 pb-2">
                  <div className="font-medium text-gray-800 text-sm">{tip.title}</div>
                  <div className="text-xs text-gray-500 mb-1">{tip.desc}</div>
                  <div className="flex gap-2">
                    {tip.links.map((link, i) => (
                      <a key={i} href={`https://${link.url}`} className="text-xs text-blue-500 underline" target="_blank" rel="noopener noreferrer">{link.label}</a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

