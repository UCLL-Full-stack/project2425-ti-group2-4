import officeDb from "../domain/data-access/office.db";
import { Office } from "../domain/model/office";
import { OfficeInput } from "../types";


const getOffices = async (): Promise<Office[]> => await officeDb.getAllOfficesFromDB();


const getOfficeById = async (id: number): Promise<Office | null> => {
    const office = await officeDb.getOfficeById(id);
    if (!office) {
        throw new Error(`Office with id: ${id} does not exist.`)
    }
    return office;
}

const createOffice = async (officeInput: OfficeInput): Promise<Office> => {

    const office = new Office(officeInput);
    return await officeDb.createOffice(office.toObject());
}

export default {
    getOffices,
    getOfficeById,
    createOffice
}