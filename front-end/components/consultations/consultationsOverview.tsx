import React, { useEffect, useState } from 'react';
import { Consultation, User } from 'types';

type Props = {
    consultations: Array<Consultation>;
};

const ConsultationOverviewTable: React.FC<Props> = ({ consultations }: Props) => {


    return (
        <>
            <div>
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md table-fixed">
                <thead className="bg-gray-100">
                    <tr className="text-left text-gray-700">
                    <th className="py-3 px-4 font-semibold">Consultation Name</th>
                    <th className="py-3 px-4 font-semibold">Start Date</th>
                    <th className="py-3 px-4 font-semibold">End Date</th>
                    <th className="py-3 px-4 font-semibold">Patient</th>
                    <th className="py-3 px-4 font-semibold">Doctors</th>
                    </tr>
                </thead>
                <tbody>
                    {consultations.length > 0 ? (
                    consultations.map((consultation, index) => (
                        <tr
                        key={index}
                        className="data-row cursor-pointer hover:bg-gray-200"
                        >
                        <td className="border-t border-gray-200 py-3 px-4">{consultation.name}</td>
                        <td className="border-t border-gray-200 py-3 px-4">
                            {new Date(consultation.startDate).toLocaleString()}
                        </td>
                        <td className="border-t border-gray-200 py-3 px-4">
                            {new Date(consultation.endDate).toLocaleString()}
                        </td>
                        <td className="border-t border-gray-200 py-3 px-4">
                            {consultation.patient?.name || 'No Patient'}
                        </td>
                        <td className="border-t border-gray-200 py-3 px-4">
                            {consultation.doctors?.map((doctor, idx) => (
                            <div key={idx}>{doctor.name}</div>
                            ))}
                        </td>
                        </tr>
                    ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center px-4 py-2 text-gray-600">
                            No consultations found for your profile.
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ConsultationOverviewTable;
