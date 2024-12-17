import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/general/header';
import PatientService from '@services/PatientService';
import PatientOverviewTable from '../../components/patients/PatientOverviewTable'; 
import { Patient } from '@types';

const Patients: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null); 

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser") ?? '{}'))
    }, [])

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
                    {patients.length > 0 ? (
                        <PatientOverviewTable
                            patients={patients}
                            selectPatient={setSelectedPatient}
                        />
                    ) : (
                        <p>Loading or no patients available...</p>
                    )}
                    {selectedPatient && (
                        <div>
                            <h3>Selected Patient Details</h3>
                            <p>Name: {selectedPatient.name}</p> 
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};

export default Patients;
