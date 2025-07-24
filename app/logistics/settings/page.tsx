'use client';

import React from 'react';
import Navbar from '@/components/logisticnav/Navbar';

const SettingsPage = () => {
    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
            <Navbar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Settings</h1>
                <div className="space-y-4">
                    {/* Settings content will go here */}
                </div>
            </main>
        </div>
    );
};

export default SettingsPage; 