import doctorDb from "../domain/data-access/doctor.db";
import { Doctor } from "../domain/model/doctor";
import { DoctorInput } from "../types";


const getDoctors = async (): Promise<Doctor[]> => await doctorDb.getAllDoctorsFromDB();

const getDoctorById = async (id: number): Promise<Doctor | null> => {
    const doctor = doctorDb.getDoctorById(id);
    if (!doctor) {
        throw new Error(`Doctor with id: ${id} does not exist.`)
    }
    return doctor;
}

const createDoctor = async (doctor: Doctor): Promise<Doctor> => {
    return await doctorDb.createDoctor(doctor);
    
}

const deleteDoctorById = async (doctorId: number): Promise<Doctor> => {
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