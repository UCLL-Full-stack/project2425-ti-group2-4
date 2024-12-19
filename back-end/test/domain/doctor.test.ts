import { Doctor } from "../../domain/model/doctor";
import { Office } from "../../domain/model/office";
import { User } from "../../domain/model/user";
import { Specialisation } from "../../types";


const user = new User({ username: "username", password: "password", role: "admin" });

// Valid values for the Doctor instance
const validDoctorData = {
    id: 1,
    user: user,
    name: "Dr. John Doe",
    email: "johndoe@example.com",
    specialisation: "Cardiology" as Specialisation,
    offices: []
};

test('given: valid values for doctor, when: creating a doctor, then: doctor is created with those values', () => {
    // when
    const doctor = new Doctor(validDoctorData);

    // then
    expect(doctor.getName()).toEqual(validDoctorData.name);
    expect(doctor.getEmail()).toEqual(validDoctorData.email);
    expect(doctor.getSpecialisation()).toEqual(validDoctorData.specialisation);
    expect(doctor.getOffices()).toEqual(validDoctorData.offices);
});

test('given: invalid values for doctor, when: creating a doctor, then: doctor is not created and throws an error', () => {
    // given
    const invalidDoctorData = {
        ...validDoctorData,
        name: "",
        email: "invalidemail",
    };

    // when
    const createDoctor = () => new Doctor(invalidDoctorData);

    // then
    expect(createDoctor).toThrow("doctor details cannot be empty");
});

test('given: valid updates for doctor, when: updating doctor details, then: details are updated successfully', () => {
    // given
    const doctor = new Doctor(validDoctorData);

    // when
    doctor.setName("Dr. Jane Smith");
    doctor.setEmail("janesmith@example.com");

    // then
    expect(doctor.getName()).toEqual("Dr. Jane Smith");
    expect(doctor.getEmail()).toEqual("janesmith@example.com");
});

test('given: invalid email, when: setting email, then: throws an error', () => {
    // given
    const doctor = new Doctor(validDoctorData);

    // when
    const setEmail = () => doctor.setEmail("invalidemail");

    // then
    expect(setEmail).toThrow("Invalid email format.");
});

test('given: valid office, when: adding office to doctor, then: office is added', () => {
    // given
    const doctor = new Doctor(validDoctorData);
    const office = new Office({        
        name: "Main Office",
        address: "123 Main St",
        email: "office@example.com",
        openingHours: [new Date("1990-05-15T00:00:00Z")],
        phoneNumber: 123456789});

    // when
    doctor.addOffice(office);

    // then
    expect(doctor.getOffices()).toContain(office);
});

test('given: office not in doctor, when: removing office, then: throws an error', () => {
    // given
    const doctor = new Doctor(validDoctorData);
    const office = new Office({        
        name: "Main Office",
        address: "123 Main St",
        email: "office@example.com",
        openingHours: [new Date("1990-05-15T00:00:00Z")],
        phoneNumber: 123456789});

    // when
    const removeOffice = () => doctor.removeOffice(office);

    // then
    expect(removeOffice).toThrow("Office not found.");
});
