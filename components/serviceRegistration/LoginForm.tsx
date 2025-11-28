/*
============================================================
LoginForm Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the login form for service registration providers.
- Uses react-hook-form and zod for form handling and validation.
- To update form fields or validation, edit the loginSchema and form JSX.
- To change layout or content, edit the JSX in the LoginForm component.

Back-end Follow Through:
- To connect the form to a real back-end, replace the onSubmit handler with an API call or authentication integration.
- For dynamic service types, replace the SERVICE_TYPES array with API data.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The LoginForm can be reused or extended for other authentication flows.
- For additional integration, see README or API documentation.
*/
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import React from 'react';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
    companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
    serviceType: z.string().min(1, { message: "Please select a service type." }),
    contactPerson: z.string().min(2, { message: "Contact person is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(1, { message: "Password is required." }),
});

type LoginFormData = z.infer<typeof loginSchema>;

const SERVICE_TYPES = [
    { value: 'transportation', label: 'Transportation' },
    { value: 'warehousing', label: 'Warehousing' },
    { value: 'inventoryManagement', label: 'Inventory Management' },
    { value: 'orderFulfillment', label: 'Order Fulfillment' },
    { value: 'reverseLogistics', label: 'Reverse Logistics' },
];

const LoginForm: React.FC = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            companyName: '',
            serviceType: '',
            contactPerson: '',
            email: '',
            password: ''
        }
    });

    const onSubmit = (data: LoginFormData) => {
        console.log('Login:', data);
    };

    const handleRegisterClick = () => {
        router.push('/registration');
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Service Information - 2 Columns, Service Type on 2nd Row */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Service Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* First Row: Company Name & Contact Person */}
                        <div>
                            <label className="block mb-1 text-sm text-gray-600">Company Name</label>
                            <input 
                                type="text"
                                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="Enter company name"
                                {...register('companyName')} 
                            />
                            {errors.companyName && <span className="text-red-500 text-sm">{errors.companyName.message}</span>}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm text-gray-600">Contact Person</label>
                            <input 
                                type="text"
                                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="Enter contact person"
                                {...register('contactPerson')} 
                            />
                            {errors.contactPerson && <span className="text-red-500 text-sm">{errors.contactPerson.message}</span>}
                        </div>
                        {/* Second Row: Service Type Dropdown spanning 2 columns */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block mb-1 text-sm text-gray-600">Service Type</label>
                            <div className="relative">
                                <select 
                                    className="w-full px-3 py-2 border rounded appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10 bg-white text-gray-700"
                                    {...register('serviceType')}
                                >
                                    <option value="">Select service type</option>
                                    {SERVICE_TYPES.map((service) => (
                                        <option key={service.value} value={service.value}>
                                            {service.label}
                                        </option>
                                    ))}
                                </select>
                                {/* Chevron Icon */}
                                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </div>
                            {errors.serviceType && <span className="text-red-500 text-sm">{errors.serviceType.message}</span>}
                        </div>
                    </div>
                </div>

                {/* Login Credentials */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">Login Credentials</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm text-gray-600">Email</label>
                            <input 
                                type="email" 
                                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="Enter your email address"
                                {...register('email')} 
                            />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                        
                        <div>
                            <label className="block mb-1 text-sm text-gray-600">Password</label>
                            <input 
                                type="password" 
                                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                placeholder="Enter your password"
                                {...register('password')} 
                            />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>
                    </div>
                </div>

                {/* Submit Button and Registration Link */}
                <div className="space-y-4">
                    <button 
                        type="submit" 
                        className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                    >
                        Login
                    </button>
                    <div className="text-sm text-center">
                        Don&apos;t have an account?{' '}
                        <button 
                            type="button" 
                            onClick={handleRegisterClick}
                            className="text-blue-500 hover:text-blue-600 underline focus:outline-none"
                        >
                            Register
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default LoginForm; 