import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {

  await prisma.user.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.consultation.deleteMany();
  await prisma.office.deleteMany();

  const doctorPassword = await bcrypt.hash("doctor123", 12)
  const doctorUser1 = await prisma.user.create({
    data: {
      username: 'doctor1',
      password: doctorPassword,
      role: 'doctor',
    },
  });

  const doctorUser2 = await prisma.user.create({
    data: {
      username: 'doctor2',
      password: doctorPassword,
      role: 'doctor',
    },
  });

  const patientPassword = await bcrypt.hash("patient123", 12)
  const patientUser1 = await prisma.user.create({
    data: {
      username: 'patient1',
      password: patientPassword,
      role: 'patient',
    },
  });

  const patientUser2 = await prisma.user.create({
    data: {
      username: 'patient2',
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

  const doctor1 = await prisma.doctor.create({
    data: {
      name: 'Dr. John Doe',
      email: 'dr.johndoe@example.com',
      specialisation: 'General Medicine',
      userId: doctorUser1.id,
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      name: 'Dr. Jane Doe',
      email: 'dr.janedoe@example.com',
      specialisation: 'General Medicine',
      userId: doctorUser2.id,
    },
  });

  const office1 = await prisma.office.create({
    data: {
      name: 'John Doe Clinic',
      address: '123 Main St, Springfield, IL',
      email: 'clinic1@example.com',
      phoneNumber: 1234567890,
      doctors: {
        connect: { id: doctor1.id },
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
        connect: { id: doctor1.id },
      },
    },
  });

  const patient1 = await prisma.patient.create({
    data: {
      name: 'John Patient',
      sex: 'Male',
      dateOfBirth: new Date('1990-05-15'),
      age: 34,
      address: '456 Elm St, Springfield, IL',
      email: 'johnpatient@example.com',
      complaints: ['Headache', 'Fatigue'],
      nationalRegister: 'XYZ123456',
      userId: patientUser1.id,
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      name: 'Jane Patient',
      sex: 'Female',
      dateOfBirth: new Date('1991-05-15'),
      age: 33,
      address: '455 Elm St, Springfield, IL',
      email: 'janepatient@example.com',
      complaints: ['Headache', 'Fatigue'],
      nationalRegister: 'XYZ123457',
      userId: patientUser2.id,
    },
  });

  const consultation = await prisma.consultation.create({
    data: {
      startDate: new Date(),
      endDate: new Date(),
      name: 'General Check-up',
      patientId: patient1.id,
      doctors: {
        connect: { id: doctor1.id },
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
