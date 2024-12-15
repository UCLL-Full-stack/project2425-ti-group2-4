import { ConsultationInput } from "../../types";
import database from "../../util/databases";
import { Consultation } from "../model/consultation";
import userDb from "./user.db";


const getAllConsultationsFromDB = async (): Promise<Consultation[]> => {
    try{
        const consultationPrisma = await database.consultation.findMany(
            {
                include: {
                    patient:{
                        include: {user: true}
                    },
                    doctors: {
                        include: {user: true}
                    }
                }
            }
        );
        
        return consultationPrisma.map((consultationPrisma) => Consultation.from(consultationPrisma))
    } catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getMyConsultations = async (username: string): Promise<Consultation[]> => {
    try {
        const user = await userDb.getUserByUsername({ username });

        if (!user) {
            throw new Error(`User with username: ${username} not found.`);
        }

        let consultationsPrisma;

        if (user.getRole() === "patient") {
            consultationsPrisma = await database.consultation.findMany({
                where: {
                    patientId: user.getId(),
                },
                include: {
                    patient: {
                        include: { user: true },
                    },
                    doctors: {
                        include: { user: true },
                    },
                },
            });
        } else if (user.getRole() === "doctor") {
            consultationsPrisma = await database.consultation.findMany({
                where: {
                    doctors: {
                        some: { userId: user.getId() }, 
                    },
                },
                include: {
                    patient: {
                        include: { user: true },
                    },
                    doctors: {
                        include: { user: true },
                    },
                },
            });
        } else {
            throw new Error("Unauthorized role. Cannot fetch consultations.");
        }
        return consultationsPrisma.map((consultationPrisma) => Consultation.from(consultationPrisma));
    } catch (error) {
        console.error(error);
        throw new Error("Database error. Check logs for more info.");
    }
}



const getConsultationById = async (id: number): Promise<Consultation | null> => {
    try {
        const consultationPrisma = await database.consultation.findUnique({
            where: {
                id: id
            },
            include: {
                patient:{
                    include: {user: true}
                },
                doctors: {
                    include: {user: true}
                }
            }
        });

        if (consultationPrisma === null) {
            return null;
        }

        return Consultation.from(consultationPrisma);
    } catch (error) {
        throw new Error("Could not fetch consultation with this id.");
    }
}

const createConsultation = async (consultationInput: ConsultationInput): Promise<Consultation> => {
    try {
        const { patientId, doctorIds, startDate, endDate, name } = consultationInput;

        const consultationPrisma = await database.consultation.create({
            data: {
                startDate,
                endDate,
                name,
                patient: {
                    connect: { id: patientId } 
                },
                doctors: {
                    connect: doctorIds.map((id) => ({ id })) 
                }
            },
            include: {
                patient:{
                    include: {user: true}
                },
                doctors: {
                    include: {user: true}
                }
            }
        });

        return Consultation.from(consultationPrisma);
    } catch (error) {
        console.error("Error creating consultation:", error);
        throw new Error("Error creating consultation.");
    }
};

const deleteConsultationById = async (consultation: Consultation): Promise<Consultation> => {
    try {
        const deletedConsultation = await database.consultation.delete({
            where: { id: consultation.id },
            include: {
                patient:{
                    include: {user: true}
                },
                doctors: {
                    include: {user: true}
                }
            },
        });
        return Consultation.from(deletedConsultation);
    } catch (error) {
        console.error("Error details:", error);
        throw new Error("Error deleting consultation.");
    }
};

export default {
    getAllConsultationsFromDB,
    getMyConsultations,
    getConsultationById,
    createConsultation,
    deleteConsultationById
}