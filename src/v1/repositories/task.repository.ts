import { TaskDTO } from "../interfaces/dtos/task.dto";
import { TaskDoneDTO } from "../interfaces/dtos/taskDone.dto";
import { TaskInterface } from "../interfaces";
import { PrismaClient } from "@prisma/client";
import { TaskDoneInterface } from "../interfaces/taskDone.interface";
import { formatDateToSimpleDate } from "../utils";
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

   async checkTask(checkedTaskObj: TaskDoneInterface): Promise<TaskDoneDTO> {
      try {
         const taskToBeChecked = await prisma.task.findFirst({
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

         const formattedCheckedTaskDate = formatDateToSimpleDate(
            checkedTaskObj.checkDate
         );

         taskToBeChecked?.doneDate.forEach((DatabaseTaskDate) => {
            const formattedDatabaseDate = formatDateToSimpleDate(
               DatabaseTaskDate.checkDate
            );
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

   async uncheckTask(taskId: string): Promise<TaskDoneDTO> {
      try {
         const uncheckedTasksToDelete = await prisma.taskDoneDate.findMany({
            where: {
               taskId: taskId,
            },
         });

         const today = formatDateToSimpleDate(new Date());

         const checkDateToDelete = uncheckedTasksToDelete.find(
            (task) => formatDateToSimpleDate(task.checkDate) === today
         );
         console.log(checkDateToDelete, "CheckDate to delete");

         if (!checkDateToDelete) {
            throw new Error("Task not found with the given ID and checkDate.");
         }
         const uncheckedTask = await prisma.taskDoneDate.delete({
            where: { id: checkDateToDelete.id },
         });
         return uncheckedTask;
      } catch (error) {
         console.log(error, "error deleting task...");
         throw error;
      }
   }
}
