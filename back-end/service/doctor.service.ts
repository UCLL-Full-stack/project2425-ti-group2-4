import { UnauthorizedError } from "express-jwt";
import doctorDb from "../domain/data-access/doctor.db";
import { Doctor } from "../domain/model/doctor";
import { Patient } from "../domain/model/patient";
import { DoctorInput, Role } from "../types";



const getDoctors = async (): Promise<Doctor[]> => {
    return await doctorDb.getAllDoctorsFromDB();
};


const getDoctorById = async ({ username, role }: { username: string; role: Role }, id: number): Promise<Doctor | null> => {
    if (role === 'admin') {
        const doctor = doctorDb.getDoctorById(id);
        if (!doctor) {
            throw new Error(`Doctor with id: ${id} does not exist.`)
        }
        return doctor;
    }
    if (role === 'doctor') {
        const doctor = await doctorDb.getDoctorById(id);
        if (!doctor) {
            throw new Error(`Doctor with id: ${id} does not exist.`);
        }
    
        if (doctor.getUser().getUsername() !== username) {
            throw new Error('You are not authorized to access this doctor.');
        }
        return doctor;
    }
        throw new Error('You are not authorized to access this resource.');
}

const createDoctor = async (role: Role, doctorData: DoctorInput, userId: string): Promise<Doctor> => {
    if (role !== 'admin') {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this rescource.'
        })
    }
    
    const doctor = await doctorDb.createDoctor(doctorData, userId)
    return doctor
    
}

const deleteDoctorById = async (role: Role, doctorId: number): Promise<Doctor> => {
    if (role !== 'admin') {
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this rescource.'
        })
    }
    const doctorToDelete = await doctorDb.getDoctorById(Number(doctorId));
    if (!doctorToDelete) {
        throw new Error(`doctor with id: ${doctorId} does not exist.`)
    }
    return await doctorDb.deleteDoctorById(doctorToDelete);
    
}

export default {
    getDoctors,
    getDoctorById,
    createDoctor,
    deleteDoctorById
}