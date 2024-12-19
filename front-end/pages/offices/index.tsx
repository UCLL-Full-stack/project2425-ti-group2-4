import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/general/header';
import OfficeService from '@services/OfficeService';
import OfficeOverviewTable from '@components/offices/officeOverview';
import { office } from '@types';
import useSWR from 'swr';

const Offices: React.FC = () => {
    const fetchOffices = async () => {
        const response = await OfficeService.getOffices();
        if (!response.ok) {
            throw new Error('Failed to fetch offices');
        }
        return response.json();
    };

    const { data: offices, error } = useSWR<office[]>('offices', fetchOffices);

    if (error) {
        console.error("Error fetching offices:", error);
    }

    return (
        <>
            <Head>
                <title>Offices</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 m-6">Our offices</h1>
                <section>
                    {offices ? (
                        offices.length > 0 ? (
                            <OfficeOverviewTable offices={offices} />
                        ) : (
                            <p className='text-center text-lg'>No offices available</p>
                        )
                    ) : (
                        <p className='text-center'>Loading...</p>
                    )}
                </section>
            </main>
        </>
    );
};

export default Offices;
