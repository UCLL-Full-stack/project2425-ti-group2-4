import { DoctorInput, Specialisation } from "../../types";
import { Office } from "./office";
import {Doctor as DoctorPrisma, Office as OfficePrisma} from '@prisma/client'

export class Doctor {

    readonly id?: number;
    private name: string;
    private email: string;
    private specialisation: Specialisation;
    private offices: Office[];


    constructor(doctor: { id?: number; name: string; email: string; specialisation: Specialisation; offices: Office[] }) {
        this.id = doctor.id;
        this.name = doctor.name;
        this.email = doctor.email;
        this.specialisation = doctor.specialisation;
        this.offices = doctor.offices;
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getSpecialisation(): Specialisation {
        return this.specialisation;
    }

    getOffices(): Office[] {
        return this.offices;
    }

    setName(name: string) {
        if (name.trim().length < 3) {
            throw new Error("Name must be at least 3 characters long.");
        }
        this.name = name;
    }

    setEmail(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error("Invalid email format.");
        }
        this.email = email;
    }

    setSpecialisation(specialisation: Specialisation) {
        this.specialisation = specialisation;
    }

    setOffices(offices: Office[]) {
        this.offices = offices;
    }

    addOffice(office: Office): void {
        this.offices.push(office);
    }

    removeOffice(office: Office): void {
        const index = this.offices.indexOf(office);
        if (index > -1) {
            this.offices.splice(index, 1);
        } else {
            throw new Error("Office not found.");
        }
    }

    validate(doctor: { id?: number; name: string; email: string; specialisation: Specialisation; offices?: Office[] }) {
        if (doctor.name.trim().length < 3) {
            throw new Error("Doctor's name must be at least 3 characters long.");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(doctor.email)) {
            throw new Error("Invalid email format.");
        }
    }

    toObject(): DoctorInput {
        return {
            name: this.name,
            email: this.email,
            specialisation: this.specialisation,
            offices: this.offices
        };
    }

    static from({
        id, 
        name, 
        email, 
        specialisation, 
        offices
    }: DoctorPrisma & {offices?: OfficePrisma[]}) {
        return new Doctor({
            id,
            name,
            email,
            specialisation: specialisation as Specialisation,
            offices: offices ? offices?.map((office) => Office.from(office)) : []
        })
    }
}