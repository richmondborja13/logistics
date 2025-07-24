'use client';

import React from 'react';
import Navbar from '@/components/logisticnav/Navbar';
import Dashboard from '@/components/logisticnav/Dashboard';

    const DashboardPage = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-1 p-6">
                <Dashboard />
            </main>
        </div>
    );
};

export default DashboardPage; 