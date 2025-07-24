import React from 'react';
import Navbar from '@/components/logisticnav/Navbar';
import Profile from '@/components/logisticnav/Profile';

const ProfilePage = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Navbar />
            <main className="flex-1 p-6">
                <Profile />
            </main>
        </div>
    );
};

export default ProfilePage;
