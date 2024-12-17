const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const getOffices = async () => {
  return await fetch(`${apiUrl}/offices`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

const OfficeService = {
    getOffices
  };
  
  export default OfficeService;