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

export type User = {
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
