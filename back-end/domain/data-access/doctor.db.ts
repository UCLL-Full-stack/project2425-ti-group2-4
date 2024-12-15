import { DoctorInput } from "../../types";
import database from "../../util/databases";
import { Doctor } from "../model/doctor";
import userDb from "./user.db";


const getAllDoctorsFromDB = async (): Promise<Doctor[]> => {
    try{
        const doctorPrisma = await database.doctor.findMany({include: {offices: true, user: true},});

        return doctorPrisma.map((doctorPrisma) => Doctor.from(doctorPrisma))
    } catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getDoctorByUsername = async (username: string): Promise<Doctor[]> => {

    const user = await userDb.getUserByUsername({username})

    try{
        const doctorPrisma = await database.doctor.findMany(
            {
                where: {
                    userId: user?.getId()
                },
                include: {
                    user: true
                }
            }
        );
        return doctorPrisma.map((doctorPrisma) => Doctor.from(doctorPrisma))
    } catch(error){        
        console.log(error)
        throw new Error("Database error. Check logs for more info.");

    }
}


const getDoctorById = async (id: number): Promise<Doctor | null> => {
    try {
        const doctorPrisma = await database.doctor.findUnique({
            where: {
                id: id
            },
            include: {
                offices: true,
                user: true
            }
        });

        if (doctorPrisma === null) {
            return null;
        }

        return Doctor.from(doctorPrisma);
    } catch (error) {
        throw new Error("Database error. See server log for details");
    }
}

const createDoctor = async (doctorData: DoctorInput, userId: string): Promise<Doctor> => {
    const offices = doctorData.offices;

    try {
        const existingUser = await database.user.findUnique({
            where: { id: Number(userId) }
        });

        if (!existingUser) {
            throw new Error('User not found');
        }
        const doctorPrisma = await database.doctor.create({
            data: {
                name: doctorData.name,
                email: doctorData.email,
                specialisation: doctorData.specialisation,
                offices: {
                    connect: offices.map((office) => ({ id: office.id })),
                },
                userId: existingUser.id,
                
            },
            include: {
                offices: true,
                user: true
            },
        });
        return Doctor.from(doctorPrisma)
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details");
    }
};

const deleteDoctorById = async (doctor: Doctor): Promise<Doctor> => {
    try {
        const deletedDoctor = await database.doctor.delete({
            where: { id: doctor.id},
            include: {user: true}
        });
        return Doctor.from(deletedDoctor);
    } catch (error) {
        console.error("Error details:", error);
        throw new Error("Error deleting user.")
    }
}

export default {
    getAllDoctorsFromDB,
    getDoctorByUsername,
    getDoctorById,
    createDoctor,
    deleteDoctorById
}