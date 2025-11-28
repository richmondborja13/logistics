/*
============================================================
Orders Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the Orders management UI for the logistics registration system.
- Uses Tailwind CSS for layout and styling.
- Mock data for orders is defined at the top of the file (see mockProducts array).
- Features include: search, filter (status, region, category), sorting, and pagination.
- The filter modal allows users to select filters, which are only applied when 'Apply' is pressed.
- Filter indicators (chips) are shown below the filter row for active filters.
- To change table columns or filters, edit the JSX and logic in the Orders component.

Back-end Follow Through:
- To connect to real data, replace the mockProducts array with API calls or props.
- For filtering, sorting, and pagination, connect the UI logic to back-end endpoints or a global state manager.
- If using a global state manager (Redux, Zustand, etc.), move state logic out of this component and into the store.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The filter modal and indicator logic can be reused in other pages for consistency.
- For additional integration, see README or API documentation.
*/
'use client';

import Image from 'next/image';
import * as React from "react";
import { useState, useMemo } from 'react';
import { FiSearch, FiChevronDown, FiChevronUp } from 'react-icons/fi';

type Region = 'North America' | 'Europe' | 'Asia Pacific';

// --- Mock Data for Orders Table (Front-end: update for demo, Back-end: replace with API) ---
const mockProducts = [
    {
        id: 1,
        name: 'Nike Air Max 270',
        brand: 'Nike',
        price: 150.99,
        stock: 45,
        orderDate: '2024-03-15',
        status: 'In Stock',
        category: 'Running',
        size: '42',
        color: 'White/Black',
        region: 'North America' as Region,
        code: 'NA-SHOE-001',
        location: 'New York Warehouse'
    },
    {
        id: 2,
        name: 'Adidas Ultraboost 22',
        brand: 'Adidas',
        price: 180.00,
        stock: 30,
        orderDate: '2024-03-14',
        status: 'Low Stock',
        category: 'Running',
        size: '41',
        color: 'Core Black',
        region: 'Europe' as Region,
        code: 'EU-SHOE-002',
        location: 'London Warehouse'
    },
    {
        id: 3,
        name: 'New Balance 574',
        brand: 'New Balance',
        price: 89.99,
        stock: 60,
        orderDate: '2024-03-13',
        status: 'In Stock',
        category: 'Casual',
        size: '43',
        color: 'Grey',
        region: 'Asia Pacific' as Region,
        code: 'AP-SHOE-003',
        location: 'Tokyo Warehouse'
    },
    {
        id: 4,
        name: 'Puma RS-X',
        brand: 'Puma',
        price: 110.00,
        stock: 25,
        orderDate: '2024-03-12',
        status: 'Low Stock',
        category: 'Lifestyle',
        size: '40',
        color: 'Blue/Red',
        region: 'North America' as Region,
        code: 'NA-SHOE-004',
        location: 'Los Angeles Warehouse'
    },
    {
        id: 5,
        name: 'Reebok Classic Leather',
        brand: 'Reebok',
        price: 75.00,
        stock: 50,
        orderDate: '2024-03-11',
        status: 'In Stock',
        category: 'Casual',
        size: '44',
        color: 'White',
        region: 'Europe' as Region,
        code: 'EU-SHOE-005',
        location: 'Paris Warehouse'
    },
    {
        id: 6,
        name: 'Asics Gel-Nimbus',
        brand: 'Asics',
        price: 160.00,
        stock: 35,
        orderDate: '2024-03-10',
        status: 'In Stock',
        category: 'Running',
        size: '42',
        color: 'Blue/White',
        region: 'Asia Pacific' as Region,
        code: 'AP-SHOE-006',
        location: 'Singapore Warehouse'
    },
    {
        id: 7,
        name: 'Converse Chuck Taylor',
        brand: 'Converse',
        price: 65.00,
        stock: 80,
        orderDate: '2024-03-09',
        status: 'In Stock',
        category: 'Casual',
        size: '42',
        color: 'Black/White',
        region: 'North America' as Region,
        code: 'NA-SHOE-007',
        location: 'Chicago Warehouse'
    },
    {
        id: 8,
        name: 'Fila Disruptor II',
        brand: 'Fila',
        price: 70.00,
        stock: 20,
        orderDate: '2024-03-08',
        status: 'Low Stock',
        category: 'Lifestyle',
        size: '41',
        color: 'White',
        region: 'Europe' as Region,
        code: 'EU-SHOE-008',
        location: 'Berlin Warehouse'
    },
    {
        id: 9,
        name: 'Vans Old Skool',
        brand: 'Vans',
        price: 60.00,
        stock: 55,
        orderDate: '2024-03-07',
        status: 'In Stock',
        category: 'Casual',
        size: '43',
        color: 'Black',
        region: 'Asia Pacific' as Region,
        code: 'AP-SHOE-009',
        location: 'Seoul Warehouse'
    },
    {
        id: 10,
        name: 'Under Armour HOVR',
        brand: 'Under Armour',
        price: 120.00,
        stock: 40,
        orderDate: '2024-03-06',
        status: 'In Stock',
        category: 'Running',
        size: '44',
        color: 'Red/Black',
        region: 'North America' as Region,
        code: 'NA-SHOE-010',
        location: 'Dallas Warehouse'
    },
    {
        id: 11,
        name: 'Saucony Jazz Original',
        brand: 'Saucony',
        price: 85.00,
        stock: 15,
        orderDate: '2024-03-05',
        status: 'Low Stock',
        category: 'Lifestyle',
        size: '42',
        color: 'Grey/Blue',
        region: 'Europe' as Region,
        code: 'EU-SHOE-011',
        location: 'Madrid Warehouse'
    },
    {
        id: 12,
        name: 'Mizuno Wave Rider',
        brand: 'Mizuno',
        price: 130.00,
        stock: 28,
        orderDate: '2024-03-04',
        status: 'In Stock',
        category: 'Running',
        size: '41',
        color: 'Blue/White',
        region: 'Asia Pacific' as Region,
        code: 'AP-SHOE-012',
        location: 'Bangkok Warehouse'
    },
    {
        id: 13,
        name: 'Brooks Ghost 14',
        brand: 'Brooks',
        price: 140.00,
        stock: 33,
        orderDate: '2024-03-03',
        status: 'In Stock',
        category: 'Running',
        size: '43',
        color: 'Black/Blue',
        region: 'North America' as Region,
        code: 'NA-SHOE-013',
        location: 'Boston Warehouse'
    },
    {
        id: 14,
        name: 'On Cloud X',
        brand: 'On',
        price: 150.00,
        stock: 22,
        orderDate: '2024-03-02',
        status: 'Low Stock',
        category: 'Running',
        size: '42',
        color: 'White/Black',
        region: 'Europe' as Region,
        code: 'EU-SHOE-014',
        location: 'Zurich Warehouse'
    },
    {
        id: 15,
        name: 'Hoka One One Clifton',
        brand: 'Hoka One One',
        price: 145.00,
        stock: 18,
        orderDate: '2024-03-01',
        status: 'Low Stock',
        category: 'Running',
        size: '44',
        color: 'Blue/Yellow',
        region: 'Asia Pacific' as Region,
        code: 'AP-SHOE-015',
        location: 'Sydney Warehouse'
    },
    {
        id: 16,
        name: 'Jordan 1 Retro',
        brand: 'Jordan',
        price: 200.00,
        stock: 10,
        orderDate: '2024-02-28',
        status: 'Low Stock',
        category: 'Lifestyle',
        size: '45',
        color: 'Red/White/Black',
        region: 'North America' as Region,
        code: 'NA-SHOE-016',
        location: 'Detroit Warehouse'
    }
];

