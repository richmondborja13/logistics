/*
============================================================
Reports & Analytics Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the Reports & Analytics UI for the logistics registration system.
- Uses Tailwind CSS for layout and styling.
- Mock data for reports is defined at the top of the file (see mockReportData).
- Features include: overview cards, charts, search, filter modal (service, route), filter indicator chips, table, pagination, and notification dropdown.
- The filter modal allows users to select filters, which are only applied when 'Apply' is pressed.
- Filter indicators (chips) are shown below the filter row for active filters.
- To change table columns, filters, or cards, edit the JSX and logic in the Reports component.

Back-end Follow Through:
- Replace mockReportData with API calls or props for real data.
- Connect filtering, searching, sorting, and pagination logic to back-end endpoints or a global state manager.
- For export functionality, connect the Export button to a real report export/download endpoint.
- If using a global state manager (Redux, Zustand, etc.), move state logic out of this component and into the store.
- Ensure any new data fields from the back-end are mapped to the UI components here.
- For notifications, connect the notification logic to a real-time service or REST API.
- Keep the table and filter logic in sync with the back-end for accurate analytics.

Integration Notes:
- The filter modal, notification dropdown, and card logic can be reused in other pages for consistency.
- For additional integration, see README or API documentation.
*/
'use client';

import React, { useState } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

// --- Mock data for reports (Front-end: update for demo, Back-end: replace with API) ---
const mockReportData = {
  overview: {
    totalOrders: 1247,
    totalRevenue: 284750,
    avgDeliveryTime: 2.3,
    customerSatisfaction: 4.6
  },
  monthlyData: [
    { month: 'Jan', orders: 89, revenue: 15600, deliveries: 87 },
    { month: 'Feb', orders: 102, revenue: 18200, deliveries: 98 },
    { month: 'Mar', orders: 115, revenue: 20100, deliveries: 112 },
    { month: 'Apr', orders: 98, revenue: 17500, deliveries: 95 },
    { month: 'May', orders: 134, revenue: 23800, deliveries: 130 },
    { month: 'Jun', orders: 156, revenue: 27500, deliveries: 152 }
  ],
  topRoutes: [
    { route: 'LA → NYC', orders: 89, revenue: 15600, avgTime: 2.1 },
    { route: 'Chicago → Miami', orders: 67, revenue: 12300, avgTime: 1.8 },
    { route: 'Seattle → Denver', orders: 54, revenue: 9800, avgTime: 1.5 },
    { route: 'Boston → Atlanta', orders: 43, revenue: 7800, avgTime: 2.3 },
    { route: 'Phoenix → Houston', orders: 38, revenue: 6900, avgTime: 1.9 }
  ],
  serviceTypes: [
    { type: 'Express', orders: 456, revenue: 89000, percentage: 36.6 },
    { type: 'Standard', orders: 523, revenue: 125000, percentage: 42.0 },
    { type: 'Economy', orders: 268, revenue: 70750, percentage: 21.4 },
    // Additional service types
    { type: 'Same Day', orders: 120, revenue: 34000, percentage: 9.7 },
    { type: 'Overnight', orders: 95, revenue: 41000, percentage: 7.6 },
    { type: 'Freight', orders: 60, revenue: 60000, percentage: 5.2 },
  ]
};

// --- Mock notifications for logistics theme (copied from Orders) ---
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

