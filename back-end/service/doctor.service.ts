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

const createDoctor = async (doctorInput: DoctorInput): Promise<Doctor> => {
    return await doctorDb.createDoctor(doctorInput);
}

export default {
    getDoctors,
    getDoctorById,
    createDoctor
}