import { Doctor } from "./doctor";
import { Consultation as ConsultationPrisma } from "@prisma/client";
import { Patient } from "./patient";

export class Consultation {

    readonly id?: number;
    private startDate: Date;
    private endDate: Date;
    private name: string;
    private patient: Patient;
    private doctors: Doctor[];

    constructor(consultation: { id?: number; startDate: Date; endDate: Date; name: string; patient: Patient; doctors: Doctor[]; }) {
        this.id = consultation.id;
        this.startDate = consultation.startDate;
        this.endDate = consultation.endDate;
        this.name = consultation.name;
        this.patient = consultation.patient;
        this.doctors = consultation.doctors;
    }

    // Getters
    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date {
        return this.endDate;
    }

    getName(): string {
        return this.name;
    }

    getPatient(): Patient {
        return this.patient;
    }

    getDoctors(): Doctor[] {
        return this.doctors;
    }

    // Setters with validation
    setStartDate(value: Date) {
        if (value > this.endDate) {
            throw new Error("Start date cannot be later than end date.");
        }
        if (!this.isSameDay(value, this.endDate)) {
            throw new Error("Consultation must start and end on the same day.");
        }
        this.startDate = value;
    }

    setEndDate(value: Date) {
        if (value < this.startDate) {
            throw new Error("End date cannot be earlier than start date.");
        }
        if (!this.isSameDay(this.startDate, value)) {
            throw new Error("Consultation must start and end on the same day.");
        }
        this.endDate = value;
    }

    setName(value: string) {
        if (value.trim() === "") {
            throw new Error("Consultation name cannot be empty.");
        }
        this.name = value;
    }

    setPatient(value: Patient) {
        if (!value) {
            throw new Error("Patient is required.");
        }
        this.patient = value;
    }

    setDoctors(value: Doctor[]) {
        if (!value || value.length === 0) {
            throw new Error("At least one doctor is required.");
        }
        this.doctors = value;
    }

    // Validation method
    validate(consultation: { id?: number; startDate: Date; endDate: Date; name: string; patient: Patient; doctors: Doctor[]; }) {
        if (consultation.name.trim() === "") {
            throw new Error("Consultation name cannot be empty.");
        }
        if (!consultation.patient) {
            throw new Error("Patient information is required.");
        }
        if (!consultation.doctors || consultation.doctors.length === 0) {
            throw new Error("At least one doctor is required.");
        }
    }

    // Helper function to check if two dates are on the same day
    private isSameDay(date1: Date, date2: Date): boolean {
        return date1.getFullYear() === date2.getFullYear() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getDate() === date2.getDate();
    }

    // Static method to create Consultation from Prisma model
    static from({ id, startDate, endDate, name, patient, doctors }: ConsultationPrisma) {
        return new Consultation({
            id,
            startDate,
            endDate,
            name,
            patient,
            doctors
        });
    }
}
