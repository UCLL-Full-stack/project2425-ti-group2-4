import { Patient as PatientPrisma, User as UserPrisma} from "@prisma/client";
import { Consultation } from "./consultation";
import { PatientInput } from "../../types";
import { User } from './user'
export class Patient {

    readonly id?: number;
    private user: User;
    private name: string;
    private sex: string;
    private dateOfBirth: Date;
    private age: number;
    private address: string;
    private email: string;
    private complaints: string[];
    private nationalRegister: string;

    constructor (patient: {id?: number; user: User; name: string; sex: string; dateOfBirth: Date; age: number; address: string; email: string; complaints: string[]; nationalRegister: string;}) {
        this.validate(patient);
        this.id = patient.id;
        this.user = patient.user;
        this.name = patient.name;
        this.sex = patient.sex;
        this.dateOfBirth = patient.dateOfBirth;
        this.age = patient.age;
        this.address = patient.address;
        this.email = patient.email;
        this.complaints = patient.complaints;
        this.nationalRegister = patient.nationalRegister;
    }


    validate(patient: {id?: number; user: User; name: string; sex: string; dateOfBirth: Date; age: number; address: string; email: string; complaints: string[]; nationalRegister: string;}) {
        if (patient.name.trim() == "" || patient.sex.trim() == "" || patient.address.trim() == "" || patient.email.trim() == "" || patient.nationalRegister.trim() == "")
            throw new Error("Patient details cannot be empty")
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(patient.email)) {
            throw new Error("Invalid email format.");
        }
    }

    getName(): string {
        return this.name;
    }

    getUser(): User {
        return this.user;
    }

    getSex(): string {
        return this.sex;
    }

    getDateOfBirth(): Date {
        return this.dateOfBirth;
    }

    getAge(): number {
        return this.age;
    }

    getAddress(): string {
        return this.address;
    }

    getEmail(): string {
        return this.email;
    }

    getComplaints(): string[] {
        return this.complaints;
    }

    getNationalRegister(): string {
        return this.nationalRegister;
    }

    setName(name: string) {
        this.name = name;
    }

    setUser(user: User) {
        this.user = user;
    }

    setSex(sex: string){
        this.sex = sex;
    }

    setDateOfBirth(dateOfBirth: Date){
        this.dateOfBirth = dateOfBirth;
    }

    setAge(age: number){
        this.age = age;
    }

    setAddress(address: string){
        this.address = address;
    }

    setEmail(email: string){
        this.email = email;
    }

    setComplaints(complaints: string[]){
        this.complaints = complaints;
    }

    setNationalRegister(nationalRegister: string){
        this.nationalRegister = nationalRegister;
    }

    // toObject(): PatientInput {
    //     return {
    //         name: this.name,
    //         user: this.user,
    //         sex: this.sex,
    //         dateOfBirth: this.dateOfBirth,
    //         age: this.age,
    //         address: this.address,
    //         email: this.email,
    //         complaints: this.complaints,
    //         nationalRegister: this.nationalRegister,
    //     };
    // }

    static from({
        id,
        name,
        user,
        sex,
        dateOfBirth,
        age,
        address,
        email,
        complaints,
        nationalRegister
    }: PatientPrisma & {user: UserPrisma}) {
        return new Patient({
            id,
            name,
            user: User.from(user),
            sex,
            dateOfBirth,
            age,
            address,
            email,
            complaints,
            nationalRegister
        })
    }

}