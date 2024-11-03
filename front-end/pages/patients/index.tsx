import Header from "@components/general/header";
import PatientOverview from "@components/Patients/PatientOverview";
import PatientService from "@services/PatientService";
import { Lecturer } from "@types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Patients: React.FC = () => {
    const [patients, setPatients] = useState<Array<Patient>>([]);


    const getAllPatients = async () => {
      const response = await PatientService.getPatients();
      const patients = await response.json();
      setPatients(patients);
    }
  
    useEffect(() => {
      getAllPatients();
    }, []);

    return (
    <><Head>
        <title>Patients</title>
        </Head><Header />
        <main className="d-flex flex-column justify-content-center align-items-center">
                <h1>Patients</h1>
                <section>
                    <h2>Patients overview</h2>
                    <PatientOverview patients={patients}/>
                </section>
            </main></>
    );
};

    export default Patients;