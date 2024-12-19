/*
  Warnings:

  - You are about to drop the column `date` on the `Consultation` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `Consultation` table. All the data in the column will be lost.
  - Added the required column `datetime` to the `Consultation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Consultation" DROP COLUMN "date",
DROP COLUMN "time",
ADD COLUMN     "datetime" TIMESTAMP(3) NOT NULL;
