/*
============================================================
InventoryManagementRegistration Component (Front-end Guide & Back-end Follow Through)
============================================================

Front-end Guide:
- This file implements the registration form for inventory management providers.
- Uses react-hook-form and zod for form handling and validation.
- To update form fields or validation, edit the inventoryManagementSchema and form JSX.
- To change layout or content, edit the JSX in the InventoryManagementRegistration component.

Back-end Follow Through:
- To connect the form to a real back-end, replace the onSubmit handler with an API call or registration integration.
- For dynamic options, replace static fields with API data.
- Ensure any new data fields from the back-end are mapped to the UI components here.

Integration Notes:
- The registration logic can be reused or extended for other provider types.
- For additional integration, see README or API documentation.
*/
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import React from 'react';
import { useRouter } from 'next/navigation';
import Modal from './Modal';

const inventoryManagementSchema = z.object({
    companyName: z.string().min(2, { message: "Company name must be at least 2 characters." }),
    technologyUsed: z.string().min(2, { message: "Technology used is required." }),
    integrationOptions: z.string().optional(),
    yearsOfExperience: z.number().min(0).max(100),
    contactPerson: z.string().min(2, { message: "Contact person is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),
    certifications: z.string().optional(),
    consent: z.boolean().refine((val) => val === true, { message: "You must agree to the terms and privacy policy." }),
});

type InventoryManagementFormData = z.infer<typeof inventoryManagementSchema>;

const InventoryManagementRegistration: React.FC = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<InventoryManagementFormData>({
        resolver: zodResolver(inventoryManagementSchema),
        defaultValues: {}
    });
    const [modal, setModal] = React.useState<null | 'consent' | 'privacy'>(null);

    const onSubmit = (data: InventoryManagementFormData) => {
        console.log('Inventory Management Register:', data);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <h2 className="mb-2 text-2xl font-bold text-center">Register as Inventory Management Provider</h2>
            <p className="mb-6 text-center text-gray-500 text-sm">
                Provide details about your technology, integration options, and experience.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Company & Business Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Company & Business Information</h3>
                        
                        <div>
                            <label className="block mb-1 text-sm text-gray-600">Company Name</label>
                            <input className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your company name" {...register('companyName')} />
                            {errors.companyName && <span className="text-red-500 text-sm">{errors.companyName.message}</span>}
                        </div>
                        
                        <div>
                            <label className="block mb-1 text-sm text-gray-600">Technology Used</label>
                            <input className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., WMS, ERP, RFID systems" {...register('technologyUsed')} />
                            {errors.technologyUsed && <span className="text-red-500 text-sm">{errors.technologyUsed.message}</span>}
                        </div>
                        
                        <div>
                            <label className="block mb-1 text-sm text-gray-600">Integration Options (Optional)</label>
                            <input className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., API, EDI, Webhooks" {...register('integrationOptions')} />
                        </div>
                        
                        <div>
                            <label className="block mb-1 text-sm text-gray-600">Years of Experience</label>
                            <input type="number" className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., 5 years" {...register('yearsOfExperience', { valueAsNumber: true })} />
                            {errors.yearsOfExperience && <span className="text-red-500 text-sm">{errors.yearsOfExperience.message}</span>}
                        </div>
                    </div>

                    {/* Contact & Account Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Contact & Account Information</h3>
                        
                        <div>
                            <label className="block mb-1 text-sm text-gray-600">Contact Person</label>
                            <input className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter contact person name" {...register('contactPerson')} />
                            {errors.contactPerson && <span className="text-red-500 text-sm">{errors.contactPerson.message}</span>}
                        </div>
                        
                        <div>
                            <label className="block mb-1 text-sm text-gray-600">Phone Number</label>
                            <input className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., (555) 123-4567" {...register('phoneNumber')} />
                            {errors.phoneNumber && <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>}
                        </div>
                        
                        <div>
                            <label className="block mb-1 text-sm text-gray-600">Certifications (Optional)</label>
                            <input className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="e.g., APICS, Six Sigma, Lean" {...register('certifications')} />
                        </div>
                        
                        <div>
                            <label className="block mb-1 text-sm text-gray-600">Email</label>
                            <input type="email" className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Enter your email address" {...register('email')} />
                            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                        </div>
                        
                        <div>
                            <label className="block mb-1 text-sm text-gray-600">Password</label>
                            <input type="password" className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Create a strong password" {...register('password')} />
                            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                        </div>
                    </div>
                </div>

                {/* Consent Checkbox */}
                <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                        <input
                            type="checkbox"
                            id="consent"
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            {...register('consent')}
                        />
                        <span className="text-sm text-gray-700 leading-relaxed select-text">
                            By checking this box, I confirm that I have read, understood, and voluntarily agree to the
                            terms stated in this{' '}
                            <button type="button" className="text-blue-600 hover:text-blue-800 underline focus:outline-none" onClick={() => setModal('consent')}>Consent Form</button>
                            {' '} & {' '}
                            <button type="button" className="text-blue-600 hover:text-blue-800 underline focus:outline-none" onClick={() => setModal('privacy')}>Privacy Policy</button>
                        </span>
                    </div>
                    {errors.consent && <span className="text-red-500 text-sm block">{errors.consent.message}</span>}
                </div>

                {/* Submit Button and Login Link */}
                <div className="space-y-4">
                    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                        Register
                    </button>
                    <div className="text-sm text-center">
                        Already a provider?{' '}
                        <button type="button" onClick={() => router.push('/login')} className="text-blue-500 hover:text-blue-600 underline focus:outline-none">Login</button>
                    </div>
                </div>
            </form>
            <Modal isOpen={modal === 'consent'} onClose={() => setModal(null)} title="Consent Form">
                <div>
                    <p className="mb-3 font-semibold text-gray-900">By proceeding with registration, I confirm that:</p>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>
                            I am voluntarily submitting my personal and sensitive information, which may include:
                            <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                <li>Full name, address, contact details</li>
                                <li>Date of birth, age, height, and weight</li>
                                <li>Government-issued IDs (driver's license, SSS, PhilHealth, etc.)</li>
                                <li>Employment history, training records, and certifications</li>
                                <li>Medical results including drug and alcohol screening</li>
                                <li>Any other information relevant to my employment profile</li>
                            </ul>
                        </li>
                        <li>
                            I understand that these data will be used by THUMBWORX for manpower profiling, employment processing, deployment, and coordination with clients and project partners.
                        </li>
                        <li>
                            I give my full consent for THUMBWORX to share my relevant information with its authorized clients, contractors, and affiliated companies for legitimate business purposes related to job matching and project assignments.
                        </li>
                        <li>
                            I am aware that my data will be stored securely and handled with strict confidentiality, in accordance with the Data Privacy Act of 2012.
                        </li>
                        <li>
                            I understand that I have the right to:
                            <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                <li>Access or review my personal data</li>
                                <li>Request corrections for any inaccurate or outdated information</li>
                                <li>Withdraw my consent at any time by submitting a written request to the company</li>
                            </ul>
                        </li>
                    </ol>
                </div>
            </Modal>
            <Modal isOpen={modal === 'privacy'} onClose={() => setModal(null)} title="Privacy Policy">
                <div>
                    <h3 className="text-lg font-bold mb-1">PRIVACY POLICY</h3>
                    <div className="mb-2 font-semibold">THUMBWORX SOLUTIONS</div>
                    <div className="mb-4 text-xs text-gray-500">Effective: May 1, 2025</div>
                    <p className="mb-3">At THUMBWORX, we are committed to protecting the privacy of our personnel and job applicants. This Privacy Policy explains how we collect, use, store, and protect your personal information in compliance with the Data Privacy Act of 2012.</p>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>
                            <span className="font-semibold">Data We Collect</span>
                            <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                <li>Full name, address, contact numbers, email</li>
                                <li>Date of birth, age, gender, height, and weight</li>
                                <li>Government-issued IDs (driver’s license, SSS, PhilHealth, TIN, etc.)</li>
                                <li>Work experience, resume, trainings, and certifications</li>
                                <li>Medical records, especially drug and alcohol test results</li>
                                <li>Emergency contact and related employment documents</li>
                            </ul>
                        </li>
                        <li>
                            <span className="font-semibold">Purpose of Collection</span>
                            <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                <li>Manpower profiling and job matching</li>
                                <li>Employment processing and deployment</li>
                                <li>Client compliance and verification</li>
                                <li>Safety, security, and health screening</li>
                                <li>Coordination with contractors and clients for project requirements</li>
                            </ul>
                        </li>
                        <li>
                            <span className="font-semibold">Data Sharing</span>
                            <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                <li>Authorized clients and contractors</li>
                                <li>Project partners or affiliates involved in manpower engagements</li>
                                <li>Government agencies, if legally required</li>
                            </ul>
                            <span className="block mt-1">We only share necessary and job-related information, and always on a need-to-know basis.</span>
                        </li>
                        <li>
                            <span className="font-semibold">Data Storage & Protection</span>
                            <span className="block mt-1">All information is stored securely through encrypted systems and/or locked physical files. Access is restricted to authorized personnel only. We implement technical and organizational safeguards to prevent unauthorized access, alteration, or misuse of data.</span>
                        </li>
                        <li>
                            <span className="font-semibold">Retention Period</span>
                            <span className="block mt-1">Your data will be retained only for as long as necessary for employment or legal purposes. After that, it will be securely archived or deleted. You may request for deletion of your data after your engagement ends, subject to certain legal conditions.</span>
                        </li>
                        <li>
                            <span className="font-semibold">Your Rights</span>
                            <ul className="list-disc list-inside ml-5 mt-1 space-y-1">
                                <li>Access your personal data</li>
                                <li>Correct or update inaccurate information</li>
                                <li>Withdraw your consent at any time</li>
                                <li>Request deletion of your records (subject to legal review)</li>
                            </ul>
                        </li>
                        <li>
                            <span className="font-semibold">How to Contact Us</span>
                            <div className="ml-5 mt-1 space-y-1">
                                <div>THUMBWORX Data Privacy Office</div>
                                <div>Email: <a href="mailto:admin@innovatasolutions.com" className="underline text-blue-700">admin@innovatasolutions.com</a></div>
                                <div>Mobile: +63 961 833 0336</div>
                                <div>Address: Innovata Office, Bagong Bayan, City of Malolos, Bulacan, Philippines 3000</div>
                            </div>
                        </li>
                    </ol>
                </div>
            </Modal>
        </div>
    );
};

export default InventoryManagementRegistration; 