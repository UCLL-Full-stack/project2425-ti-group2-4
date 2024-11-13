import officeDb from "../domain/data-access/office.db";
import { Office } from "../domain/model/office";
import { OfficeInput } from "../types";


const getOffices = async (): Promise<Office[]> => await officeDb.getAllOfficesFromDB();


const getofficeById = async (id: number): Promise<Office | null> => {
    const office = officeDb.getofficeById(id);
    if (!office) {
        throw new Error(`office with id: ${id} does not exist.`)
    }
    return office;
}

const createoffice = async (officeInput: OfficeInput): Promise<Office> => {

    const office = new Office(officeInput);
    return await officeDb.createoffice(office.toObject());
}

export default {
    getOffices,
    getofficeById,
    createoffice
}