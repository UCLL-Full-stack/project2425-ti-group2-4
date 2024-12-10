import { Patient } from "../domain/model/patient";
import patientDb from "../domain/data-access/patient.db";

const getPatients = async (): Promise<Patient[]> => await patientDb.getAllPatientsFromDB();


const getPatientById = async (id: number): Promise<Patient | null> => {
    const patient = patientDb.getPatientById(id);
    if (!patient) {
        throw new Error(`Patient with id: ${id} does not exist.`)
    }
    return patient;
}

const createPatient = async (patient: Patient): Promise<Patient> => {
    if (!patient.getName() || !patient.getSex() || !patient.getDateOfBirth() || !patient.getAddress()) {
        throw new Error("Undefined properties when creating patient.");
    }
    return await patientDb.createPatient(patient);
}

const deletePatientById = async (patientId: number): Promise<Patient> => {
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