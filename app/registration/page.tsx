'use client';

import { useState } from 'react';
import TransportationRegistration from '@/components/serviceRegistration/TransportationRegistration';
import WarehousingRegistration from '@/components/serviceRegistration/WarehousingRegistration';
import InventoryManagementRegistration from '@/components/serviceRegistration/InventoryManagementRegistration';
import OrderFulfillmentRegistration from '@/components/serviceRegistration/OrderFulfillmentRegistration';
import ReverseLogisticsRegistration from '@/components/serviceRegistration/ReverseLogisticsRegistration';
import ServiceRegistrationHeader from '@/components/serviceRegistration/Header';

const SERVICE_TYPES = [
  { key: 'transportation', label: 'Transportation', component: TransportationRegistration },
  { key: 'warehousing', label: 'Warehousing', component: WarehousingRegistration },
  { key: 'inventoryManagement', label: 'Inventory Management', component: InventoryManagementRegistration },
  { key: 'orderFulfillment', label: 'Order Fulfillment', component: OrderFulfillmentRegistration },
  { key: 'reverseLogistics', label: 'Reverse Logistics', component: ReverseLogisticsRegistration },
];

export default function RegistrationPage() {
  const [selectedService, setSelectedService] = useState('transportation');

  const SelectedComponent = SERVICE_TYPES.find(service => service.key === selectedService)?.component || TransportationRegistration;

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <ServiceRegistrationHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-6">Service Provider Registration</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {SERVICE_TYPES.map((service) => (
              <button
                key={service.key}
                onClick={() => setSelectedService(service.key)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  selectedService === service.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {service.label}
              </button>
            ))}
          </div>
        </div>
        {/* Registration Form Container */}
        <div className="w-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="w-full">
            <SelectedComponent />
          </div>
        </div>
      </div>
    </div>
  );
} 