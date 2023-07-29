-- CreateTable
CREATE TABLE "TaskDoneDate" (
    "id" TEXT NOT NULL,
    "taskId" TEXT NOT NULL,
    "doneDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskDoneDate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaskDoneDate_id_key" ON "TaskDoneDate"("id");

-- AddForeignKey
ALTER TABLE "TaskDoneDate" ADD CONSTRAINT "TaskDoneDate_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
