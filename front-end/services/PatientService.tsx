const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getAllPatients = async () => {
  const response = await fetch(`${apiUrl}/patients`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }

  return response.json();
};

const getPatientById = async (id: number) => {
  const response = await fetch(`${apiUrl}/patients/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch patient with ID: ${id}`);
  }

  return response.json();
};

const PatientService = {
  getAllPatients,
  getPatientById,
};

export default PatientService;
