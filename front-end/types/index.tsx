export type StatusMessage = {
    message: string;
    type: "error" | "succes";
};

export type Patient = {
    id?: number
    name: string;
    sex: string;
    dateOfBirth: Date;
    age: number;
    address: string;
    email: string;
    complaints: string[];
    nationalRegister: string;
    user?: User;
}

export type Doctor = {
    id?: number;
    name: string;
    email: string;
    specialisation: string;
    offices: Office;
}

export type User = {
    id?: number;
    token?: string;
    username?: string;
    password?: string;
    role?: string;
}

export type Office = {
    id?: number;
    name: string;
    address: string;
    email: string;
    openingHours: Date[];
    phoneNumber: number;
}

export type Consultation = {
    id?: number;
    startDate: Date;
    endDate: Date;
    name: string;
    patient: Patient;
    doctors: Doctor[];
}