/*
  Warnings:

  - A unique constraint covering the columns `[seedKey]` on the table `Internship` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Internship" ADD COLUMN     "seedKey" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Internship_seedKey_key" ON "Internship"("seedKey");
