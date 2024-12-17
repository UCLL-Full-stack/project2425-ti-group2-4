const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getOffices = async () => {
  const token = JSON.parse(sessionStorage.getItem("loggedInUser") ?? '{}')?.token;
  return await fetch(`${apiUrl}/offices`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

const OfficeService = {
    getOffices
  };
  
  export default OfficeService;