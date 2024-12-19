import { DoctorInput, Specialisation } from "../../types";
import { Office } from "./office";
import {Doctor as DoctorPrisma, Office as OfficePrisma, User as UserPrisma} from '@prisma/client'
import { User } from "./user";

export class Doctor {

    readonly id?: number;
    private user: User;
    private name: string;
    private email: string;
    private specialisation: Specialisation;
    private offices: Office[];


    constructor(doctor: { id?: number; user: User; name: string; email: string; specialisation: Specialisation; offices: Office[] }) {
        this.validate(doctor);
        this.id = doctor.id;
        this.user = doctor.user;
        this.name = doctor.name;
        this.email = doctor.email;
        this.specialisation = doctor.specialisation;
        this.offices = doctor.offices;
    }

    getName(): string {
        return this.name;
    }

    getUser(): User {
        return this.user;
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

    setUser(user: User) {
        this.user = user;
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

    validate(doctor: { id?: number; user: User; name: string; email: string; specialisation: Specialisation; offices?: Office[] }) {
        if (doctor.name.trim() == "" || doctor.specialisation.trim() == "") {
            throw new Error("doctor details cannot be empty");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(doctor.email)) {
            throw new Error("Invalid email format.");
        }
    }

    // toObject(): DoctorInput {
    //     return {
    //         name: this.name,
    //         email: this.email,
    //         specialisation: this.specialisation,
    //         offices: this.offices
    //     };
    // }

    static from({
        id,
        user, 
        name, 
        email, 
        specialisation, 
        offices
    }: DoctorPrisma & {user: UserPrisma; offices?: OfficePrisma[]}) {
        return new Doctor({
            id,
            user: User.from(user),
            name,
            email,
            specialisation: specialisation as Specialisation,
            offices: offices ? offices?.map((office) => Office.from(office)) : []
        })
    }
}