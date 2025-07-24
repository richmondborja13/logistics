'use client';

import React from 'react';
import Navbar from '@/components/logisticnav/Navbar';
import LogisticProvider from '@/components/logisticnav/LogisticProvider';

const TrackingPage = () => {
    return (
        <div className="flex min-h-screen">
            <Navbar />
            <main className="flex-1">
                <LogisticProvider />
            </main>
        </div>
    );
};

export default TrackingPage; 