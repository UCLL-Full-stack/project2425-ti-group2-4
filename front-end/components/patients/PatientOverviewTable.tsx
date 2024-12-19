import React from 'react';
import { Patient } from 'types';
import { format } from 'date-fns';

interface PatientOverviewProps {
    patient: Patient;
}

const PatientOverview: React.FC<PatientOverviewProps> = ({ patient }) => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="flex items-start gap-6">
                    <div>
                        <img
                            src={patient.photoUrl || '/placeholder.jpg'}
                            alt="Patient Photo"
                            className="w-28 h-28 rounded-lg border border-gray-300"
                        />
                    </div>
                    <div className="flex-1">
                        <h2 className="text-xl font-semibold">{patient.name}</h2>
                        <p className="text-gray-500">{patient.age} years old | {patient.sex}</p>
                        <p>{patient.address}</p>
                        <p className="text-gray-500">{patient.city}, {patient.zipCode}</p>
                    </div>
                    <div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                            Edit Info
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Medical Alerts */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4">Medical Alerts</h3>
                    <ul className="list-disc list-inside">
                        {patient.medicalAlerts.map((alert, index) => (
                            <li key={index} className="text-red-500">{alert}</li>
                        ))}
                    </ul>
                </div>

                {/* Appointments */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4">Consultations</h3>
                    <table className="min-w-full text-left text-gray-700">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2">Date</th>
                                <th className="py-2">Time</th>
                                <th className="py-2">Provider</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patient.consultations.map((consultation, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-2">{format(new Date(consultation.datetime), 'yyyy-MM-dd')}</td>
                                    <td className="py-2">{format(new Date(consultation.datetime), 'HH:mm')}</td>
                                    <td className="py-2">{consultation.provider}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Insurance Details */}
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold border-b pb-2 mb-4">Insurance Details</h3>
                    <p><strong>Primary Insurance:</strong> {patient.insurance.primary}</p>
                    <p><strong>Secondary Insurance:</strong> {patient.insurance.secondary}</p>
                </div>
            </div>
        </div>
    );
};

export default PatientOverview;
