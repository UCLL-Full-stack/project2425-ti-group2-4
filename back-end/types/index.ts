type PatientInput = {
   id?: number
   name: string;
   sex: string;
   dateOfBirth: Date;
   age: number;
   address: string;
   email: string;
   complaints: string[];
   nationalRegister: string;
}

export {
    PatientInput
}