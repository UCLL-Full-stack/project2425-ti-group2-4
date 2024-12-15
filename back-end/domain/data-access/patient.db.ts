import { PatientInput } from "../../types";
import database from "../../util/databases";
import { Patient } from "../model/patient";
import userDb from "./user.db";

const getAllPatientsFromDB = async (): Promise<Patient[]> => {
    try{
        const patientPrisma = await database.patient.findMany({
            include: {user: true}
        });
        return patientPrisma.map((patientPrisma) => Patient.from(patientPrisma))
    } catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getPatientByUsername = async (username: string): Promise<Patient[]> => {

    const user = await userDb.getUserByUsername({username})

    try{
        const patientPrisma = await database.patient.findMany(
            {
                where: {
                    userId: user?.getId()
                },
                include: {
                    user: true
                }
            }
        );
        return patientPrisma.map((patientPrisma) => Patient.from(patientPrisma))
    } catch(error){        
        console.log(error)
        throw new Error("Database error. Check logs for more info.");

    }
}

const getPatientById = async (id: number): Promise<Patient | null> => {
    try {
        const patientPrisma = await database.patient.findUnique({
            where: {
                id: id
            },
            include: {user: true}
        });

        if (patientPrisma === null) {
            return null;
        }

        return Patient.from(patientPrisma);
    } catch (error) {
        throw new Error("Could not fetch patient with this id.");
    }
}

const createPatient = async (patientData: PatientInput, userId: string): Promise<Patient> => {
    try {
        const existingUser = await database.user.findUnique({
            where: { id: Number(userId) }
        });

        if (!existingUser) {
            throw new Error('User not found');
        }
        const patientPrisma = await database.patient.create({
            data: {
                name: patientData.name,
                sex: patientData.sex,
                dateOfBirth: patientData.dateOfBirth,
                age: patientData.age,
                address: patientData.address,
                email: patientData.email,
                complaints: patientData.complaints,
                nationalRegister: patientData.nationalRegister,
                userId: existingUser.id, 
            },
            include: { user: true } 
        });

        const patient = Patient.from(patientPrisma);  
        return patient; 

    } catch (error) {
        console.error("Error details:", error);
        throw new Error("Error creating new patient.");
    }
};


const deletePatientById = async (patient: Patient): Promise<Patient> => {
    try {
        const deletedPatient = await database.patient.delete({
            where: { id: patient.id},
            include: { user: true }
        });
        return Patient.from(deletedPatient);
    } catch (error) {
        console.error("Error details:", error);
        throw new Error("Error deleting user.")
    }
}

export default {
    getAllPatientsFromDB,
    getPatientByUsername,
    getPatientById,
    createPatient,
    deletePatientById
}