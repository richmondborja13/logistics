/*
============================================================
Profile Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the user profile page for the logistics registration system.
- Uses Tailwind CSS for layout and styling.
- Displays user information, company/business info, operational details, billing/payment, team/contact persons, compliance documents, and online presence.
- Mock user data is defined at the top of the file; update this for demo or testing.
- To change profile fields or sections, edit the JSX and logic in the Profile component.
- Supports editing and adding email addresses, and managing authorized users.

Back-end Follow Through:
- To connect to real user data, replace the mockUser object with data from authentication/user API.
- For profile updates, connect form actions to back-end endpoints for saving changes.
- If using a global state manager (Redux, Zustand, etc.), move user state logic out of this component and into the store.
- Ensure any new data fields from the back-end are mapped to the UI components here.
- For compliance documents, connect upload/view/replace actions to back-end storage endpoints.

Integration Notes:
- The profile logic and layout can be reused or extended for other user/account pages.
- For additional integration, see README or API documentation.
*/
'use client';

import React, { useState } from 'react';

const mockUser = {
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  name: 'John Doe',
  email: 'johndoe@email.com',
  nickname: 'Johnny',
  gender: 'Male',
  country: 'USA',
  language: 'English',
  timezone: 'GMT-5',
  emailAdded: '2 months ago',
};

