import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Header from '@components/general/header';
import PatientService from '@services/PatientService';
import PatientOverviewTable from '../../components/patients/PatientOverviewTable'; 
import { Patient } from '@types';

const Patients: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [authError, setAuthError] = useState("");
    const router = useRouter();

    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null); 

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("loggedInUser") ?? '{}');
        setLoggedInUser(user);
        if (!user.role) {
            setAuthError("You are not authorized to view this page.");
        }
    }, [router])

    const getPatients = async () => {
        try {
            const response = await PatientService.getPatients();
            const patientsData = await response.json();
            setPatients(patientsData);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    useEffect(() => {
        getPatients();
    }, []);

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
                    ) : patients.length > 0 ? (
                        <PatientOverviewTable
                            patients={patients}
                            selectPatient={setSelectedPatient}
                        />
                    ) : (
                        <p className='text-center'>Loading or no patients available...</p>
                    )}
                </section>
            </main>
        </>
    );
};

export default Patients;
