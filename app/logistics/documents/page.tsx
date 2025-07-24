import React from 'react';
import Navbar from '@/components/logisticnav/Navbar';
import Documents from '@/components/logisticnav/Documents';
import Head from 'next/head';

const DocumentsPage = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-1 p-6">
                <Documents />
            </main>
        </div>
    );
};

export default DocumentsPage; 