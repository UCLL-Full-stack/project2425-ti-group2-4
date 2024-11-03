export type Patient = {
    id?: number;
    name: string;
    sex: string;
    dateOfBirth: Date;
    age: number;
    address: string;
    email: string;
    complaints: string[];
    nationalRegister: string;
};

const patients: Patient[] = [
    {
        id: 1,
        name: 'John Smith',
        sex: 'Male',
        dateOfBirth: new Date('1993-04-15'), // YYYY-MM-DD format
        age: 30,
        address: '123 Main St, Anytown, AT 12345',
        email: 'john.smith@ucll.be',
        complaints: ['Headache', 'Nausea'],
        nationalRegister: '1234567890',
    },
    {
        id: 2,
        name: 'Jane Doe',
        sex: 'Female',
        dateOfBirth: new Date('1995-07-20'),
        age: 28,
        address: '456 Elm St, Othertown, OT 67890',
        email: 'jane.doe@ucll.be',
        complaints: ['Allergy to penicillin'],
        nationalRegister: '0987654321',
    },
    {
        id: 3,
        name: 'Alex Johnson',
        sex: 'Non-binary',
        dateOfBirth: new Date('1978-11-10'),
        age: 45,
        address: '789 Maple Ave, Sometown, ST 11223',
        email: 'alex.johnson@ucll.be',
        complaints: ['Diabetes', 'Frequent fatigue'],
        nationalRegister: '1122334455',
    },
];

const getAllPatients = (): Patient[] => patients;

const getPatientById = ({ id }: { id: number }): Patient | null => {
    return patients.find((patient) => patient.id === id) || null;
};

export default {
    getAllPatients,
    getPatientById,
};
