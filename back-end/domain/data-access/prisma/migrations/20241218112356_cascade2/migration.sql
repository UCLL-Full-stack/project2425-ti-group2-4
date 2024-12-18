-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_userId_fkey";

-- AlterTable
ALTER TABLE "_ConsultationToDoctor" ADD CONSTRAINT "_ConsultationToDoctor_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_ConsultationToDoctor_AB_unique";

-- AlterTable
ALTER TABLE "_DoctorToOffice" ADD CONSTRAINT "_DoctorToOffice_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_DoctorToOffice_AB_unique";

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
