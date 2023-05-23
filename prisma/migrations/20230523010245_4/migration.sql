/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `routines` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "routines_userId_key" ON "routines"("userId");
