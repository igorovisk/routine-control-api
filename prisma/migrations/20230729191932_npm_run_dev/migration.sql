/*
  Warnings:

  - You are about to drop the column `doneDate` on the `TaskDoneDate` table. All the data in the column will be lost.
  - You are about to drop the column `done` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `checkDate` to the `TaskDoneDate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TaskDoneDate" DROP COLUMN "doneDate",
ADD COLUMN     "checkDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "done";
