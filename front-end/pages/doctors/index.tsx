import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/general/header';
import DoctorService from '@services/DoctorService';
import DoctorsOverview from '@components/doctors/doctorsOverview';
import { Doctor } from '@types';
import useSWR from 'swr';

const Doctors: React.FC = () => {
    const fetchDoctors = async () => {
        const response = await DoctorService.getDoctors();
        if (!response.ok) {
            throw new Error('Failed to fetch doctors');
        }
        return response.json();
    };

    const { data: doctors, error } = useSWR<Doctor[]>('doctors', fetchDoctors);

    if (error) {
        console.error("Error fetching Doctors:", error);
    }

    return (
        <>
            <Head>
                <title>Doctors</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 m-6">Our Doctors</h1>
                <section>
                    {doctors ? (
                        doctors.length > 0 ? (
                            <DoctorsOverview doctors={doctors} />
                        ) : (
                            <p className='text-center text-lg'>No doctors available</p>
                        )
                    ) : (
                        <p className='text-center'>Loading...</p>
                    )}
                </section>
            </main>
        </>
    );
};

export default Doctors;
