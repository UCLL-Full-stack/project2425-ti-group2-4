import { OfficeInput } from "../../types";
import database from "../../util/databases";
import { Office } from "../model/office";


const getAllOfficesFromDB = async (): Promise<Office[]> => {
    try{
        const officePrisma = await database.office.findMany();
        return officePrisma.map((officePrisma) => Office.from(officePrisma))
    } catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getOfficeById = async (id: number): Promise<Office | null> => {
    try {
        const officePrisma = await database.office.findUnique({
            where: {
                id: id
            }
        });

        if (officePrisma === null) {
            return null;
        }

        return Office.from(officePrisma);
    } catch (error) {
        throw new Error("Could not fetch office with this id.");
    }
}

const createOffice = async (officeInput: OfficeInput): Promise<Office> => {
    try {
        const office = new Office(officeInput)
        const officePrisma = await database.office.create({
            data: {
                name: office.getName(),
                address: office.getAddress(),
                email: office.getEmail(),
                openingHours: office.getOpeningHours(),
                phoneNumber: office.getPhoneNumber()
            },
        })
        return Office.from(officePrisma)
    } catch(error){
        throw new Error("Error creating new user.")
    }
}

export default {
    getAllOfficesFromDB,
    getOfficeById,
    createOffice
}