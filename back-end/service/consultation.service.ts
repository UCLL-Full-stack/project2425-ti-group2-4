import consultationDb from "../domain/data-access/consultation.db";
import { Consultation } from "../domain/model/consultation";
import { ConsultationInput } from "../types";


const getConsultations = async (): Promise<Consultation[]> => await consultationDb.getAllConsultationsFromDB();


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

export default {
    getConsultations,
    getConsultationById,
    createConsultation
}