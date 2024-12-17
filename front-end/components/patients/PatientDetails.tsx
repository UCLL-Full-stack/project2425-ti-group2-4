import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Patient } from 'types';

type Props = {
    patient: Patient;
}

const PatientDetails: React.FC<Props> = ({patient}: Props) => {

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
            <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">{patient.name}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-700">Patient Information</h2>
                    <div className="text-gray-600">
                        <p><strong>Age:</strong> {patient.age}</p>
                        <p><strong>Sex:</strong> {patient.sex}</p>
                        <p><strong>Date of Birth:</strong> {new Date(patient.dateOfBirth).toLocaleDateString()}</p>
                        <p><strong>National Register:</strong> {patient.nationalRegister}</p>
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold text-gray-700">Contact Information</h2>
                    <div className="text-gray-600">
                        <p><strong>Address:</strong> {patient.address}</p>
                        <p><strong>Email:</strong> {patient.email}</p>
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-700">Complaints</h2>
                <ul className="list-disc pl-5 text-gray-600">
                    {patient.complaints.length > 0 ? (
                        patient.complaints.map((complaint, index) => (
                            <li key={index}>{complaint}</li>
                        ))
                    ) : (
                        <p>No complaints listed.</p>
                    )}
                </ul>
            </div>
            <div className="mt-6 text-center">
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default PatientDetails;