import database from "./databases";
import { Patient } from "../domain/model/patient"

// async function main() {

  
//       await database.patient.create({
//         data: {
//           name: "Jefke Vermeulen",
//           sex: "M",
//           dateOfBirth: new Date("2000-01-01"), 
//           age: 24,
//           address: "Kerkstraat 1",
//           email: "jefkevermeulen@gmail.com",
//           complaints: { set: [] },
//           nationalRegister: "111.11-11.11.11"
//         },
//       });
//     }
    
//     main()
//     .catch((e) => {
//       throw e;
//     })
//     .finally(async () => {
//       await database.$disconnect();
//     });