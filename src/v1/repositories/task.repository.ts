import { TaskDTO } from "../interfaces/dtos/task.dto";
import { TaskDoneDTO } from "../interfaces/dtos/taskDone.dto";
import { TaskInterface } from "../interfaces";
import { PrismaClient } from "@prisma/client";
import { TaskDoneInterface } from "../interfaces/taskDone.interface";
const prisma = new PrismaClient();

export class TaskRepository {
   async getAllTasks(): Promise<TaskDTO[]> {
      try {
         const tasks = await prisma.task.findMany();
         return tasks;
      } catch (error) {
         console.log(error, "Error getting all TASKS from database.");
         throw error;
      }
   }
   async getTasksByRoutine(
      userId: string,
      routineId: string
   ): Promise<TaskDTO[]> {
      try {
         const tasks = await prisma.task.findMany({
            where: {
               routine: {
                  userId,
                  id: routineId,
               },
            },
         });
         return tasks;
      } catch (error) {
         console.log(error, "Error getting all TASKS from database.");
         throw error;
      }
   }

   async getTaskById(id: string): Promise<TaskDTO | {}> {
      try {
         const response = await prisma.task.findUnique({
            where: {
               id: id,
            },
         });
         if (!response) {
            return {};
         }
         return response;
      } catch (error) {
         throw error;
      }
   }

   async createTask(task: TaskInterface): Promise<TaskDTO> {
      try {
         const newTask = await prisma.task.create({ data: task });
         return newTask;
      } catch (error) {
         throw error;
      }
   }
   async checkTask(checkedTaskObj: TaskDoneInterface): Promise<TaskDoneDTO> {
      try {
         const taskTobeChecked = await prisma.task.findFirst({
            where: {
               id: checkedTaskObj.taskId,
            },
            select: {
               doneDate: {
                  select: {
                     checkDate: true,
                  },
               },
            },
         });

         const year = checkedTaskObj.checkDate.getUTCFullYear();
         const month = String(
            checkedTaskObj.checkDate.getUTCMonth() + 1
         ).padStart(2, "0");
         const day = String(checkedTaskObj.checkDate.getUTCDate()).padStart(
            2,
            "0"
         );

         const formattedCheckedTaskDate = `${year}-${month}-${day}`;

         taskTobeChecked?.doneDate.forEach((DatabaseTaskDate) => {
            const year = DatabaseTaskDate.checkDate.getUTCFullYear();
            const month = String(
               DatabaseTaskDate.checkDate.getUTCMonth() + 1
            ).padStart(2, "0");
            const day = String(
               DatabaseTaskDate.checkDate.getUTCDate()
            ).padStart(2, "0");

            // const formattedDatabaseDate = `${year}-${month}-${day}`;
            const formattedDatabaseDate = `${year}-${month}-${29}`;
            if (formattedDatabaseDate === formattedCheckedTaskDate) {
               throw new Error("This task was already checked today");
            }
         });
         const checkedTask = await prisma.taskDoneDate.create({
            data: checkedTaskObj,
         });

         return checkedTask;
      } catch (error) {
         throw error;
      }
   }

   async putTask(task: TaskInterface): Promise<TaskDTO> {
      try {
         const updatedTask = await prisma.task.update({
            where: { id: task.id },
            data: task,
         });
         return updatedTask;
      } catch (error) {
         throw error;
      }
   }

   async deleteTask(taskId: string): Promise<TaskDTO> {
      try {
         console.log(taskId, "taskId on prisma");
         const deletedTask = await prisma.task.delete({
            where: { id: taskId },
         });
         return deletedTask;
      } catch (error) {
         console.log(error, "error deleting task...");
         throw error;
      }
   }
}
