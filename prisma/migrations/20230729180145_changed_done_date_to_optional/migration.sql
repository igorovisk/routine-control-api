-- DropForeignKey
ALTER TABLE "TaskDoneDate" DROP CONSTRAINT "TaskDoneDate_taskId_fkey";

-- AlterTable
ALTER TABLE "TaskDoneDate" ALTER COLUMN "taskId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TaskDoneDate" ADD CONSTRAINT "TaskDoneDate_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;
