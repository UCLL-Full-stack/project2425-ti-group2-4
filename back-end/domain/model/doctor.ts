
export class Doctor {
    readonly id?: number;
    readonly name: string;
    readonly email: string;
    readonly specialisation: string;
    
    constructor (doctor: {id?: number; name: string; email: string; specialisation: string;}) {
        this.id = doctor.id;
        this.name = doctor.name;
        this.email = doctor.email;
        this.specialisation = doctor.specialisation;
    }


}