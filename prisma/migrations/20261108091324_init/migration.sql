-- CreateEnum
CREATE TYPE "InternshipMode" AS ENUM ('remote', 'onsite', 'hybrid');

-- CreateTable
CREATE TABLE "Internship" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "mode" "InternshipMode" NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "skills" TEXT[],
    "openings" INTEGER NOT NULL DEFAULT 1,
    "applyUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Internship_domain_idx" ON "Internship"("domain");

-- CreateIndex
CREATE INDEX "Internship_mode_idx" ON "Internship"("mode");

-- CreateIndex
CREATE INDEX "Internship_createdAt_idx" ON "Internship"("createdAt");
