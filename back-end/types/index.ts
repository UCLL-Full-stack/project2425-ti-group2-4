import { User } from "@prisma/client";
import { Doctor } from "../domain/model/doctor";
import { Office } from "../domain/model/office";
import { Patient } from "../domain/model/patient";

type Role = 'admin' | 'patient' | 'doctor' | 'guest';

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
   user: UserInput;
}

type DoctorInput = {
  id?: number
  name: string;
  email: string;
  specialisation: Specialisation;
  offices: Office[];
  user: UserInput;
}

type OfficeInput = {
  id?: number
  name: string;
  address: string;
  email: string;
  openingHours: Date[];
  phoneNumber: number;
}

type ConsultationInput = {
  startDate: Date;
  endDate: Date;
  name: string;
  patientId: number;
  doctorIds: number[]; 
};

type UserInput = {
  id?: number;
  username: string;
  password: string;
  role: Role;
}

type AuthenticationResponse = {
  token: string;
  username: string;
  role: string;
}

type Specialisation = 
  | 'General Practitioner'
  | 'Cardiologist'
  | 'Dermatologist'
  | 'Endocrinologist'
  | 'Gastroenterologist'
  | 'Neurologist'
  | 'Oncologist'
  | 'Pediatrician'
  | 'Psychiatrist'
  | 'Pulmonologist'
  | 'Rheumatologist'
  | 'Surgeon'
  | 'Obstetrician/Gynecologist'
  | 'Ophthalmologist'
  | 'Otolaryngologist'
  | 'Urologist'
  | 'Hematologist'
  | 'Radiologist'
  | 'Pathologist'
  | 'Physiotherapist'
  | 'Occupational Therapist'
  | 'Chiropractor'
  | 'Speech-Language Pathologist'
  | 'Audiologist'
  | 'Dietitian'
  | 'Nutritionist'
  | 'Podiatrist'
  | 'Orthoptist'
  | 'Respiratory Therapist'
  | 'Massage Therapist'
  | 'Exercise Physiologist'
  | 'Prosthetist'
  | 'Orthotist'
  | 'Psychologist'
  | 'Therapist'
  | 'Dentist'
  | 'Dental Hygienist'
  | 'Orthodontist'
  | 'Periodontist'
  | 'Oral Surgeon'
  | 'Endodontist'
  | 'Acupuncturist'
  | 'Naturopath'
  | 'Herbalist'
  | 'Homeopath'


export {
    Role,
    Specialisation,
    PatientInput,
    DoctorInput,
    OfficeInput,
    ConsultationInput,
    UserInput,
    AuthenticationResponse
}