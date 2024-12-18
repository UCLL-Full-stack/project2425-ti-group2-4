import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Doctor, User } from 'types';

interface DoctorOverviewProps {
  doctors: Array<Doctor>;
}

const DoctorsOverview: React.FC<DoctorOverviewProps> = ({ doctors }: DoctorOverviewProps) => {

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all"
        >
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
            <p className="text-gray-600 mt-2"><strong>Specialisation:</strong> {doctor.specialisation}</p>
            <strong>Email:</strong> <a href={`mailto:${doctor.email}`} className="text-blue-600 hover:underline">{doctor.email}</a>
            <p className='mt-4'><strong>Offices:</strong></p>
            {doctor.offices && doctor.offices.length > 0 && (
              <div className="text-gray-600 mt-2">
                {doctor.offices.map((office, index) => (
                  <div key={index} className="mt-2">
                    <p>
                      <strong>Name:</strong> {office.name}
                    </p>
                    <p>
                      <strong>Address:</strong> {office.address}
                    </p>
                    <p>
                      <strong>Phone Number:</strong> {office.phoneNumber}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorsOverview;
