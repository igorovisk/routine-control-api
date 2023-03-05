import { TaskDTO } from "../interfaces/dtos/task.dto";
import { TaskInterface } from "../interfaces";
import { PrismaClient } from "@prisma/client";
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

   async updateTask(task: TaskInterface): Promise<TaskDTO> {
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
}
