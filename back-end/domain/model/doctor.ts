import { Specialization } from "../../types";
import { Office } from "./office";

export class Doctor {
    readonly id?: number;
    private name: string;
    private email: string;
    private specialisation: Specialization;
    private offices: Office[];

    constructor(doctor: { id?: number; name: string; email: string; specialisation: Specialization; offices?: Office[] }) {
        this.id = doctor.id;
        this.name = doctor.name;
        this.email = doctor.email;
        this.specialisation = doctor.specialisation;
        this.offices = doctor.offices || [];
    }

    getName(): string {
        return this.name;
    }

    getEmail(): string {
        return this.email;
    }

    getSpecialisation(): Specialization {
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

    setSpecialisation(specialisation: Specialization) {
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

    validate(doctor: { id?: number; name: string; email: string; specialisation: Specialization; offices?: Office[] }) {
        if (doctor.name.trim().length < 3) {
            throw new Error("Doctor's name must be at least 3 characters long.");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(doctor.email)) {
            throw new Error("Invalid email format.");
        }
    }

    static from(doctorData: { id?: number; name: string; email: string; specialisation: Specialization; offices: Office[] }) {
        return new Doctor(doctorData);
    }
}