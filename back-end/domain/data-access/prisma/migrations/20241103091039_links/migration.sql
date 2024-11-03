-- CreateTable
CREATE TABLE "Office" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "openingHours" JSONB NOT NULL,
    "phoneNumber" INTEGER NOT NULL,

    CONSTRAINT "Office_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Doctor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DoctorToOffice" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ConsultationToDoctor" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DoctorToOffice_AB_unique" ON "_DoctorToOffice"("A", "B");

-- CreateIndex
CREATE INDEX "_DoctorToOffice_B_index" ON "_DoctorToOffice"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ConsultationToDoctor_AB_unique" ON "_ConsultationToDoctor"("A", "B");

-- CreateIndex
CREATE INDEX "_ConsultationToDoctor_B_index" ON "_ConsultationToDoctor"("B");

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoctorToOffice" ADD CONSTRAINT "_DoctorToOffice_A_fkey" FOREIGN KEY ("A") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DoctorToOffice" ADD CONSTRAINT "_DoctorToOffice_B_fkey" FOREIGN KEY ("B") REFERENCES "Office"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConsultationToDoctor" ADD CONSTRAINT "_ConsultationToDoctor_A_fkey" FOREIGN KEY ("A") REFERENCES "Consultation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConsultationToDoctor" ADD CONSTRAINT "_ConsultationToDoctor_B_fkey" FOREIGN KEY ("B") REFERENCES "Doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
