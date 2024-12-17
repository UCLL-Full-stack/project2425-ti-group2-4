import Head from 'next/head';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import PatientService from '@services/PatientService';
import Header from '@components/general/header';
import { Patient } from 'types';
import PatientDetails from '@components/patients/patientDetails';

const PatientOverview: React.FC = () => {
    const [loadingError, setLoadingError] = useState("")
    const [patient, setPatient] = useState<Patient>();
    const router = useRouter()
    const { id } = router.query;
    const { t } = useTranslation()

    const getpatient = async () => {
        const response = await PatientService.getPatientById(Number(id))

        if (!response.ok) {
            if (response.status === 400) {
                setLoadingError("No patient found");
            }
            else{
                setLoadingError(response.statusText)
            }
        }
        else{
            const patient = await response.json();
            setPatient(patient);
            return { patient }
        }
    }

    useEffect(() => {
      if (id) {
        getpatient();
      }
    }, [id]);

    const { data, isLoading, error } = useSWR(
        "getpatient" , getpatient
    )

    return (
        <>
            <Head>
                <title>Patient {patient?.name}</title>
            </Head>
            <Header/>
            <main>
            {loadingError === "" ? (
                    <>
                        {isLoading && <p>Loading...</p>}
                        {data && (
                            <PatientDetails patient={data.patient}/>

                        )}
                    </>
                ) : (
                    <>
                    <p>{loadingError}</p>
                    </>
                )}
            </main>
        </>
    )
}

export default PatientOverview;