import React from 'react';
import { Patient } from '@types';

interface PatientOverviewTableProps {
    patients: Array<Patient>;
    selectPatient: (patient: Patient) => void;
}

const PatientOverviewTable: React.FC<PatientOverviewTableProps> = ({ patients, selectPatient }) => {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                    <tr className="text-left text-gray-700">
                        <th className="py-3 px-4 font-semibold">Name</th>
                        <th className="py-3 px-4 font-semibold">Sex</th>
                        <th className="py-3 px-4 font-semibold">Age</th>
                        <th className="py-3 px-4 font-semibold">Address</th>
                        <th className="py-3 px-4 font-semibold">Email</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr
                            key={patient.id}
                            onClick={() => selectPatient(patient)}
                            role="button"
                            className="cursor-pointer hover:bg-gray-200 transition duration-150"
                        >
                            <td className="border-t border-gray-200 py-3 px-4">{patient.name}</td>
                            <td className="border-t border-gray-200 py-3 px-4">{patient.sex}</td>
                            <td className="border-t border-gray-200 py-3 px-4">{patient.age}</td>
                            <td className="border-t border-gray-200 py-3 px-4">{patient.address}</td>
                            <td className="border-t border-gray-200 py-3 px-4">{patient.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientOverviewTable;
