/*
============================================================
Documents Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the Documents management UI for the logistics registration system.
- Uses Tailwind CSS for layout and styling.
- Mock data for documents is defined at the top of the file (see mockDocuments array).
- Features include: search (with icon), filter modal (type, status), filter indicator chips, sorting, pagination, and notification dropdown.
- The filter modal allows users to select filters, which are only applied when 'Apply' is pressed.
- Filter indicators (chips) are shown below the filter row for active filters.
- Cards below the table show total documents, documents by status, and recent uploads.
- To change table columns, filters, or cards, edit the JSX and logic in the Documents component.

Back-end Follow Through:
- To connect to real data, replace the mockDocuments array with API calls or props.
- For filtering, sorting, and pagination, connect the UI logic to back-end endpoints or a global state manager.
- If using a global state manager (Redux, Zustand, etc.), move state logic out of this component and into the store.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The filter modal, notification dropdown, and card logic can be reused in other pages for consistency.
- For additional integration, see README or API documentation.
*/
'use client';

import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

// --- Mock data for documents (Front-end: update for demo, Back-end: replace with API) ---
const mockDocuments = [
  {
    id: 1,
    name: 'Invoice_2024_001.pdf',
    type: 'Invoice',
    orderId: 'ORD-2024-001',
    uploadedBy: 'John Smith',
    dateUploaded: '2024-01-15',
    status: 'Approved',
    size: '2.3 MB'
  },
  {
    id: 2,
    name: 'BOL_TRK_789.pdf',
    type: 'Bill of Lading',
    orderId: 'ORD-2024-002',
    uploadedBy: 'Sarah Johnson',
    dateUploaded: '2024-01-14',
    status: 'Pending',
    size: '1.8 MB'
  },
  {
    id: 3,
    name: 'Manifest_2024_003.pdf',
    type: 'Manifest',
    orderId: 'ORD-2024-003',
    uploadedBy: 'Mike Chen',
    dateUploaded: '2024-01-13',
    status: 'Archived',
    size: '3.1 MB'
  },
  {
    id: 4,
    name: 'Customs_Declaration.pdf',
    type: 'Customs',
    orderId: 'ORD-2024-004',
    uploadedBy: 'Lisa Wang',
    dateUploaded: '2024-01-12',
    status: 'Approved',
    size: '4.2 MB'
  },
  {
    id: 5,
    name: 'Packing_List_005.pdf',
    type: 'Packing List',
    orderId: 'ORD-2024-005',
    uploadedBy: 'David Brown',
    dateUploaded: '2024-01-11',
    status: 'Pending',
    size: '1.5 MB'
  }
];

const documentTypes = ['All', 'Invoice', 'Bill of Lading', 'Manifest', 'Customs', 'Packing List'];
const statusOptions = ['All', 'Pending', 'Approved', 'Archived'];

// --- Mock notifications for logistics theme (copied from Orders/LogisticProvider) ---
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

