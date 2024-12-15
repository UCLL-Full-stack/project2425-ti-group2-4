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

const createPatient = async (patient: Patient): Promise<Patient> => {
    const user = patient.getUser();
    try {

        const patientPrisma = await database.patient.create({
            data: {
                name: patient.getName(),
                sex: patient.getSex(),
                dateOfBirth: patient.getDateOfBirth(),
                age: patient.getAge(),
                address: patient.getAddress(),
                email: patient.getEmail(),
                complaints: patient.getComplaints(),
                nationalRegister: patient.getNationalRegister(),
                user: {
                    create: {
                        username: user.getUsername(),
                        password: user.getPassword(),
                        role: user.getRole()
                    }
                }
            },
            include: { user: true }
        });

        return Patient.from(patientPrisma);
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