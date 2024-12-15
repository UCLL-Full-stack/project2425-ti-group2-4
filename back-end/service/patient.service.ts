import { Patient } from "../domain/model/patient";
import patientDb from "../domain/data-access/patient.db";
import { UnauthorizedError } from "express-jwt";
import { Role } from "../types";


const getAllPatients = async (): Promise<Patient[]> => await patientDb.getAllPatientsFromDB();

const getPatients = async ({ username, role }: { username: string; role: Role }): Promise<Patient[]> => {
    if(role === "admin" || "doctor")
        return await patientDb.getAllPatientsFromDB();
    if(role === "patient")
        return await patientDb.getPatientByUsername(username);
    else{
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this rescource.'
        });
    };
};

const getPatientById = async ({ username, role }: { username: string; role: Role }, id: number): Promise<Patient | null> => {
    if (role === 'admin' || 'doctor') {
        const patient = await patientDb.getPatientById(id);
        if (!patient) {
            throw new Error(`Patient with id: ${id} does not exist.`);
        }
        return patient;
    }

    if (role === 'patient') {
        const patient = await patientDb.getPatientById(id);
        if (!patient) {
            throw new Error(`Patient with id: ${id} does not exist.`);
        }

        if (patient.getUser().getUsername() !== username) {
            throw new Error('You are not authorized to access this patient.');
        }
        return patient;
    }

    throw new Error('You are not authorized to access this resource.');
};


const createPatient = async (role: Role, patient: Patient): Promise<Patient> => {
    if (role !== 'admin') {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this rescource.'
        })
    }
    else if (!patient.getName() || !patient.getSex() || !patient.getDateOfBirth() || !patient.getAddress()) {
        throw new Error("Undefined properties when creating patient.");
    }
    return await patientDb.createPatient(patient);
}

const deletePatientById = async (role: Role, patientId: number): Promise<Patient> => {
    if (role !== 'admin') {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this rescource.'
        })
    }
    const patientToDelete = await patientDb.getPatientById(Number(patientId));
    if (!patientToDelete) {
        throw new Error(`Patient with id: ${patientId} does not exist.`)
    }
    return await patientDb.deletePatientById(patientToDelete);
    
}

// const updatePatient = async ({name, dateOfBirth, address, email, complaints, sex}: PatientInput): Promise<Patient> => {
//     const patient = await patientDb.getPatientById()
// }

export default {
    getPatients,
    getPatientById,
    createPatient,
    deletePatientById
}