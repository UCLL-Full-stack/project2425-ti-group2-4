import { UnauthorizedError } from "express-jwt";
import consultationDb from "../domain/data-access/consultation.db";
import { Consultation } from "../domain/model/consultation";
import { ConsultationInput, Role } from "../types";


const getAllConsultations = async (): Promise<Consultation[]> => await consultationDb.getAllConsultationsFromDB();

const getConsultations = async ({ username, role }: { username: string; role: Role }): Promise<Consultation[]> => {
    if(role === "admin" || "doctor")
        return await consultationDb.getAllConsultationsFromDB();
    if(role === "patient")
        return await consultationDb.getMyConsultations(username);
    else{
        throw new UnauthorizedError('credentials_required', {
            message: 'You are not authorized to access this rescource.'
        });
    };
};

const getConsultationById = async (id: number): Promise<Consultation | null> => {
    const consultation = consultationDb.getConsultationById(id);
    if (!consultation) {
        throw new Error(`consultation with id: ${id} does not exist.`)
    }
    return consultation;
}

const createConsultation = async (consultationInput: ConsultationInput): Promise<Consultation> => {
    return await consultationDb.createConsultation(consultationInput);
};

const deleteConsultationById = async(consultationId: number): Promise<Consultation> => {
    const consultationToDelete = await consultationDb.getConsultationById(Number(consultationId));
    if (!consultationToDelete) {
        throw new Error(`consultation with id: ${consultationId} does not exist.`)
    }
    return await consultationDb.deleteConsultationById(consultationToDelete);
}

export default {
    getConsultations,
    getConsultationById,
    createConsultation,
    deleteConsultationById
}