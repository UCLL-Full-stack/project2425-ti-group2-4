import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/general/header';
import DoctorService from '@services/DoctorService';
import DoctorsOverview from '@components/doctors/doctorsOverview';
import { Doctor } from '@types';

const Doctors: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);

    const getDoctors = async () => {
        try {
            const response = await DoctorService.getDoctors();
            const doctorsData = await response.json();
            setDoctors(doctorsData);
        } catch (error) {
            console.error("Error fetching Doctors:", error);
        }
    };

    useEffect(() => {
        getDoctors();
    }, []);

    return (
        <>
            <Head>
                <title>Doctors</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 m-6">Our Doctors</h1>
                <section>
                    {doctors.length > 0 ? (
                        <DoctorsOverview
                            doctors={doctors}
                        />
                    ) : (
                        <p className='text-center'>Loading or no Doctors available...</p>
                    )}
                </section>
            </main>
        </>
    );
};

export default Doctors;
