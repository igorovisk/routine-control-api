/*
  Warnings:

  - Made the column `taskId` on table `TaskDoneDate` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "TaskDoneDate" DROP CONSTRAINT "TaskDoneDate_taskId_fkey";

-- AlterTable
ALTER TABLE "TaskDoneDate" ALTER COLUMN "taskId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "TaskDoneDate" ADD CONSTRAINT "TaskDoneDate_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
