/*
  Warnings:

  - You are about to drop the column `age` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "routines" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tasks" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "age";
