import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/general/header';
import PatientService from '@services/PatientService';
import PatientOverviewTable from '../../components/patients/PatientOverviewTable'; 
import { Patient } from '@types';
import useSWR from 'swr';

const Patients: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [authError, setAuthError] = useState("");
    const router = useRouter();
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("loggedInUser") ?? '{}');
        setLoggedInUser(user);
        if (!user.role) {
            setAuthError("You are not authorized to view this page.");
        }
    }, [router]);

    // SWR Fetcher function
    const fetchPatients = async () => {
        const response = await PatientService.getPatients();
        if (!response.ok) {
            throw new Error('Failed to fetch patients');
        }
        return response.json();
    };

    const { data: patients, error } = useSWR<Patient[]>('patients', fetchPatients);

    if (error) {
        console.error("Error fetching patients:", error);
    }

    return (
        <>
            <Head>
                <title>Patients</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 m-6">Patients</h1>
                <section>
                    {authError ? (
                        <p className='text-center text-red-600'>{authError}</p>
                    ) : !patients ? (
                        <p className='text-center'>Loading...</p>
                    ) : patients.length > 0 ? (
                        <PatientOverviewTable
                            patients={patients}
                            selectPatient={setSelectedPatient}
                        />
                    ) : (
                        <p className='text-center text-lg'>No patients available</p>
                    )}
                </section>
            </main>
        </>
    );
};

export default Patients;
