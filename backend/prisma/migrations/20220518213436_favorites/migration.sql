-- AlterTable
ALTER TABLE "Folder" ADD COLUMN     "favorite" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "TextDoc" ADD COLUMN     "favorite" BOOLEAN NOT NULL DEFAULT false;
