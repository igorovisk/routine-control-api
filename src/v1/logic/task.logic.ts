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

   async getRoutineTasks(req: Request, res: Response): Promise<TaskDTO[]> {
      try {
         const { userId, routineId } = req.params;
         const response = await this.repository.getRoutineTasks(
            userId,
            routineId
         );
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
         const { description, comment } = req.body;
         const { routineId } = req.params;

         const newTask = {
            description: description,
            comment: comment,
            routineId: routineId,
         };
         const response = await this.repository.createTask(newTask);
         return response;
      } catch (error) {
         console.log("error on task logic...");
         throw error;
      }
   }

   async putTask(req: Request, res: Response) {
      try {
         const { description, comment, routineId, taskId } = req.body;

         const updatedTask = {
            id: taskId,
            description: description,
            comment: comment,
            routineId: routineId,
         };
         // await this.middleware.isUserLoggedOrAdmin(req);

         const response = await this.repository.putTask(updatedTask);
         return response;
      } catch (error) {
         console.log("error on task logic...");
         throw error;
      }
   }
}
