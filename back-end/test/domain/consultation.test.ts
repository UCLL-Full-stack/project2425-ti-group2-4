import { Consultation } from "../../domain/model/consultation";
import { Patient } from "../../domain/model/patient";
import { Doctor } from "../../domain/model/doctor";
import { User } from "../../domain/model/user";
import { Specialisation } from "../../types";

// Global variables to reuse in tests
const user = new User({ username: 'doctorUser', password: 'password', role: 'doctor' });

const doctor = new Doctor({     id: 1,
    user: user,
    name: "Dr. John Doe",
    email: "johndoe@example.com",
    specialisation: "Cardiology" as Specialisation,
    offices: [] });

const patientUser = new User({ username: 'patientUser', password: 'password', role: 'patient' });
const patient = new Patient({
    id: 1,
    user: patientUser,
    name: 'Jane Doe',
    sex: 'Female',
    dateOfBirth: new Date("1980-10-15"),
    age: 43,
    address: '456 Maple St',
    email: 'janedoe@example.com',
    complaints: ['Chest Pain'],
    nationalRegister: 'DEF456'
});
const consultationData = {
    id: 1,
    startDate: new Date("2023-12-01T09:00:00Z"),
    endDate: new Date("2023-12-01T10:00:00Z"),
    name: 'Initial Consultation',
    patient: patient,
    doctors: [doctor]
};

const consultation = new Consultation(consultationData);

test('given: valid values for consultation, when: creating a consultation, then: consultation is created with those values', () => {
    // then
    expect(consultation.getStartDate()).toEqual(new Date("2023-12-01T09:00:00Z"));
    expect(consultation.getEndDate()).toEqual(new Date("2023-12-01T10:00:00Z"));
    expect(consultation.getName()).toEqual('Initial Consultation');
    expect(consultation.getPatient()).toEqual(patient);
    expect(consultation.getDoctors()).toEqual([doctor]);
});

test('given: invalid consultation name, when: creating a consultation, then: throws an error', () => {
    // given
    const invalidConsultationData = { ...consultationData, name: '' };

    // when
    const createConsultation = () => new Consultation(invalidConsultationData);

    // then
    expect(createConsultation).toThrow("Consultation name cannot be empty.");
});

test('given: valid end date, when: updating end date, then: end date is updated successfully', () => {
    // when
    consultation.setEndDate(new Date("2023-12-01T11:00:00Z"));

    // then
    expect(consultation.getEndDate()).toEqual(new Date("2023-12-01T11:00:00Z"));
});

test('given: invalid end date, when: updating end date, then: throws an error', () => {
    // when
    const setEndDate = () => consultation.setEndDate(new Date("2023-11-30T10:00:00Z"));

    // then
    expect(setEndDate).toThrow("End date cannot be earlier than start date.");
});

test('given: valid doctors, when: updating doctors, then: doctors are updated successfully', () => {
    // given
    const anotherDoctor = new Doctor({     id: 2,
        user: user,
        name: "Dr. Jane Doe",
        email: "janedoe@example.com",
        specialisation: "Cardiology" as Specialisation,
        offices: [] });

    // when
    consultation.setDoctors([doctor, anotherDoctor]);

    // then
    expect(consultation.getDoctors()).toEqual([doctor, anotherDoctor]);
});

test('given: no doctors, when: updating doctors, then: throws an error', () => {
    // when
    const setDoctors = () => consultation.setDoctors([]);

    // then
    expect(setDoctors).toThrow("At least one doctor is required.");
});

test('given: valid start date, when: updating start date, then: start date is updated successfully', () => {
    // when
    consultation.setStartDate(new Date("2023-12-01T08:30:00Z"));

    // then
    expect(consultation.getStartDate()).toEqual(new Date("2023-12-01T08:30:00Z"));
});