const Reports = () => {
  // --- State variables (Front-end: local state, Back-end: move to global state if needed) ---
  const [searchTerm, setSearchTerm] = useState('');
  const [filterService, setFilterService] = useState('');
  const [filterRoute, setFilterRoute] = useState('');
  const [modalService, setModalService] = useState('');
  const [modalRoute, setModalRoute] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
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

  // --- Filtering and searching logic (Front-end: UI, Back-end: connect to API) ---
  const filteredRoutes = mockReportData.topRoutes.filter(route => {
    const matchesService = filterService ? (filterService === 'Express' ? route.route.includes('Express') : true) : true;
    const matchesRoute = filterRoute ? route.route === filterRoute : true;
    const matchesSearch = searchTerm === '' || route.route.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesService && matchesRoute && matchesSearch;
  });
  const totalRows = filteredRoutes.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage) || 1;
  const paginatedRoutes = filteredRoutes.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  // --- Modal logic for filter (Front-end: UI, Back-end: connect to global/modal state if needed) ---
  const openFilterModal = () => {
    setModalService(filterService);
    setModalRoute(filterRoute);
    setIsFilterModalOpen(true);
  };

  const serviceTypes = ['All', 'Express', 'Standard', 'Economy'];
  const routes = ['All', 'LA → NYC', 'Chicago → Miami', 'Seattle → Denver', 'Boston → Atlanta', 'Phoenix → Houston'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <div className="p-8">
      {/* Header row: title and notification bell in one row, export button below */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          {/* Notification Bell Icon */}
          <div className="flex items-center justify-end relative">
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
                      <img src={notif.avatar} alt={notif.name} className="w-10 h-10 rounded-full object-cover mt-1" />
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
        {/* New Export Button below title, left-aligned */}
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export
        </button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border hover:shadow-xl transition">
          <div className="flex items-center mb-2">
            <span className="inline-block w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2 text-3xl">📦</span>
          </div>
          <span className="text-3xl font-bold text-blue-600 mb-1">{formatNumber(mockReportData.overview.totalOrders)}</span>
          <div className="text-sm text-gray-500">Total Orders</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border hover:shadow-xl transition">
          <div className="flex items-center mb-2">
            <span className="inline-block w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2 text-3xl">💰</span>
          </div>
          <span className="text-3xl font-bold text-green-600 mb-1">{formatCurrency(mockReportData.overview.totalRevenue)}</span>
          <div className="text-sm text-gray-500">Total Revenue</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border hover:shadow-xl transition">
          <div className="flex items-center mb-2">
            <span className="inline-block w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-2 text-3xl">⏱️</span>
          </div>
          <span className="text-3xl font-bold text-yellow-600 mb-1">{mockReportData.overview.avgDeliveryTime}d</span>
          <div className="text-sm text-gray-500">Avg Delivery Time</div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border hover:shadow-xl transition">
          <div className="flex items-center mb-2">
            <span className="inline-block w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mr-2 text-3xl">💜</span>
          </div>
          <span className="text-3xl font-bold text-purple-600 mb-1">{mockReportData.overview.customerSatisfaction}/5.0</span>
          <div className="text-sm text-gray-500">Customer Satisfaction</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Trends Chart */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Monthly Trends</h3>
          <div className="space-y-4">
            {mockReportData.monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center">
                <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                <div className="flex-1 ml-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Orders: {data.orders}</span>
                    <span className="text-gray-600">Revenue: {formatCurrency(data.revenue)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(data.orders / 156) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Type Distribution */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Service Type Distribution</h3>
          <div className="space-y-4">
            {mockReportData.serviceTypes.map((service) => (
              <div key={service.type} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-3" style={{
                    backgroundColor: service.type === 'Express' ? '#3B82F6' : 
                                   service.type === 'Standard' ? '#10B981' : '#F59E0B'
                  }}></div>
                  <span className="text-sm font-medium">{service.type}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">{formatNumber(service.orders)} orders</div>
                  <div className="text-xs text-gray-500">{service.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search and Filter row */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
        <div className="flex-1 flex items-center gap-2">
          <div className="flex items-center h-10 bg-white border border-gray-300 rounded-lg px-2 shadow-sm">
            <FiSearch className="text-gray-400 mr-2 h-full" />
            <input
              type="text"
              placeholder="Search routes..."
              className="outline-none bg-transparent w-40 md:w-56 text-sm h-full"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={openFilterModal}
          >
            Filter
          </button>
        </div>
      </div>

      {/* Filter Indicator Chips */}
      {(filterService || filterRoute) && (
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {filterService && (
            <span className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              Service: {filterService}
              <button
                className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                onClick={() => setFilterService('')}
                aria-label="Remove service filter"
              >
                &times;
              </button>
            </span>
          )}
          {filterRoute && (
            <span className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Route: {filterRoute}
              <button
                className="ml-2 text-green-500 hover:text-green-700 focus:outline-none"
                onClick={() => setFilterRoute('')}
                aria-label="Remove route filter"
              >
                &times;
              </button>
            </span>
          )}
          <button
            className="ml-2 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300"
            onClick={() => {
              setFilterService('');
              setFilterRoute('');
            }}
          >
            Clear All
          </button>
        </div>
      )}

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <h2 className="text-lg font-semibold mb-4">Filter Routes</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
                <div className="flex flex-wrap gap-2">
                  {serviceTypes.slice(1).map(type => (
                    <button
                      key={type}
                      className={`px-3 py-1 rounded-full border text-sm font-medium transition ${modalService === type ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50'}`}
                      onClick={() => setModalService(type)}
                      type="button"
                    >{type}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                <div className="flex flex-wrap gap-2">
                  {routes.slice(1).map(route => (
                    <button
                      key={route}
                      className={`px-3 py-1 rounded-full border text-sm font-medium transition ${modalRoute === route ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50'}`}
                      onClick={() => setModalRoute(route)}
                      type="button"
                    >{route}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <button
                className="px-3 py-1.5 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 text-base"
                onClick={() => setIsFilterModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700 text-base"
                onClick={() => {
                  setFilterService(modalService);
                  setFilterRoute(modalRoute);
                  setIsFilterModalOpen(false);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Routes Table (Orders style) */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow overflow-hidden border border-blue-100">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Top Performing Routes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50/80">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedRoutes.map((route, index) => (
                <tr key={route.route} className="hover:bg-gray-50/80">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-blue-600 text-xs font-medium">{index + 1 + (page - 1) * rowsPerPage}</span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">{route.route}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.orders}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatCurrency(route.revenue)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{route.avgTime} days</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(route.orders / 89) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{Math.round((route.orders / 89) * 100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination and Rows Per Page */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-6 py-4 bg-white/80 border-t border-blue-100">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page:</span>
            <div className="relative">
              <select
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:outline-none shadow-sm bg-white hover:bg-gray-50 transition appearance-none cursor-pointer"
                value={rowsPerPage}
                onChange={handleRowsPerPageChange}
              >
                {[5, 10, 15, 20].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <FiChevronDown />
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="px-2 py-1 rounded border text-sm disabled:opacity-50"
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >Prev</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`px-2 py-1 rounded border text-sm ${p === page ? 'bg-blue-100 text-blue-700 border-blue-200' : 'border-gray-200 text-gray-700'}`}
                onClick={() => handlePageChange(p)}
              >{p}</button>
            ))}
            <button
              className="px-2 py-1 rounded border text-sm disabled:opacity-50"
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >Next</button>
          </div>
          <div className="text-sm text-gray-500">
            {totalRows === 0
              ? 'No results'
              : `Showing ${(page - 1) * rowsPerPage + 1}-${Math.min(page * rowsPerPage, totalRows)} of ${totalRows}`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports; 