type SortField = 'name' | 'brand' | 'price' | 'stock' | 'orderDate' | 'status' | 'region' | 'code';
type SortDirection = 'asc' | 'desc';

// --- Mock notifications for logistics theme (copied from LogisticProvider) ---
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
 * Orders Component
 * Orders management page for logistics registration UI.
 *
 * Front-end Guide:
 * - Implements the Orders table, search, filter modal (status, region, category), sorting, and pagination.
 * - Uses Tailwind CSS for layout and styling.
 * - Uses mockProducts array for demo data; update this for new columns or mock scenarios.
 * - Filter modal state is managed locally and only applied on 'Apply'.
 * - Filter indicator chips are shown below the filter row for active filters.
 *
 * Back-end Follow Through:
 * - Replace mockProducts with API calls or props for real data.
 * - Connect filter, sort, and pagination logic to back-end endpoints or global state manager.
 * - Move state logic to Redux/Zustand/etc. if using global state.
 * - Map new back-end fields to table columns and filters as needed.
 */
const Orders: React.FC = () => {
    // --- State Variables (Front-end: local state, Back-end: move to global state if needed) ---
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState<SortField>('orderDate');
    const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(1);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState<string>('');
    const [filterRegion, setFilterRegion] = useState<string>('');
    const [filterDateRange, setFilterDateRange] = useState<{ start: string; end: string }>({ start: '', end: '' });
    const [filterCategory, setFilterCategory] = useState<string>('');
    // Modal temp state for filter modal
    const [modalStatus, setModalStatus] = useState<string>('');
    const [modalRegion, setModalRegion] = useState<string>('');
    const [modalCategory, setModalCategory] = useState<string>('');

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

    const handleSort = (field: SortField) => {
        if (field === sortField) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    // --- Filtering and Sorting Logic (Front-end: UI logic, Back-end: connect to API) ---
    const filteredAndSortedProducts = useMemo(() => {
        return mockProducts
            .filter(product => {
                // Search, status, region, and category filters
                const matchesSearch = 
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.category.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesStatus = filterStatus ? product.status === filterStatus : true;
                const matchesRegion = filterRegion ? product.region === filterRegion : true;
                const matchesCategory = filterCategory ? product.category === filterCategory : true;
                return matchesSearch && matchesStatus && matchesRegion && matchesCategory;
            })
            .sort((a, b) => {
                // Sorting logic for all columns
                const aValue = a[sortField];
                const bValue = b[sortField];
                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortDirection === 'asc' 
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);
                }
                return sortDirection === 'asc'
                    ? (aValue as number) - (bValue as number)
                    : (bValue as number) - (aValue as number);
            });
    }, [searchTerm, sortField, sortDirection, filterStatus, filterRegion, filterCategory]);

    // --- Pagination Logic (Front-end: UI only, Back-end: connect to paginated API) ---
    const totalRows = filteredAndSortedProducts.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage) || 1;
    const paginatedProducts = filteredAndSortedProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage);
    const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    };
    const handlePageChange = (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
    };

    // --- Sorting Icon Helper (Front-end only) ---
    const SortIcon = ({ field }: { field: SortField }) => {
        if (field !== sortField) return null;
        return sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />;
    };

    // --- Order Stats for Cards (Front-end: summary UI, Back-end: connect to stats API) ---
    const totalOrders = filteredAndSortedProducts.length;
    const statusCounts = filteredAndSortedProducts.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );
    const statusColors: Record<string, string> = {
      'In Stock': 'bg-green-500',
      'Low Stock': 'bg-yellow-500',
    };
    const statusIcons: Record<string, React.ReactNode> = {
      'In Stock': <span className="inline-block w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">✔️</span>,
      'Low Stock': <span className="inline-block w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-2">⚠️</span>,
    };
    const statusLabels = Object.keys(statusCounts);
    const maxStatusCount = Math.max(...Object.values(statusCounts), 1);
    // Mock percentage change for demo
    const percentChange = 8.2;
    // Recent orders (sorted by orderDate desc)
    const recentOrders = [...filteredAndSortedProducts]
      .sort((a, b) => b.orderDate.localeCompare(a.orderDate))
      .slice(0, 3);

    // Unique status and region values for filter options
    const uniqueStatuses = Array.from(new Set(mockProducts.map(p => p.status)));
    const uniqueRegions = Array.from(new Set(mockProducts.map(p => p.region)));

    // --- Open Filter Modal (sync modal state with current filters) ---
    const openFilterModal = () => {
      setModalStatus(filterStatus);
      setModalRegion(filterRegion);
      setModalDateRange(filterDateRange);
      setModalCategory(filterCategory);
      setIsFilterModalOpen(true);
    };

    return (
        <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 relative">
                <h1 className="text-2xl font-bold">Orders Management</h1>
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

            {/* Search and Filters in one row */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <div className="flex-1 flex items-center gap-2">
                    {/* Search input with icon and separator */}
                    <div className="flex items-center h-10 bg-white border border-gray-300 rounded-lg px-2 shadow-sm">
                        <FiSearch className="text-gray-400 mr-2 h-full" />
                        <span className="text-gray-300 font-bold mr-2">|</span>
                        <input
                            type="text"
                            className="outline-none bg-transparent w-40 md:w-56 text-sm h-full"
                            placeholder="Search orders..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button
                        className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="button"
                        onClick={openFilterModal}
                    >
                        Filter
                    </button>
                </div>
            </div>

            {/* Filter Indication Bar (moved below search/filter row) */}
            {(filterStatus || filterRegion || filterCategory) && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {filterStatus && (
                  <span className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    Status: {filterStatus}
                    <button
                      className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                      onClick={() => setFilterStatus('')}
                      aria-label="Remove status filter"
                    >
                      &times;
                    </button>
                  </span>
                )}
                {filterRegion && (
                  <span className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    Region: {filterRegion}
                    <button
                      className="ml-2 text-green-500 hover:text-green-700 focus:outline-none"
                      onClick={() => setFilterRegion('')}
                      aria-label="Remove region filter"
                    >
                      &times;
                    </button>
                  </span>
                )}
                {filterCategory && (
                  <span className="flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                    Category: {filterCategory}
                    <button
                      className="ml-2 text-purple-500 hover:text-purple-700 focus:outline-none"
                      onClick={() => setFilterCategory('')}
                      aria-label="Remove category filter"
                    >
                      &times;
                    </button>
                  </span>
                )}
                {filterDateRange.start && (
                  <span className="flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    Start: {filterDateRange.start}
                    <button
                      className="ml-2 text-yellow-500 hover:text-yellow-700 focus:outline-none"
                      onClick={() => setFilterDateRange(prev => ({ ...prev, start: '' }))}
                      aria-label="Remove start date filter"
                    >
                      &times;
                    </button>
                  </span>
                )}
                {filterDateRange.end && (
                  <span className="flex items-center bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    End: {filterDateRange.end}
                    <button
                      className="ml-2 text-yellow-500 hover:text-yellow-700 focus:outline-none"
                      onClick={() => setFilterDateRange(prev => ({ ...prev, end: '' }))}
                      aria-label="Remove end date filter"
                    >
                      &times;
                    </button>
                  </span>
                )}
                <button
                  className="ml-2 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300"
                  onClick={() => {
                    setFilterStatus('');
                    setFilterRegion('');
                    setFilterCategory('');
                    setFilterDateRange({ start: '', end: '' });
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
                        {/* Remove the top-right close button */}
                        <h2 className="text-lg font-semibold mb-4">Filter Orders</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                <div className="flex flex-wrap gap-2">
                                  {uniqueStatuses.map(status => (
                                    <button
                                      key={status}
                                      className={`px-3 py-1 rounded-full border text-sm font-medium transition ${modalStatus === status ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50'}`}
                                      onClick={() => setModalStatus(status)}
                                      type="button"
                                    >{status}</button>
                                  ))}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                                <div className="flex flex-wrap gap-2">
                                  {uniqueRegions.map(region => (
                                    <button
                                      key={region}
                                      className={`px-3 py-1 rounded-full border text-sm font-medium transition ${modalRegion === region ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50'}`}
                                      onClick={() => setModalRegion(region)}
                                      type="button"
                                    >{region}</button>
                                  ))}
                                </div>
                            </div>
                            {/* Category Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <div className="flex flex-wrap gap-2">
                                  {Array.from(new Set(mockProducts.map(p => p.category))).map(category => (
                                    <button
                                      key={category}
                                      className={`px-3 py-1 rounded-full border text-sm font-medium transition ${modalCategory === category ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50'}`}
                                      onClick={() => setModalCategory(category)}
                                      type="button"
                                    >{category}</button>
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
                                    setFilterStatus(modalStatus);
                                    setFilterRegion(modalRegion);
                                    setFilterDateRange(filterDateRange); // Keep existing date range filter
                                    setFilterCategory(modalCategory);
                                    setIsFilterModalOpen(false);
                                }}
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Products Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow overflow-hidden border border-blue-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50/80">
                            <tr>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('code')}
                                >
                                    <div className="flex items-center gap-1">
                                        Product Code
                                        <SortIcon field="code" />
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('name')}
                                >
                                    <div className="flex items-center gap-1">
                                        Product Name
                                        <SortIcon field="name" />
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('brand')}
                                >
                                    <div className="flex items-center gap-1">
                                        Brand
                                        <SortIcon field="brand" />
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('price')}
                                >
                                    <div className="flex items-center gap-1">
                                        Price
                                        <SortIcon field="price" />
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('stock')}
                                >
                                    <div className="flex items-center gap-1">
                                        Stock
                                        <SortIcon field="stock" />
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('region')}
                                >
                                    <div className="flex items-center gap-1">
                                        Region
                                        <SortIcon field="region" />
                                    </div>
                                </th>
                                <th 
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                                    onClick={() => handleSort('status')}
                                >
                                    <div className="flex items-center gap-1">
                                        Status
                                        <SortIcon field="status" />
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {paginatedProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50/80">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-blue-600">{product.code}</div>
                                        <div className="text-xs text-gray-500">{product.location}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                        <div className="text-sm text-gray-500">{product.category}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{product.brand}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-900">{product.stock}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {product.region}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            product.status === 'In Stock' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {product.status}
                                        </span>
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

            {/* Order Stats Cards Below Table */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              {/* Total Orders Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border hover:shadow-xl transition">
                <div className="flex items-center mb-2">
                  <span className="inline-block w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2 text-2xl">📦</span>
                  <span className="text-3xl font-bold text-blue-600">{totalOrders}</span>
                </div>
                <div className="text-sm text-gray-500">Total Orders</div>
                <div className="mt-2 flex items-center text-xs">
                  <span className="text-green-600 font-semibold mr-1">▲ {percentChange}%</span>
                  <span className="text-gray-400">vs last week</span>
                </div>
              </div>
              {/* Orders by Status Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition">
                <div className="font-semibold text-gray-700 mb-2 flex items-center"><span className="mr-2">📊</span>Orders by Status</div>
                <ul className="space-y-2">
                  {statusLabels.map((status) => {
                    const percent = ((statusCounts[status] / totalOrders) * 100).toFixed(1);
                    return (
                      <li key={status} className="flex items-center justify-between">
                        <div className="flex items-center">
                          {statusIcons[status] || <span className="inline-block w-6 h-6 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mr-2">•</span>}
                          <span className="text-sm font-medium">{status}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{statusCounts[status]}</span>
                          <span className="text-xs text-gray-400">{percent}%</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              {/* Status Distribution Bar Chart Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition">
                <div className="font-semibold text-gray-700 mb-2 flex items-center"><span className="mr-2">📈</span>Status Distribution</div>
                <div className="space-y-3">
                  {statusLabels.map((status) => {
                    const percent = ((statusCounts[status] / totalOrders) * 100).toFixed(1);
                    return (
                      <div key={status} className="flex items-center gap-2">
                        <span className={`inline-block w-3 h-3 rounded-full ${statusColors[status] || 'bg-gray-300'}`}></span>
                        <span className="text-xs w-20">{status}</span>
                        <div className="flex-1 bg-gray-100 rounded h-3">
                          <div
                            className={`${statusColors[status] || 'bg-gray-300'} h-3 rounded`}
                            style={{ width: `${(statusCounts[status] / maxStatusCount) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-semibold text-gray-700 ml-2">{percent}%</span>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-3 flex gap-3 text-xs text-gray-400">
                  {statusLabels.map((status) => (
                    <span key={status} className="flex items-center gap-1">
                      <span className={`inline-block w-3 h-3 rounded-full ${statusColors[status] || 'bg-gray-300'}`}></span>
                      {status}
                    </span>
                  ))}
                </div>
              </div>
              {/* Recent Orders Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition">
                <div className="font-semibold text-gray-700 mb-2 flex items-center"><span className="mr-2">🕒</span>Recent Orders</div>
                <ul className="divide-y divide-gray-100">
                  {recentOrders.length === 0 && <li className="py-2 text-gray-400 text-sm">No recent orders</li>}
                  {recentOrders.map((order) => (
                    <li key={order.id} className="py-2 flex items-center justify-between">
                      <div>
                        <div className="font-medium text-blue-700 text-sm">{order.code}</div>
                        <div className="text-xs text-gray-400">{order.orderDate}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
        </div>
    );
};

export default Orders; 