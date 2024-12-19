import { UnauthorizedError } from "express-jwt";
import patientDb from "../../domain/data-access/patient.db";
import patientService from "../../service/patient.service";
import { PatientInput, UserInput } from "../../types";
import { User } from "../../domain/model/user";
import userDb from "../../domain/data-access/user.db";
import { Patient } from "../../domain/model/patient";

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

const patientUser = new User({
    username: "patient",
    password: "patient",
    role: "patient"
});

const patient = new Patient({
    name: "John Doe",
    sex: "Male",
    dateOfBirth: new Date("1990-01-01"),
    age: 34,
    address: "123 Main St",
    email: "john.doe@example.com",
    complaints: ["headache"],
    nationalRegister: "123456789",
    user: patientUser
});

const patients = [
    patient,
    new Patient({
        id: 2,
        name: "Jane Doe",
        sex: "Female",
        dateOfBirth: new Date("1985-05-01"),
        age: 39,
        address: "456 Oak Ave",
        email: "jane.doe@example.com",
        complaints: ["fever"],
        nationalRegister: "987654321",
        user: patientUser
    })
];

let mockPatientDbGetAllPatientsFromDB: jest.Mock;
let mockPatientDbGetPatientByUsername: jest.Mock;
let mockPatientDbCreatePatient: jest.Mock;
let mockPatientDbGetPatientById: jest.Mock;
let mockPatientDbDeletePatientById: jest.Mock;
let mockUserDbGetUserByUsername: jest.Mock;

beforeEach(() => {
    mockPatientDbGetAllPatientsFromDB = jest.fn();
    mockPatientDbGetPatientByUsername = jest.fn();
    mockPatientDbCreatePatient = jest.fn();
    mockPatientDbGetPatientById = jest.fn();
    mockPatientDbDeletePatientById = jest.fn();
    mockUserDbGetUserByUsername = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: nothing, when: getAllPatients is called, then: all patients are returned', async () => {
    // given
    patientDb.getAllPatientsFromDB = mockPatientDbGetAllPatientsFromDB.mockResolvedValue(patients);

    // when
    const result = await patientService.getPatients({username: adminUser.getUsername(), role: adminUser.getRole()});

    // then
    expect(mockPatientDbGetAllPatientsFromDB).toHaveBeenCalledTimes(1);
    expect(result).toEqual(patients);
});

test('given: an admin user, when: getPatients is called, then: all patients are returned', async () => {
    // given
    patientDb.getAllPatientsFromDB = mockPatientDbGetAllPatientsFromDB.mockResolvedValue(patients);

    // when
    const result = await patientService.getPatients({ username: adminUser.getUsername(), role: adminUser.getRole() });

    // then
    expect(mockPatientDbGetAllPatientsFromDB).toHaveBeenCalledTimes(1);
    expect(result).toEqual(patients);
});

test('given: a doctor user, when: getPatients is called, then: all patients are returned', async () => {
    // given
    patientDb.getAllPatientsFromDB = mockPatientDbGetAllPatientsFromDB.mockResolvedValue(patients);

    // when
    const result = await patientService.getPatients({ username: doctorUser.getUsername(), role: doctorUser.getRole() });

    // then
    expect(mockPatientDbGetAllPatientsFromDB).toHaveBeenCalledTimes(1);
    expect(result).toEqual(patients);
});

test('given: a patient user, when: getPatients is called, then: only the patient of the username is returned', async () => {
    // given
    patientDb.getPatientByUsername = mockPatientDbGetPatientByUsername.mockResolvedValue([patient]);

    // when
    const result = await patientService.getPatients({ username: patientUser.getUsername(), role: patientUser.getRole() });

    // then
    expect(mockPatientDbGetPatientByUsername).toHaveBeenCalledTimes(1);
    expect(result).toEqual([patient]);
});

test('given: a guest user, when: getPatients is called, then: no patients are returned and an error is thrown', async () => {
    // given
    patientDb.getPatientByUsername = mockPatientDbGetPatientByUsername.mockResolvedValue([]);

    // when + then
    await expect(
        patientService.getPatients({ username: "guest", role: "guest" })
    ).rejects.toThrow(new UnauthorizedError('credentials_required', { message: 'You are not authorized to access this rescource.' }));
    expect(mockPatientDbGetPatientByUsername).toHaveBeenCalledTimes(0);
});

test('given: a valid patient data, when: creating a patient, then: patient is created', async () => {
    // given
    userDb.getUserByUsername = mockUserDbGetUserByUsername.mockResolvedValue(patientUser);
    patientDb.createPatient = mockPatientDbCreatePatient;

    // when
    const patientData: PatientInput = { name: "Alice", sex: "Female", dateOfBirth: new Date(), age: 30, address: "789 Pine St", email: "alice@example.com", complaints: ["cough"], nationalRegister: "1122334455", user: { username: "alice", password: "password", role: "patient" } };
    await patientService.createPatient("admin", patientData, "user");

    // then
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledTimes(0);
    expect(mockPatientDbCreatePatient).toHaveBeenCalledTimes(1);
});

test('given: invalid patient data, when: creating a patient, then: error is thrown and no patient is created', async () => {
    // given
    userDb.getUserByUsername = mockUserDbGetUserByUsername.mockResolvedValue(patientUser);

    // when + then
    const patientData: PatientInput = { name: "", sex: "Female", dateOfBirth: new Date(), age: 30, address: "789 Pine St", email: "alice@example.com", complaints: ["cough"], nationalRegister: "1122334455", user: { username: "alice", password: "password", role: "patient" } };
    await expect(patientService.createPatient("admin", patientData, "user")).rejects.toThrow("Patient name cannot be empty");
    expect(mockPatientDbCreatePatient).toHaveBeenCalledTimes(0);
});


test('given: an admin user, when: deleting a patient by id, then: patient is deleted', async () => {
    // given
    patientDb.getPatientById = mockPatientDbGetPatientById.mockResolvedValue(patient);
    patientDb.deletePatientById = mockPatientDbDeletePatientById;

    // when
    await patientService.deletePatientById("admin", 1);

    // then
    expect(mockPatientDbGetPatientById).toHaveBeenCalledTimes(1);
    expect(mockPatientDbDeletePatientById).toHaveBeenCalledTimes(1);
});

test('given: a patient user, when: deleting a patient by id, then: error is thrown', async () => {
    // given
    patientDb.getPatientById = mockPatientDbGetPatientById.mockResolvedValue(patient);

    // when + then
    await expect(patientService.deletePatientById("patient", 1)).rejects.toThrow("You are not authorized to access this resource.");
    expect(mockPatientDbGetPatientById).toHaveBeenCalledTimes(0);
    expect(mockPatientDbDeletePatientById).toHaveBeenCalledTimes(0);
});

test('given: a patient that does not exist, when: deleting a patient by id, then: error is thrown', async () => {
    // given
    patientDb.getPatientById = mockPatientDbGetPatientById.mockResolvedValue(null);

    // when + then
    await expect(patientService.deletePatientById("admin", 999)).rejects.toThrow("Patient with id: 999 does not exist.");
    expect(mockPatientDbGetPatientById).toHaveBeenCalledTimes(1);
});