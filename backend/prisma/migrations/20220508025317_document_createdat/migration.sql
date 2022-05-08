/*
  Warnings:

  - You are about to drop the column `createdAt` on the `TextDoc` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TextDoc" DROP COLUMN "createdAt";
