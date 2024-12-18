const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getDoctors = async () => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser") ?? '{}')?.token;
  const response = await fetch(`${apiUrl}/doctors`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Doctors");
  }
  return response; 
};

const DoctorService = {
    getDoctors
  };
  
  export default DoctorService;