import React, { useState, useEffect } from 'react';
import { Doctor, Patient, StatusMessage, User } from "../../types";
import { useRouter } from 'next/router';
import ConsultationService from '@services/ConsultationService';
import PatientService from '@services/PatientService';
import DoctorService from '@services/DoctorService';

const AddConsultationForm: React.FC = () => {
    const router = useRouter();
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [startDateError, setStartDateError] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [endDateError, setEndDateError] = useState<string | null>(null);
    const [name, setName] = useState("");
    const [nameError, setNameError] = useState<string | null>(null);
    const [patient, setPatient] = useState<Patient | null>(null);
    const [patientError, setPatientError] = useState<string | null>(null);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [doctorsError, setDoctorsError] = useState<string | null>(null);
    const [allPatients, setAllPatients] = useState<Patient[]>([]);
    const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [loggedInUserName, setLoggedInUserName] = useState<String | null>("");
 

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem("loggedInUser") ?? '{}'))
        setLoggedInUserName(sessionStorage.getItem("loggedInUserProfileName"))
    }, [])

    const fetchDoctorsAndPatients = async () => {
        try {
            const fetchedPatients: Patient[] = await PatientService.getPatients().then(res => res.json());
            const fetchedDoctors: Doctor[] = await DoctorService.getDoctors().then(res => res.json());
            setAllPatients(fetchedPatients);
            setAllDoctors(fetchedDoctors);
        } catch (error) {
            console.error("Error fetching doctors or patients", error);
        }
    };

    useEffect(() => {
        fetchDoctorsAndPatients();
    }, []);

    const clearErrors = () => {
        setStartDateError(null);
        setEndDateError(null);
        setNameError(null);
        setPatientError(null);
        setDoctorsError(null);
        setStatusMessages([]);
    };

    const validate = (): boolean => {
        let result = true;

        if (!startDate) {
            setStartDateError("Start date is required");
            result = false;
        }
        if (!endDate) {
            setEndDateError("End date is required");
            result = false;
        }
        if (!name || name.trim() === "") {
            setNameError("Name is required");
            result = false;
        }
        if (!patient) {
            setPatientError("Patient is required");
            result = false;
        }
        if (doctors.length === 0) {
            setDoctorsError("At least one doctor is required");
            result = false;
        }

        return result;
    };

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        clearErrors();

        if (!validate()) {
            return;
        }
        if (startDate && endDate && patient && doctors.length > 0) {
            await ConsultationService.addConsultation(startDate, endDate, name, patient, doctors);
            router.push("/Consultations");
        }
    };

    return (
        <>
            <section>
                <form className="border p-4 rounded-md max-w-md mx-auto" onSubmit={handleSubmit}>
                    <p className="mb-4">
                        <label htmlFor="name" className="block text-base font-medium text-gray-700">Name:</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            className="form-input mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                        />
                        {nameError && <div className="text-red-800">{nameError}</div>}
                    </p>

                    <p className="mb-4">
                        <label htmlFor="startDate" className="block text-base font-medium text-gray-700">Start Date:</label>
                        <input
                            id="startDate"
                            type="datetime-local"
                            value={startDate ? startDate.toISOString().slice(0, 16) : ''}
                            onChange={(e) => setStartDate(new Date(e.target.value))}
                            className="form-input mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                        />
                        {startDateError && <div className="text-red-800">{startDateError}</div>}
                    </p>

                    <p className="mb-4">
                        <label htmlFor="endDate" className="block text-base font-medium text-gray-700">End Date:</label>
                        <input
                            id="endDate"
                            type="datetime-local"
                            value={endDate ? endDate.toISOString().slice(0, 16) : ''}
                            onChange={(e) => setEndDate(new Date(e.target.value))}
                            className="form-input mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                        />
                        {endDateError && <div className="text-red-800">{endDateError}</div>}
                    </p>

                    <p className="mb-4">
                        <label htmlFor="patient" className="block text-base font-medium text-gray-700">Patient:</label>
                        <select
                            id="patient"
                            value={patient ? patient.id : ''}
                            onChange={(e) => setPatient(allPatients.find(p => p.id === parseInt(e.target.value)) || null)}
                            className="form-input mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                        >
                            <option value="">Select a patient</option>
                            {allPatients.map((patient) => (
                                <option key={patient.id} value={patient.id}>
                                    {patient.name}
                                </option>
                            ))}
                        </select>
                        {patientError && <div className="text-red-800">{patientError}</div>}
                    </p>

                    <p className="mb-4">
                        <label htmlFor="doctors" className="block text-base font-medium text-gray-700">Doctors:</label>
                        <select
                            id="doctors"
                            multiple
                            value={doctors.map((doctor) => doctor.id?.toString() || '')} 
                            onChange={(e) => {
                                const selectedDoctors = Array.from(e.target.selectedOptions, (option) => {
                                    return allDoctors.find((doc) => doc.id === parseInt(option.value))!;
                                });
                                setDoctors(selectedDoctors);
                            }}
                            className="form-input mt-1 block w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out"
                        >
                            {allDoctors.map((doctor) => (
                                <option key={doctor.id} value={doctor.id}>
                                    {doctor.name}
                                </option>
                            ))}
                        </select>
                        {doctorsError && <div className="text-red-800">{doctorsError}</div>}
                    </p>
                    <div className='flex justify-center'>
                        <button
                        type="submit"
                        className="bg-transparent border-4 border-blue-400 text-black shadow-lg font-bold py-2 px-4 rounded-lg ml-8"
                        >
                        Create
                    </button>
                    </div>

                </form>
            </section>
        </>
    );
};

export default AddConsultationForm;
