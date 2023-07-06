/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `routines` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `tasks` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "routines_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "routines_id_key" ON "routines"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tasks_id_key" ON "tasks"("id");
