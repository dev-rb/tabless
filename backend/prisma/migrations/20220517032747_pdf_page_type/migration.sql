/*
  Warnings:

  - The `initialPage` column on the `Pdf` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Pdf" DROP COLUMN "initialPage",
ADD COLUMN     "initialPage" INTEGER;
