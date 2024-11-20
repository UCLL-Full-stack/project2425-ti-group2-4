import { DoctorInput } from "../../types";
import database from "../../util/databases";
import { Doctor } from "../model/doctor";


const getAllDoctorsFromDB = async (): Promise<Doctor[]> => {
    try{
        const doctorPrisma = await database.doctor.findMany({include: {offices: true},});

        return doctorPrisma.map((doctorPrisma) => Doctor.from(doctorPrisma))
    } catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getDoctorById = async (id: number): Promise<Doctor | null> => {
    try {
        const doctorPrisma = await database.doctor.findUnique({
            where: {
                id: id
            },
            include: {
                offices: true
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

const createDoctor = async (doctorInput: DoctorInput): Promise<Doctor> => {
    try {
        const { offices = [] } = doctorInput;

        const doctorPrisma = await database.doctor.create({
            data: {
                name: doctorInput.name,
                email: doctorInput.email,
                specialisation: doctorInput.specialisation,
                offices: {
                    connect: offices.map((office) => ({ id: office.id })),
                },
            },
            include: {
                offices: true,
            },
        });
        return Doctor.from(doctorPrisma)
    } catch (error) {
        console.error(error);
        throw new Error("Database error. See server log for details");
    }
};

export default {
    getAllDoctorsFromDB,
    getDoctorById,
    createDoctor
}