import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {

  const doctorPassword = await bcrypt.hash("doctor123", 12)
  const doctorUser = await prisma.user.create({
    data: {
      username: 'doctor',
      password: doctorPassword,
      role: 'doctor',
    },
  });

  const patientPassword = await bcrypt.hash("patient123", 12)
  const patientUser = await prisma.user.create({
    data: {
      username: 'patient',
      password: patientPassword,
      role: 'patient',
    },
  });

  const adminPassword = await bcrypt.hash("admin123", 12)
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      password: adminPassword,
      role: 'admin',
    },
  });

  const doctor = await prisma.doctor.create({
    data: {
      name: 'Dr. John Doe',
      email: 'dr.johndoe@example.com',
      specialisation: 'General Medicine',
      userId: doctorUser.id,
    },
  });


  const office1 = await prisma.office.create({
    data: {
      name: 'John Doe Clinic',
      address: '123 Main St, Springfield, IL',
      email: 'clinic1@example.com',
      phoneNumber: 1234567890,
      doctors: {
        connect: { id: doctor.id },
      },
    },
  });

  const office2 = await prisma.office.create({
    data: {
      name: 'Jane Doe Clinic',
      address: '100 Main St, Springfield, IL',
      email: 'clinic2@example.com',
      phoneNumber: 1234567891,
      doctors: {
        connect: { id: doctor.id },
      },
    },
  });

  const patient = await prisma.patient.create({
    data: {
      name: 'John Patient',
      sex: 'Male',
      dateOfBirth: new Date('1990-05-15'),
      age: 34,
      address: '456 Elm St, Springfield, IL',
      email: 'johnpatient@example.com',
      complaints: ['Headache', 'Fatigue'],
      nationalRegister: 'XYZ123456',
      userId: patientUser.id,
    },
  });

  const consultation = await prisma.consultation.create({
    data: {
      startDate: new Date(),
      endDate: new Date(),
      name: 'General Check-up',
      patientId: patient.id,
      doctors: {
        connect: { id: doctor.id },
      },
    },
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
