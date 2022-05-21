/*
  Warnings:

  - You are about to drop the column `documentId` on the `Pdf` table. All the data in the column will be lost.
  - You are about to drop the column `author` on the `TextDoc` table. All the data in the column will be lost.
  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `userId` on table `Folder` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `userId` to the `TextDoc` table without a default value. This is not possible if the table is not empty.
  - Made the column `textDocId` on table `TextTag` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_textDocId_fkey";

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_userId_fkey";

-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_userId_fkey";

-- DropForeignKey
ALTER TABLE "Pdf" DROP CONSTRAINT "Pdf_documentId_fkey";

-- DropForeignKey
ALTER TABLE "TextTag" DROP CONSTRAINT "TextTag_textDocId_fkey";

-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "textDocId" TEXT,
ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Pdf" DROP COLUMN "documentId",
ADD COLUMN     "textDocId" TEXT;

-- AlterTable
ALTER TABLE "TextDoc" DROP COLUMN "author",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TextTag" ALTER COLUMN "textDocId" SET NOT NULL;

-- DropTable
DROP TABLE "Document";

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_textDocId_fkey" FOREIGN KEY ("textDocId") REFERENCES "TextDoc"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextDoc" ADD CONSTRAINT "TextDoc_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TextTag" ADD CONSTRAINT "TextTag_textDocId_fkey" FOREIGN KEY ("textDocId") REFERENCES "TextDoc"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pdf" ADD CONSTRAINT "Pdf_textDocId_fkey" FOREIGN KEY ("textDocId") REFERENCES "TextDoc"("id") ON DELETE SET NULL ON UPDATE CASCADE;
