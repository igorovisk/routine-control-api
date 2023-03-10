import { Request, Response } from "express";
import { TaskDTO } from "../interfaces/dtos";
import { TaskRepository } from "../repositories";

export class TaskLogic {
   private repository: TaskRepository;

   constructor() {
      this.repository = new TaskRepository();
   }

   async getAllTasks(req: Request, res: Response): Promise<TaskDTO[]> {
      try {
         const response = await this.repository.getAllTasks();
         return response;
      } catch (error) {
         console.log("error on task logic...");
         throw error;
      }
   }

   async getTaskById(req: Request, res: Response) {
      try {
         const { id } = req.params;
         const response = await this.repository.getTaskById(id);
         return response;
      } catch (error) {
         console.log("error on task logic...");
         throw error;
      }
   }

   async createTask(req: Request, res: Response) {
      try {
         const { description, comment, routineId } = req.body;

         const newTask = {
            description: description,
            comment: comment,
            routineId: routineId
         };

         const response = await this.repository.createTask(newTask);
         return response;
      } catch (error) {
         console.log("error on task logic...");
         throw error;
      }
   }

   async updateTask(req: Request, res: Response) {
      try {
         const { description, comment, routineId, taskId } = req.body;

         const updatedTask = {
            id: taskId,
            description: description,
            comment: comment,
            routineId: routineId,
         };

         const response = await this.repository.updateTask(updatedTask);
         return response;
      } catch (error) {
         console.log("error on task logic...");
         throw error;
      }
   }
}
