import { UnauthorizedError } from "express-jwt";
import doctorService from "../../service/doctor.service";
import doctorDb from "../../domain/data-access/doctor.db";
import userDb from "../../domain/data-access/user.db";
import { Doctor } from "../../domain/model/doctor";
import { DoctorInput, Role } from "../../types";
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
const doctor = new Doctor({
    id: 1,
    user: doctorUser,
    name: "Dr. John Doe",
    email: "dr.john@example.com",
    specialisation: "Cardiologist",
    offices: []
});

let mockDoctorDbGetAllDoctorsFromDB: jest.Mock;
let mockDoctorDbGetDoctorById: jest.Mock;
let mockDoctorDbCreateDoctor: jest.Mock;
let mockDoctorDbDeleteDoctorById: jest.Mock;
let mockUserDbGetUserByUsername: jest.Mock;

beforeEach(() => {
    mockDoctorDbGetAllDoctorsFromDB = jest.fn();
    mockDoctorDbGetDoctorById = jest.fn();
    mockDoctorDbCreateDoctor = jest.fn();
    mockDoctorDbDeleteDoctorById = jest.fn();
    mockUserDbGetUserByUsername = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: nothing, when: getAllDoctors is called, then: all doctors are returned', async () => {
    // given
    doctorDb.getAllDoctorsFromDB = mockDoctorDbGetAllDoctorsFromDB.mockResolvedValue([doctor]);

    // when
    const result = await doctorService.getDoctors();

    // then
    expect(mockDoctorDbGetAllDoctorsFromDB).toHaveBeenCalledTimes(1);
    expect(result).toEqual([doctor]);
});

test('given: an admin user, when: getDoctorById is called, then: doctor is returned', async () => {
    // given
    doctorDb.getDoctorById = mockDoctorDbGetDoctorById.mockResolvedValue(doctor);

    // when
    const result = await doctorService.getDoctorById({ username: adminUser.getUsername(), role: adminUser.getRole() }, 1);

    // then
    expect(mockDoctorDbGetDoctorById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(doctor);
});


test('given: a doctor user, when: getDoctorById is called for self, then: doctor is returned', async () => {
    // given
    doctorDb.getDoctorById = mockDoctorDbGetDoctorById.mockResolvedValue(doctor);

    // when
    const result = await doctorService.getDoctorById({ username: doctorUser.getUsername(), role: doctorUser.getRole() }, 1);

    // then
    expect(mockDoctorDbGetDoctorById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(doctor);
});


test('given: valid doctor data, when: createDoctor is called by admin, then: doctor is created', async () => {
    // given
    const doctorData: DoctorInput = {
        name: "Dr. Alice Smith",
        user: { username: "alice", password: "password", role: "doctor" },
        email: "dr.alice@example.com",
        specialisation: "Pediatrician",
        offices: []
    };
    doctorDb.createDoctor = mockDoctorDbCreateDoctor.mockResolvedValue(doctor);

    // when
    const result = await doctorService.createDoctor(adminUser.getRole(), doctorData, "userId");

    // then
    expect(mockDoctorDbCreateDoctor).toHaveBeenCalledTimes(1);
    expect(result).toEqual(doctor);
});

test('given: valid doctor data, when: createDoctor is called by non-admin, then: error is thrown', async () => {
    // given
    const doctorData: DoctorInput = {
        name: "Dr. Alice Smith",
        user: { username: "alice", password: "password", role: "doctor" },
        email: "dr.alice@example.com",
        specialisation: "Pediatrician",
        offices: []
    };

    // when + then
    await expect(doctorService.createDoctor(doctorUser.getRole(), doctorData, "userId")).rejects.toThrow(
        new UnauthorizedError("credentials_required", {
            message: "You are not authorized to access this resource."
        })
    );
    expect(mockDoctorDbCreateDoctor).toHaveBeenCalledTimes(0);
});

test('given: an admin user, when: deleteDoctorById is called, then: doctor is deleted', async () => {
    // given
    doctorDb.getDoctorById = mockDoctorDbGetDoctorById.mockResolvedValue(doctor);
    doctorDb.deleteDoctorById = mockDoctorDbDeleteDoctorById.mockResolvedValue(doctor);

    // when
    const result = await doctorService.deleteDoctorById(adminUser.getRole(), 1);

    // then
    expect(mockDoctorDbGetDoctorById).toHaveBeenCalledTimes(1);
    expect(mockDoctorDbDeleteDoctorById).toHaveBeenCalledTimes(1);
    expect(result).toEqual(doctor);
});

test('given: a non-admin user, when: deleteDoctorById is called, then: error is thrown', async () => {
    // given
    doctorDb.getDoctorById = mockDoctorDbGetDoctorById.mockResolvedValue(doctor);

    // when + then
    await expect(doctorService.deleteDoctorById(doctorUser.getRole(), 1)).rejects.toThrow(
        new UnauthorizedError("credentials_required", {
            message: "You are not authorized to access this resource."
        })
    );
    expect(mockDoctorDbGetDoctorById).toHaveBeenCalledTimes(0);
    expect(mockDoctorDbDeleteDoctorById).toHaveBeenCalledTimes(0);
});

test('given: a non-existent doctor, when: deleteDoctorById is called, then: error is thrown', async () => {
    // given
    doctorDb.getDoctorById = mockDoctorDbGetDoctorById.mockResolvedValue(null);

    // when + then
    await expect(doctorService.deleteDoctorById(adminUser.getRole(), 999)).rejects.toThrow("Doctor with id: 999 does not exist.");
    expect(mockDoctorDbGetDoctorById).toHaveBeenCalledTimes(1);
    expect(mockDoctorDbDeleteDoctorById).toHaveBeenCalledTimes(0);
});
