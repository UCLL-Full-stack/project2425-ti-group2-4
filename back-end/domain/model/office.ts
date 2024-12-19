import { Office as OfficePrisma} from "@prisma/client";
import { OfficeInput } from "../../types";

export class Office {
    readonly id?: number;
    private name: string;
    private address: string;
    private email: string;
    private openingHours: Date[];
    private phoneNumber: number;


    constructor(office: { id?: number; name: string; address: string; email: string; openingHours: Date[]; phoneNumber: number }) {
        this.validate(office);
        this.id = office.id;
        this.name = office.name;
        this.address = office.address;
        this.email = office.email;
        this.openingHours = office.openingHours;
        this.phoneNumber = office.phoneNumber;
    }

    validate(office: {id?:  number, name: string; address: string; email: string; openingHours: Date[]; phoneNumber: number}) {
        if (office.name.trim() == "" || office.address.trim() == "") {
            throw new Error("office details cannot be empty");
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(office.email)) {
            throw new Error("Invalid email format.");
        }
    }


    getName(): string {
        return this.name;
    }

    getAddress(): string {
        return this.address;
    }

    getEmail(): string {
        return this.email;
    }

    getOpeningHours(): Date[] {
        return this.openingHours;
    }

    getPhoneNumber(): number {
        return this.phoneNumber;
    }

    setName(name: string) {
        this.name = name;
    }

    setAddress(value: string) {
        this.address = value;
    }

    setEmail(value: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error("Invalid email format.");
        }
        this.email = value;
    }

    setOpeningHours(value: Date[]) {
        this.openingHours = value;
    }

    setPhoneNumber(value: number) {
        this.phoneNumber = value;
    }

    toObject(): OfficeInput {
        return {
            name: this.name,
            address: this.address,
            email: this.email,
            openingHours: this.openingHours,
            phoneNumber: this.phoneNumber
        };
    }

    static from({ 
        id,
        name, 
        address,
        email,
        openingHours, 
        phoneNumber
    }: OfficePrisma) {
        return new Office({
        id,
        name, 
        address,
        email,
        openingHours, 
        phoneNumber
        });
    }
}