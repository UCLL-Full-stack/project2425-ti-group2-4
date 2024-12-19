import database from "./databases";
import { Prisma } from "@prisma/client";

async function main() {
  // Test data for patients
  const patients: Prisma.PatientCreateInput[] = [
    {
      name: "Jefke Vermeulen",
      sex: "M",
      dateOfBirth: new Date("2000-01-01"),
      age: 24,
      address: "Kerkstraat 1",
      email: "jefkevermeulen@gmail.com",
      complaints: {
        create: [
          { description: "Back pain" },
          { description: "Neck stiffness" },
        ],
      },
      nationalRegister: "111.11-11.11.11",
      photoUrl: "https://example.com/photos/jefke.jpg", // No error now
      consultations: {
        create: [
          { datetime: new Date("2024-12-12T14:30:00Z"), provider: "Dr. Smith" },
          { datetime: new Date("2024-11-20T10:00:00Z"), provider: "Dr. Brown" },
        ],
      },
      medicalAlerts: { create: [{ alert: "Allergy: Penicillin" }] }, // Adjusted to match the model
      insurance: {
        create: { primary: "HealthCare Plan A", secondary: "DentalCare Plan B" },
      },
    },
    {
        name: "Sofie Janssen",
        sex: "F",
        dateOfBirth: new Date("1985-05-15"),
        age: 39,
        address: "Lindelaan 22",
        email: "sofie.janssen@hotmail.com",
        complaints: { set: ["Chronic migraines"] },
        nationalRegister: "222.22-22.22.22",
        // photoUrl: "https://example.com/photos/sofie.jpg",
        consultations: {
            create: [
                {
                  datetime: new Date("2024-11-15T09:00:00Z"),
                  provider: "Dr. Cooper",
                },
            ] as unknown as Prisma.ConsultationCreateWithoutPatientInput[], // Explicit cast 
        },
        medicalAlerts: { set: ["History of hypertension"] },
        insurance: {
            create: {
                primary: "Standard Health Plan",
            },
        },
    },
      {
        name: "Tom Peeters",
        sex: "M",
        dateOfBirth: new Date("1975-03-20"),
        age: 49,
        address: "Stationsstraat 5",
        email: "tom.peeters@gmail.com",
        complaints: { set: ["Knee pain after surgery"] },
        nationalRegister: "333.33-33.33.33",
        photoUrl: "https://example.com/photos/tom.jpg",
        consultations: {
          create: [
            {
              datetime: new Date("2024-11-30T16:00:00Z"),
              provider: "Dr. Green",
            },
          ] as unknown as Prisma.ConsultationCreateWithoutPatientInput[], // Explicit cast 
        },
        medicalAlerts: { set: [] },
        insurance: {
          create: {
            primary: "Premium Health Insurance",
          },
        },
      },
    ];

  // Seed patients into the database
  for (const patient of patients) {
      await database.patient.create({ data: patient });
  }

  console.log("Seed data successfully added!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await database.$disconnect();
    });
