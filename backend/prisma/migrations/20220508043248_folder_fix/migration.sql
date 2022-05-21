/*
  Warnings:

  - You are about to drop the column `textDocId` on the `Folder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_textDocId_fkey";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "textDocId";

-- CreateTable
CREATE TABLE "_FolderToTextDoc" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FolderToTextDoc_AB_unique" ON "_FolderToTextDoc"("A", "B");

-- CreateIndex
CREATE INDEX "_FolderToTextDoc_B_index" ON "_FolderToTextDoc"("B");

-- AddForeignKey
ALTER TABLE "_FolderToTextDoc" ADD CONSTRAINT "_FolderToTextDoc_A_fkey" FOREIGN KEY ("A") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FolderToTextDoc" ADD CONSTRAINT "_FolderToTextDoc_B_fkey" FOREIGN KEY ("B") REFERENCES "TextDoc"("id") ON DELETE CASCADE ON UPDATE CASCADE;
