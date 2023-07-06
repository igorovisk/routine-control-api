/*
  Warnings:

  - You are about to drop the column `routineId` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "users_routineId_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "routineId";
