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
            <p className="text-gray-600 mt-2"><strong>Address:</strong> {office.address}</p>
            <p className="text-gray-600 mt-2"><strong>Email:</strong> {office.email}</p>
            <p className="text-gray-600 mt-2"><strong>Phone Number:</strong> {office.phoneNumber}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OfficeOverview;
