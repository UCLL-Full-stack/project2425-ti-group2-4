import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Consultation, User } from 'types';
import Header from '@components/general/header';
import Head from 'next/head';
import ConsultationOverviewTable from '@components/consultations/consultationsOverview';
import ConsultationService from '@services/ConsultationService';
import useSWR from 'swr';

const Consultations: React.FC = () => {
    const [authError, setAuthError] = useState("");
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("loggedInUser") ?? '{}');
        setLoggedInUser(user);

        if (!user.role) {
            setAuthError("You are not authorized to view this page.");
        }

    }, [router]);

    const fetchConsultations = async () => {
        const response = await ConsultationService.getConsultations();
        if (!response.ok) {
            throw new Error('Failed to fetch consultations');
        }
        return response.json();
    };

    const { data: consultations, error } = useSWR<Consultation[]>('consultations', fetchConsultations);

    if (error) {
        console.error("Error fetching consultations:", error);
    }

    return (
        <>
            <Head>
                <title>Consultations</title>
            </Head>
            <Header />
            <main className="d-flex flex-column justify-content-center align-items-center">
                {loggedInUser?.role === "admin" ? (
                    <h1 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 m-6">All consultations</h1>
                ) : (
                    <h1 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 m-6">My consultations</h1>
                )}
                <section>
                    {authError ? (
                        <p className='text-center text-red-600'>{authError}</p>
                    ) : !consultations ? (
                        <p className='text-center'>Loading...</p>
                    ) : consultations.length > 0 ? (
                        <ConsultationOverviewTable consultations={consultations} />
                    ) : (
                        <p className='text-center text-lg'>No consultations available</p>
                    )}
                </section>
                {loggedInUser?.role === "patient" && (
                    <div className='flex justify-center p-10'>
                        <button                 
                            className="bg-transparent border-4 border-blue-400 text-black shadow-lg font-bold py-2 px-4 rounded-lg"
                            onClick={() => { router.push("/consultations/add") }}
                        >
                            Add a consultation
                        </button>
                    </div>
                )}
            </main>
        </>
    );
};

export default Consultations;
