import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/general/header';
import PatientService from '@services/PatientService';
import PatientOverviewTable from '../../components/patients/PatientOverviewTable'; // Assuming you have a similar component for patients
import { Patient } from '@types';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Patients: React.FC = () => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null); // Add state for selected patient

    const getAllPatients = async () => {
        try {
            const response = await PatientService.getPatients();
            const patientsData = await response.json();
            console.log("Fetched data:", patientsData); // Log fetched data
            setPatients(patientsData);
        } catch (error) {
            console.error("Error fetching patients:", error);
        }
    };

    useEffect(() => {
        getAllPatients();
    }, []);

    return (
        <>
            <Head>
                <title>Patients</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Patients</h1>
                <section>
                    <h2>Patients Overview</h2>
                    {patients.length > 0 ? (
                        <PatientOverviewTable
                            patients={patients}
                            selectPatient={setSelectedPatient} // Pass the function to select a patient
                        />
                    ) : (
                        <p>Loading or no patients available...</p>
                    )}
                    {selectedPatient && (
                        <div>
                            {/* Render additional patient details if needed */}
                            <h3>Selected Patient Details</h3>
                            {/* Here you can render selected patient info */}
                            <p>Name: {selectedPatient.name}</p> {/* Example field */}
                            {/* Add more details as required */}
                        </div>
                    )}
                </section>
            </main>
        </>
    );
};

export const getServerSideProps = async (context: { locale: any }) => {
    const { locale } = context;
  
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default Patients;
