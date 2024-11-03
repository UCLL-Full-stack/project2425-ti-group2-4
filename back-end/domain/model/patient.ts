import { Patient as PatientPrisma} from "@prisma/client";
import { Consultation } from "./consultation";
import { PatientInput } from "../../types";

export class Patient {

    readonly id?: number;
    private name: string;
    private sex: string;
    private dateOfBirth: Date;
    private age: number;
    private address: string;
    private email: string;
    private complaints: string[];
    private nationalRegister: string;

    constructor (patient: {id?: number; name: string; sex: string; dateOfBirth: Date; age: number; address: string; email: string; complaints: string[]; nationalRegister: string;}) {
        this.id = patient.id;
        this.name = patient.name;
        this.sex = patient.sex;
        this.dateOfBirth = patient.dateOfBirth;
        this.age = patient.age;
        this.address = patient.address;
        this.email = patient.email;
        this.complaints = patient.complaints;
        this.nationalRegister = patient.nationalRegister;
    }


    validate(patient: {id?: number; name: string; sex: string; dateOfBirth: Date; age: number; address: string; email: string; complaints: string[]; nationalRegister: string;}) {
        if (patient.name.trim() == "")
            throw new Error("Patient name cannot be empty")
    }


    getName(): string {
        return this.name;
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

    toObject(): PatientInput {
        return {
            name: this.name,
            sex: this.sex,
            dateOfBirth: this.dateOfBirth,
            age: this.age,
            address: this.address,
            email: this.email,
            complaints: this.complaints,
            nationalRegister: this.nationalRegister,
        };
    }

    static from({
        id,
        name,
        sex,
        dateOfBirth,
        age,
        address,
        email,
        complaints,
        nationalRegister
    }: PatientPrisma) {
        return new Patient({
            id,
            name,
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