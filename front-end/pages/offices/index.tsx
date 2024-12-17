import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Header from '@components/general/header';
import OfficeService from '@services/OfficeService';
import OfficeOverviewTable from '@components/offices/officeOverview';
import { office } from '@types';

const Offices: React.FC = () => {
    const [offices, setoffices] = useState<office[]>([]);
    const [selectedoffice, setSelectedoffice] = useState<office | null>(null); 

    const getOffices = async () => {
        try {
            const response = await OfficeService.getOffices();
            const officesData = await response.json();
            setoffices(officesData);
        } catch (error) {
            console.error("Error fetching offices:", error);
        }
    };

    useEffect(() => {
        getOffices();
    }, []);

    return (
        <>
            <Head>
                <title>Offices</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                <h1 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 m-6">Our offices</h1>
                <section>
                    {offices.length > 0 ? (
                        <OfficeOverviewTable
                            offices={offices}
                        />
                    ) : (
                        <p>Loading or no offices available...</p>
                    )}
                </section>
            </main>
        </>
    );
};

export default Offices;
