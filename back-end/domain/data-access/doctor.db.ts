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

const createDoctor = async (doctor: Doctor): Promise<Doctor> => {
    const user = doctor.getUser();
    const offices = doctor.getOffices();

    try {

        const doctorPrisma = await database.doctor.create({
            data: {
                name: doctor.getName(),
                email: doctor.getEmail(),
                specialisation: doctor.getSpecialisation(),
                offices: {
                    connect: offices.map((office) => ({ id: office.id })),
                },
                user: {
                    create: {
                        username: user.getUsername(),
                        password: user.getPassword(),
                        role: user.getRole()  
                    }
                }
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