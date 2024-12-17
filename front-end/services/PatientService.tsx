const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getPatients = async () => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser") ?? '{}')?.token;
  const response = await fetch(`${apiUrl}/patients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }
  return response; 
};

const getPatientById = async (id: number) => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser") ?? '{}')?.token;
  return fetch(`${apiUrl}/patients/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const PatientService = {
  getPatients,
  getPatientById,
};

export default PatientService;
