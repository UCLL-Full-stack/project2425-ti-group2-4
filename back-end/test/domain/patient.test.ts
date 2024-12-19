import { Patient } from "../../domain/model/patient";
import { User } from "../../domain/model/user";

const user = new User({ username: 'username', password: 'password', role: 'admin' });

test('given: valid values for patient, when: creating a patient, then: patient is created with those values', () => {
    // given
    const patientData = {
        id: 1,
        user: user,
        name: 'John Doe',
        sex: 'Male',
        dateOfBirth: new Date("1990-05-15T00:00:00Z"),
        age: 33,
        address: '123 Main St',
        email: 'johndoe@example.com',
        complaints: ['Headache', 'Fever'],
        nationalRegister: 'ABC123'
    };

    // when
    const patient = new Patient(patientData);

    // then
    expect(patient.getName()).toEqual('John Doe');
    expect(patient.getUser()).toEqual(user);
    expect(patient.getSex()).toEqual('Male');
    expect(patient.getDateOfBirth()).toEqual(new Date("1990-05-15T00:00:00Z"));
    expect(patient.getAge()).toEqual(33);
    expect(patient.getAddress()).toEqual('123 Main St');
    expect(patient.getEmail()).toEqual('johndoe@example.com');
    expect(patient.getComplaints()).toEqual(['Headache', 'Fever']);
    expect(patient.getNationalRegister()).toEqual('ABC123');
});

test('given: invalid values for patient, when: creating a patient, then: patient is not created and throws an error', () => {
    // given
    const patientData = {
        id: 1,
        user: user,
        name: '',
        sex: 'Male',
        dateOfBirth: new Date('1990-01-01'),
        age: 33,
        address: '123 Main St',
        email: 'johndoe@example.com',
        complaints: ['Headache', 'Fever'],
        nationalRegister: 'ABC123'
    };

    // when
    const createPatient = () => { new Patient(patientData); };

    // then
    expect(createPatient).toThrow("Patient details cannot be empty")
});

test('given: valid updates for patient, when: updating patient details, then: details are updated successfully', () => {
    // given
    const patient = new Patient({
        id: 1,
        user: user,
        name: 'John Doe',
        sex: 'Male',
        dateOfBirth: new Date('1990-01-01'),
        age: 33,
        address: '123 Main St',
        email: 'johndoe@example.com',
        complaints: ['Headache', 'Fever'],
        nationalRegister: 'ABC123'
    });

    // when
    patient.setName('Jane Doe');
    patient.setEmail('janedoe@example.com');

    // then
    expect(patient.getName()).toEqual('Jane Doe');
    expect(patient.getEmail()).toEqual('janedoe@example.com');
});

test('given: valid complaints, when: updating complaints for patient, then: complaints are updated successfully', () => {
    // given
    const patient = new Patient({
        id: 1,
        user: user,
        name: 'John Doe',
        sex: 'Male',
        dateOfBirth: new Date('1990-01-01'),
        age: 33,
        address: '123 Main St',
        email: 'johndoe@example.com',
        complaints: ['Headache'],
        nationalRegister: 'ABC123'
    });

    // when
    patient.setComplaints(['Headache', 'Cough']);

    // then
    expect(patient.getComplaints()).toEqual(['Headache', 'Cough']);
});

