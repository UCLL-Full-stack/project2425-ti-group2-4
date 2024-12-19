/*
  Warnings:

  - You are about to drop the column `endDate` on the `Consultation` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Consultation` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Consultation` table. All the data in the column will be lost.
  - You are about to drop the column `openingHours` on the `Office` table. All the data in the column will be lost.
  - You are about to drop the column `complaints` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the `_ConsultationToDoctor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `Consultation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctorId` to the `Consultation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `Consultation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Consultation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_ConsultationToDoctor" DROP CONSTRAINT "_ConsultationToDoctor_A_fkey";

-- DropForeignKey
ALTER TABLE "_ConsultationToDoctor" DROP CONSTRAINT "_ConsultationToDoctor_B_fkey";

-- AlterTable
ALTER TABLE "Consultation" DROP COLUMN "endDate",
DROP COLUMN "name",
DROP COLUMN "startDate",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "doctorId" INTEGER NOT NULL,
ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "time" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Office" DROP COLUMN "openingHours";

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "complaints",
ADD COLUMN     "photoUrl" TEXT;

-- DropTable
DROP TABLE "_ConsultationToDoctor";

-- CreateTable
CREATE TABLE "Complaint" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalAlert" (
    "id" SERIAL NOT NULL,
    "alert" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "MedicalAlert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OpeningHour" (
    "id" SERIAL NOT NULL,
    "dayOfWeek" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "officeId" INTEGER NOT NULL,

    CONSTRAINT "OpeningHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insurance" (
    "id" SERIAL NOT NULL,
    "primary" TEXT NOT NULL,
    "secondary" TEXT,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Insurance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Insurance_patientId_key" ON "Insurance"("patientId");

-- AddForeignKey
ALTER TABLE "Complaint" ADD CONSTRAINT "Complaint_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicalAlert" ADD CONSTRAINT "MedicalAlert_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OpeningHour" ADD CONSTRAINT "OpeningHour_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "Office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insurance" ADD CONSTRAINT "Insurance_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
