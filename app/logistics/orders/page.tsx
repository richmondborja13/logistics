import React from 'react';
import Navbar from '@/components/logisticnav/Navbar';
import Orders from '@/components/logisticnav/Orders';

const OrdersPage = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-1 p-6">
                <Orders />
            </main>
        </div>
    );
};

export default OrdersPage; 