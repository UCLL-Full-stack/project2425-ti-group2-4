/*
  Warnings:

  - The `openingHours` column on the `Office` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Made the column `name` on table `Office` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Office" ALTER COLUMN "name" SET NOT NULL,
DROP COLUMN "openingHours",
ADD COLUMN     "openingHours" TIMESTAMP(3)[];
