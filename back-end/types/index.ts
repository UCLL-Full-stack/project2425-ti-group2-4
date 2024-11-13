import { Office } from "../domain/model/office";

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

type DoctorInput = {
  id?: number
  name: string;
  email: string;
  specialisation: Specialisation;
  offices: Office[];
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
    Specialisation,
    PatientInput,
    DoctorInput
}