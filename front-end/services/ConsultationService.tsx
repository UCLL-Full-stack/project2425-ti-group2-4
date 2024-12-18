import { Doctor, Patient } from "types";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getConsultations = async () => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser") ?? '{}')?.token;
  return await fetch(`${apiUrl}/consultations`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

const addConsultation = async (startDate: Date, endDate: Date, name: string, patient: Patient, doctors: Doctor[]) => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser") ?? '{}')?.token;
  return await fetch(`${apiUrl}/consultations/add`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({startDate, endDate, name, patient, doctors})
  })
}

const ConsultationService = {
    getConsultations,
    addConsultation
  };
  
  export default ConsultationService;