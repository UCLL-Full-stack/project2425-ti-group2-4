import { Patient } from "../domain/model/patient";
import patientDb from "../domain/data-access/patient.db";
import { PatientInput } from "../types";

const getPatients = async (): Promise<Patient[]> => await patientDb.getAllPatientsFromDB();


const getPatientById = async (id: number): Promise<Patient | null> => {
    const patient = patientDb.getPatientById(id);
    if (!patient) {
        throw new Error(`Patient with id: ${id} does not exist.`)
    }
    return patient;
}

const createPatient = async (patientInput: PatientInput): Promise<Patient> => {
    if(patientInput.name == undefined || patientInput.sex == undefined || patientInput.name == undefined || patientInput.dateOfBirth == undefined || patientInput.address == undefined)
        throw new Error("Undefined properties when creating patient.")
    const patient = new Patient({name: patientInput.name, sex: patientInput.sex, dateOfBirth: patientInput.dateOfBirth, age: patientInput.age, address: patientInput.address, email: patientInput.email, complaints: patientInput.complaints, nationalRegister: patientInput.nationalRegister})
    return await patientDb.createPatient(patient);
}

const deletePatientById = async (patientId: number): Promise<Patient> => {
    const patientToDelete = await patientDb.getPatientById(Number(patientId));
    console.log(patientToDelete);
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