const Documents = () => {
  // --- State variables (Front-end: local state, Back-end: move to global state if needed) ---
  const [documents, setDocuments] = useState(mockDocuments);
  const [sortField, setSortField] = useState('dateUploaded');
  const [sortDirection, setSortDirection] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  // Filter state
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  // Modal temp state
  const [modalType, setModalType] = useState('');
  const [modalStatus, setModalStatus] = useState('');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState<number | null>(null);
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

  // --- Filtering and sorting logic (Front-end: UI, Back-end: connect to API) ---
  const filteredDocuments = documents
    .filter(doc =>
      (filterType === '' || doc.type === filterType) &&
      (filterStatus === '' || doc.status === filterStatus) &&
      (searchTerm === '' ||
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      if (sortDirection === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

  // --- Pagination logic (Front-end: UI, Back-end: connect to paginated API) ---
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const totalRows = filteredDocuments.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage) || 1;
  const paginatedDocuments = filteredDocuments.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Open filter modal, sync modal state with current filters
  const openFilterModal = () => {
    setModalType(filterType);
    setModalStatus(filterStatus);
    setIsFilterModalOpen(true);
  };

  const handleDelete = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    setShowDropdown(null);
  };

  const handleView = (document: any) => {
    setSelectedDocument(document);
    setIsViewerOpen(true);
    setShowDropdown(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center ">
      <div className="w-full max-w-6xl">
        {/* Header row: title left, notification right */}
        <div className="flex items-center justify-between mb-2 relative">
          <h1 className="text-2xl font-bold">Documents</h1>
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
        {/* Search and Filter row below title */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 mb-4">
          <div className="flex-1 flex items-center gap-2">
            {/* Search input with icon */}
            <div className="flex items-center h-10 bg-white border border-gray-300 rounded-lg px-2 shadow-sm">
              <FiSearch className="text-gray-400 mr-2 h-full" />
              <input
                type="text"
                placeholder="Search documents..."
                className="outline-none bg-transparent w-40 md:w-56 text-sm h-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
        {(filterType || filterStatus) && (
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {filterType && (
              <span className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                Type: {filterType}
                <button
                  className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none"
                  onClick={() => setFilterType('')}
                  aria-label="Remove type filter"
                >
                  &times;
                </button>
              </span>
            )}
            {filterStatus && (
              <span className="flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Status: {filterStatus}
                <button
                  className="ml-2 text-green-500 hover:text-green-700 focus:outline-none"
                  onClick={() => setFilterStatus('')}
                  aria-label="Remove status filter"
                >
                  &times;
                </button>
              </span>
            )}
            <button
              className="ml-2 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300"
              onClick={() => {
                setFilterType('');
                setFilterStatus('');
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
              <h2 className="text-lg font-semibold mb-4">Filter Documents</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                  <div className="flex flex-wrap gap-2">
                    {documentTypes.slice(1).map(type => (
                      <button
                        key={type}
                        className={`px-3 py-1 rounded-full border text-sm font-medium transition ${modalType === type ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50'}`}
                        onClick={() => setModalType(type)}
                        type="button"
                      >{type}</button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="flex flex-wrap gap-2">
                    {statusOptions.slice(1).map(status => (
                      <button
                        key={status}
                        className={`px-3 py-1 rounded-full border text-sm font-medium transition ${modalStatus === status ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-blue-50'}`}
                        onClick={() => setModalStatus(status)}
                        type="button"
                      >{status}</button>
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
                    setFilterType(modalType);
                    setFilterStatus(modalStatus);
                    setIsFilterModalOpen(false);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Documents Table */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow overflow-hidden border border-blue-100">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                    <div className="flex items-center gap-1">Document Name</div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('type')}>
                    <div className="flex items-center gap-1">Type</div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('orderId')}>
                    <div className="flex items-center gap-1">Order ID</div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('uploadedBy')}>
                    <div className="flex items-center gap-1">Uploaded By</div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('dateUploaded')}>
                    <div className="flex items-center gap-1">Date Uploaded</div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('status')}>
                    <div className="flex items-center gap-1">Status</div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedDocuments.map((document) => (
                  <tr key={document.id} className="hover:bg-gray-50/80">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center mr-3">
                          <span className="text-blue-600 text-xs font-medium">PDF</span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{document.name}</div>
                          <div className="text-sm text-gray-500">{document.size}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{document.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{document.orderId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{document.uploadedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{document.dateUploaded}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>{document.status}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-3 items-center">
                        {/* View Icon */}
                        <button
                          className="p-2 hover:bg-gray-100 rounded-md relative group"
                          onClick={() => handleView(document)}
                          aria-label="View"
                          type="button"
                        >
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">View</span>
                        </button>
                        {/* Delete Icon */}
                        <button
                          className="p-2 hover:bg-red-100 rounded-md relative group"
                          onClick={() => handleDelete(document.id)}
                          aria-label="Delete"
                          type="button"
                        >
                          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 px-2 py-1 rounded bg-gray-800 text-white text-xs opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">Delete</span>
                        </button>
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
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
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

        {/* Upload Dialog */}
        {isUploadDialogOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Upload Document</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Select document type</option>
                    {documentTypes.slice(1).map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order ID</label>
                  <input
                    type="text"
                    placeholder="Enter order ID"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">File</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                    <svg className="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a2 2 0 011 3.72M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  onClick={() => setIsUploadDialogOpen(false)}
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PDF Viewer Dialog */}
        {isViewerOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-lg font-semibold">
                  {selectedDocument?.name}
                </h2>
                <button 
                  className="p-2 hover:bg-gray-100 rounded-md"
                  onClick={() => setIsViewerOpen(false)}
                >
                  ×
                </button>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                <div className="bg-gray-100 rounded-lg h-full flex items-center justify-center min-h-[300px]">
                  <div className="text-center w-full">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-blue-600 text-xl font-bold">PDF</span>
                    </div>
                    <p className="text-gray-600">PDF Viewer would be embedded here</p>
                    <p className="text-sm text-gray-500 mt-2">Document: {selectedDocument?.name}</p>
                  </div>
                </div>
              </div>
              {/* Modal footer with Download button */}
              <div className="flex justify-end gap-2 px-6 py-4 border-t">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Download
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cards below table with detailed infos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          {/* Total Documents Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border hover:shadow-xl transition">
            <div className="flex items-center mb-2">
              <span className="inline-block w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2 text-2xl">📄</span>
              <span className="text-3xl font-bold text-blue-600">{totalRows}</span>
            </div>
            <div className="text-sm text-gray-500">Total Documents</div>
          </div>
          {/* Documents by Status Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition">
            <div className="font-semibold text-gray-700 mb-2 flex items-center"><span className="mr-2">📊</span>Documents by Status</div>
            <ul className="space-y-2">
              {statusOptions.slice(1).map((status) => {
                const count = filteredDocuments.filter(doc => doc.status === status).length;
                const percent = totalRows ? ((count / totalRows) * 100).toFixed(1) : 0;
                return (
                  <li key={status} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="inline-block w-6 h-6 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mr-2">•</span>
                      <span className="text-sm font-medium">{status}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">{count}</span>
                      <span className="text-xs text-gray-400">{percent}%</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Recent Uploads Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border hover:shadow-xl transition">
            <div className="font-semibold text-gray-700 mb-2 flex items-center"><span className="mr-2">🕒</span>Recent Uploads</div>
            <ul className="divide-y divide-gray-100">
              {filteredDocuments.slice(0, 3).map((doc) => (
                <li key={doc.id} className="py-2 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-blue-700 text-sm">{doc.name}</div>
                    <div className="text-xs text-gray-400">{doc.dateUploaded}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${doc.status === 'Approved' ? 'bg-green-100 text-green-800' : doc.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>{doc.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents; 