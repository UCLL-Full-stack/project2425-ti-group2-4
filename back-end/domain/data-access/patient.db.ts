import { PatientInput } from "../../types";
import database from "../../util/databases";
import { Patient } from "../model/patient";

const getAllPatientsFromDB = async (): Promise<Patient[]> => {
    try{
        const patientPrisma = await database.patient.findMany();
        return patientPrisma.map((patientPrisma) => Patient.from(patientPrisma))
    } catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getPatientById = async (id: number): Promise<Patient | null> => {
    try {
        const patientPrisma = await database.patient.findUnique({
            where: {
                id: id
            }
        });

        if (patientPrisma === null) {
            return null;
        }

        return Patient.from(patientPrisma);
    } catch (error) {
        throw new Error("Could not fetch patient with this id.");
    }
}

const createPatient = async (patientInput: PatientInput): Promise<Patient> => {
    try {
        const patient = new Patient(patientInput)
        const patientPrisma = await database.patient.create({
            data: {
                name: patient.name,
                sex: patient.sex,
                dateOfBirth: patient.dateOfBirth,
                age: patient.age,
                address: patient.address,
                email: patient.email,
                complaints: patient.complaints,
                nationalRegister: patient.nationalRegister
            },
        })
        return Patient.from(patientPrisma)
    } catch(error){
        throw new Error("Error creating new user.")
    }
}

const deletePatientById = async (patient: Patient): Promise<Patient> => {
    try {
        const deletedPatient = await database.patient.delete({
            where: { id: patient.id},
        });
        return Patient.from(deletedPatient);
    } catch (error) {
        throw new Error("Error deleting user.")
    }
}

export default {
    getAllPatientsFromDB,
    getPatientById,
    createPatient,
    deletePatientById
}