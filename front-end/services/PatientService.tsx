
const getPatients = async () => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + "/patients", {
        method: "GET", 
        headers: {
            "Content-Type": "application/json", 
        }
    })
}

const PatientService = {
    getPatients
}

export default PatientService;