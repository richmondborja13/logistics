'use client';

import LoginForm from '@/components/serviceRegistration/LoginForm';
import ServiceRegistrationHeader from '@/components/serviceRegistration/Header';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <ServiceRegistrationHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-5">
          <h1 className="text-3xl font-bold text-center mb-2">Provider Login</h1>
          <p className="text-center text-gray-600 mb-5">
            Sign in to your logistics provider account to access your dashboard
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
} 