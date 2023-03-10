/*
  Warnings:

  - A unique constraint covering the columns `[routineId]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "routineId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_routineId_key" ON "users"("routineId");
