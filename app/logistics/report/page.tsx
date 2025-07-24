'use client';

import React from 'react';
import Navbar from '@/components/logisticnav/Navbar';
import Reports from '@/components/logisticnav/Reports';

const ReportPage = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-1">
                <Reports />
            </main>
        </div>
    );
};

export default ReportPage; 