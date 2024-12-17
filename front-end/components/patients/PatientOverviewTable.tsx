import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'; 
import { Patient, User } from 'types';

interface PatientOverviewTableProps {
    patients: Array<Patient>;
}

const PatientOverviewTable: React.FC<PatientOverviewTableProps> = ({ patients }: PatientOverviewTableProps) => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [loggedInUserName, setLoggedInUserName] = useState<String | null>("");
    const router = useRouter();

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser") ?? '{}'))
        setLoggedInUserName(sessionStorage.getItem("loggedInUserProfileName"))
    }, [])

    const handlePatientClick = (patient: Patient) => {
            router.push(`/patients/${patient.id}`);
      };
      
     
    
    return (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md table-fixed">
              <thead className="bg-gray-100">
                <tr className="text-left text-gray-700">
                  <th className="py-3 px-4 font-semibold w-1/5">Name</th>
                  <th className="py-3 px-4 font-semibold w-1/5">Sex</th>
                  <th className="py-3 px-4 font-semibold w-1/5">Age</th>
                  <th className="py-3 px-4 font-semibold w-1/5">Address</th>
                  <th className="py-3 px-4 font-semibold w-1/5">Email</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr
                    key={index}
                    role="button"
                    className="cursor-pointer hover:bg-gray-200 transition duration-150"
                    onClick={() => handlePatientClick(patient)}
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
        </>
      );
      
};

export default PatientOverviewTable;