const Profile = () => {
  const [email, setEmail] = useState(mockUser.email);
  const [editingEmail, setEditingEmail] = useState(false);
  const [addingEmail, setAddingEmail] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8 mt-6">
      {/* UI/UX Enhancements: Profile Completeness & Public Preview */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="w-full md:w-1/2">
          <div className="text-xs text-gray-500 mb-1">Profile Completeness</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '80%' }}></div>
          </div>
          <div className="text-xs text-gray-400">80% complete</div>
        </div>
        <a href="#" className="text-blue-600 text-sm font-medium hover:underline mt-2 md:mt-0" title="Preview your public profile">Public Profile Preview</a>
      </div>
      {/* 1. Profile Photo/Name/Email/Company Info */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
        <div className="flex items-center gap-6">
          <img src={mockUser.avatar} alt={mockUser.name} className="w-24 h-24 rounded-full object-cover" />
          <div>
            <div className="text-2xl font-bold">{mockUser.name}</div>
            <div className="text-gray-500">{mockUser.email}</div>
          </div>
        </div>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">Edit</button>
      </div>
      {/* Basic Details Section - Improved UI, no Nick Name */}
      <div className="mt-8">
        <div className="font-bold text-lg mb-4">Basic Details</div>
        <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="font-medium text-gray-700 mb-1">Full Name</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">{mockUser.name}</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Country</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">{mockUser.country}</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Gender</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">{mockUser.gender}</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Time Zone</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">{mockUser.timezone}</div>
          </div>
          <div className="md:col-span-2">
            <div className="font-medium text-gray-700 mb-1">Language</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">{mockUser.language}</div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="font-bold text-lg mb-4">My email Address</div>
        <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 mb-2">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">✓</div>
          <div className="flex-1">
            {editingEmail ? (
              <input
                type="email"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                value={email}
                onChange={e => setEmail(e.target.value)}
                onBlur={() => setEditingEmail(false)}
                autoFocus
              />
            ) : (
              <div className="text-gray-900 font-medium">{email}</div>
            )}
            <div className="text-xs text-gray-400">{mockUser.emailAdded}</div>
          </div>
          <button
            className="text-blue-600 text-sm font-medium hover:underline"
            onClick={() => setEditingEmail(true)}
          >
            Edit
          </button>
        </div>
        {/* Add Email Address Row */}
        {addingEmail && (
          <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 mb-2">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">+</div>
            <div className="flex-1">
              <input
                type="email"
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="Enter new email address"
                autoFocus
              />
            </div>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 mr-2"
              onClick={() => {
                // Here you would handle saving the new email
                setAddingEmail(false);
                setNewEmail('');
              }}
            >
              Save
            </button>
            <button
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
              onClick={() => {
                setAddingEmail(false);
                setNewEmail('');
              }}
            >
              Cancel
            </button>
          </div>
        )}
        <button className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100" onClick={() => setAddingEmail(true)}>
          +Add Email Address
        </button>
      </div>
      {/* Company/Business Info Section */}
      <div className="mt-12">
        <div className="font-bold text-lg mb-4 flex items-center gap-2">
          Company / Business Info
          <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-semibold">Verified</span>
        </div>
        <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="font-medium text-gray-700 mb-1">Company Name</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">Acme Logistics Inc.</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Business Registration Number</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">BRN-2023-001234</div>
          </div>
          <div className="md:col-span-2">
            <div className="font-medium text-gray-700 mb-1">Business Address</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">1234 Industrial Ave, Logistics City, USA</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Service Type</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">Freight, Courier, Warehousing</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Fleet Size</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">25 Vehicles</div>
          </div>
        </div>
      </div>
      {/* 2. Operational Details */}
      <div className="mt-12">
        <div className="font-bold text-lg mb-4">Operational Details</div>
        <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="font-medium text-gray-700 mb-1">Operating Regions / Routes</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">Metro Manila, CALABARZON, Central Luzon</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Average Delivery Volume</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">200 shipments/month</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Available Vehicles</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">Truck, Van, Bike</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Warehouse Access</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">Yes</div>
          </div>
        </div>
      </div>
      {/* 3. Billing & Payment */}
      <div className="mt-12">
        <div className="font-bold text-lg mb-4">Billing & Payment</div>
        <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="font-medium text-gray-700 mb-1">Preferred Payment Method</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">Bank Transfer</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Bank Account / GCash <span className='text-xs text-gray-400'>(hidden)</span></div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-400 border border-gray-200">••••••••••••••••</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Billing Address</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">1234 Industrial Ave, Logistics City, USA</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Payment Terms</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">Net 30</div>
          </div>
        </div>
      </div>
      {/* 4. Team / Contact Persons */}
      <div className="mt-12">
        <div className="font-bold text-lg mb-4">Team / Contact Persons</div>
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <div className="font-medium text-gray-700 mb-1">Point of Contact Name</div>
              <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">Jane Smith</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Phone Number</div>
              <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">+1 555 123 4567</div>
            </div>
            <div>
              <div className="font-medium text-gray-700 mb-1">Emergency Contact</div>
              <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">+1 555 987 6543</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="font-medium text-gray-700 mb-2">Authorized Users</div>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">Jane Smith <button className="ml-2 text-red-500 hover:text-red-700">&times;</button></span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">John Doe <button className="ml-2 text-red-500 hover:text-red-700">&times;</button></span>
              <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-300">+ Add User</button>
            </div>
          </div>
        </div>
      </div>
      {/* 5. Documents Upload / Compliance */}
      <div className="mt-12">
        <div className="font-bold text-lg mb-4">Documents Upload / Compliance</div>
        <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="font-medium text-gray-700 mb-1">Business Permit</div>
            <div className="flex items-center gap-2">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Uploaded</span>
              <button className="text-blue-600 text-xs font-medium hover:underline">View</button>
              <button className="text-blue-600 text-xs font-medium hover:underline">Replace</button>
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Insurance Certificate</div>
            <div className="flex items-center gap-2">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">Uploaded</span>
              <button className="text-blue-600 text-xs font-medium hover:underline">View</button>
              <button className="text-blue-600 text-xs font-medium hover:underline">Replace</button>
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Vehicle Registration</div>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">Pending</span>
              <button className="text-blue-600 text-xs font-medium hover:underline">Upload</button>
            </div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Driver's License</div>
            <div className="flex items-center gap-2">
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-medium">Pending</span>
              <button className="text-blue-600 text-xs font-medium hover:underline">Upload</button>
            </div>
          </div>
        </div>
      </div>
      {/* 6. Online Presence */}
      <div className="mt-12 mb-8">
        <div className="font-bold text-lg mb-4">Online Presence</div>
        <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="font-medium text-gray-700 mb-1">Website / LinkedIn</div>
            <div className="bg-white rounded-lg px-4 py-3 text-blue-700 border border-gray-200 underline cursor-pointer">https://acmelogistics.com</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">Facebook Page</div>
            <div className="bg-white rounded-lg px-4 py-3 text-blue-700 border border-gray-200 underline cursor-pointer">facebook.com/acmelogistics</div>
          </div>
          <div>
            <div className="font-medium text-gray-700 mb-1">WhatsApp / Viber</div>
            <div className="bg-white rounded-lg px-4 py-3 text-gray-900 border border-gray-200">+63 912 345 6789</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 