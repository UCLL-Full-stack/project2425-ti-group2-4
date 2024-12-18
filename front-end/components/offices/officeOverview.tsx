import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Office, User } from 'types';

interface OfficeOverviewProps {
  offices: Array<Office>;
}

const OfficeOverview: React.FC<OfficeOverviewProps> = ({ offices }: OfficeOverviewProps) => {

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {offices.map((office, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-all"
        >
          <div className="p-4">
            <h3 className="text-xl font-semibold text-gray-900">{office.name}</h3>
            <p className="text-gray-600 mt-2">
              <strong>Address:</strong> {office.address}
            </p>
            <p className="text-gray-600 mt-2">
            <strong>Email:</strong> <a href={`mailto:${office.email}`} className="text-blue-600 hover:underline">{office.email}</a>
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Phone Number:</strong> {office.phoneNumber}
            </p>
            <p className="text-black mt-5">
              <strong>Opening Hours</strong>
            </p>
            <ul>
              <li className='mt-2'>
                <p>Monday: 08:00 - 17:00</p>
              </li>
              <li className='mt-2'>
                <p>Tuesday: 08:00 - 17:30</p>
              </li>
              <li className='mt-2'>
                <p>Wednesday: 08:00 - 13:00</p>
              </li>
              <li className='mt-2'>
                <p>Thursday: 08:00 - 17:00</p>
              </li>
              <li className='mt-2'>
                <p>Friday: 09:00 - 17:00</p>
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
  
};

export default OfficeOverview;
