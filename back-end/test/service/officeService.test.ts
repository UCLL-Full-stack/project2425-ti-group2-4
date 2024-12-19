import { UnauthorizedError } from "express-jwt";
import officeDb from "../../domain/data-access/office.db";
import officeService from "../../service/office.service";
import { OfficeInput } from "../../types";
import { Office } from "../../domain/model/office";
import { User } from "../../domain/model/user";

const adminUser = new User({
    username: "admin",
    password: "admin",
    role: "admin"
});

const doctorUser = new User({
    username: "doctor",
    password: "doctor",
    role: "doctor"
});

const office1 = new Office({
    id: 1,
    name: "Main Office",
    address: "123 Main St",
    email: "office@example.com",
    openingHours: [new Date("1990-05-15T00:00:00Z")],
    phoneNumber: 123456789
});

const office2 = new Office({
    id: 2,
    name: "Extra Office",
    address: "123 Extra St",
    email: "office2@example.com",
    openingHours: [new Date("1990-05-15T00:00:00Z")],
    phoneNumber: 123456788
});

const offices = [office1, office2];

let mockOfficeDbGetAllOfficesFromDB: jest.Mock;
let mockOfficeDbGetOfficeById: jest.Mock;
let mockOfficeDbCreateOffice: jest.Mock;
let mockOfficeDbDeleteOfficeById: jest.Mock;

beforeEach(() => {
    mockOfficeDbGetAllOfficesFromDB = jest.fn();
    mockOfficeDbGetOfficeById = jest.fn();
    mockOfficeDbCreateOffice = jest.fn();
    mockOfficeDbDeleteOfficeById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: nothing, when: getAllOffices is called, then: all offices are returned', async () => {
    // given
    officeDb.getAllOfficesFromDB = mockOfficeDbGetAllOfficesFromDB.mockResolvedValue(offices);

    // when
    const result = await officeService.getOffices();

    // then
    expect(mockOfficeDbGetAllOfficesFromDB).toHaveBeenCalledTimes(1);
    expect(result).toEqual(offices);
});

test('given: an admin user, when: getOffices is called, then: all offices are returned', async () => {
    // given
    officeDb.getAllOfficesFromDB = mockOfficeDbGetAllOfficesFromDB.mockResolvedValue(offices);

    // when
    const result = await officeService.getOffices();

    // then
    expect(mockOfficeDbGetAllOfficesFromDB).toHaveBeenCalledTimes(1);
    expect(result).toEqual(offices);
});

test('given: a user, when: getOffices is called, then: all offices are returned', async () => {
    // given
    officeDb.getAllOfficesFromDB = mockOfficeDbGetAllOfficesFromDB.mockResolvedValue(offices);

    // when
    const result = await officeService.getOffices();

    // then
    expect(mockOfficeDbGetAllOfficesFromDB).toHaveBeenCalledTimes(1);
    expect(result).toEqual(offices);
});



test('given: an office exists, when: getOfficeById is called, then: the office is returned', async () => {
    // given
    officeDb.getOfficeById = mockOfficeDbGetOfficeById.mockResolvedValue(office1);

    // when
    const result = await officeService.getOfficeById(1);

    // then
    expect(mockOfficeDbGetOfficeById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(office1);
});

test('given: an office does not exist, when: getOfficeById is called, then: an error is thrown', async () => {
    // given
    officeDb.getOfficeById = mockOfficeDbGetOfficeById.mockResolvedValue(null);

    // when + then
    await expect(officeService.getOfficeById(999)).rejects.toThrow("Office with id: 999 does not exist.");
    expect(mockOfficeDbGetOfficeById).toHaveBeenCalledTimes(1);
});

test('given: valid office data, when: creating an office, then: the office is created', async () => {
    // given
    const officeInput: OfficeInput = {
        name: "Office C",
        address: "789 C Rd.",
        email: "officec@example.com",
        openingHours: [new Date("1990-05-15T00:00:00Z")],
        phoneNumber: 123456789
    };
    const newOffice = new Office({
        id: 3,
        name: "Office C",
        address: "789 C Rd.",
        email: "officec@example.com",
        openingHours: [new Date("1990-05-15T00:00:00Z")],
        phoneNumber: 123456789
    });
    officeDb.createOffice = mockOfficeDbCreateOffice.mockResolvedValue(newOffice);

    // when
    const createdOffice = await officeService.createOffice(officeInput);

    // then
    expect(mockOfficeDbCreateOffice).toHaveBeenCalledTimes(1);
    expect(mockOfficeDbCreateOffice).toHaveBeenCalledWith(newOffice.toObject());
    expect(createdOffice).toEqual(newOffice);
});

test('given: invalid office data (missing name), when: creating an office, then: an error is thrown and no office is created', async () => {
    // given
    const officeInput: OfficeInput = {
        name: "",
        address: "789 C Rd.",
        email: "officec@example.com",
        openingHours: [new Date("1990-05-15T00:00:00Z")],
        phoneNumber: 123456789
    };

    // when + then
    await expect(officeService.createOffice(officeInput)).rejects.toThrow("office details cannot be empty");
    expect(mockOfficeDbCreateOffice).toHaveBeenCalledTimes(0);
});
