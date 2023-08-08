import { Request, Response } from "express";
import { TaskDTO } from "../interfaces/dtos";
import { TaskRepository } from "../repositories";
import { TaskDoneInterface } from "../interfaces/taskDone.interface";
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
         throw error;
      }
   }

   async getTasksByRoutine(req: Request, res: Response): Promise<TaskDTO[]> {
      try {
         const { userId, routineId } = req.params;
         const response = await this.repository.getTasksByRoutine(
            userId,
            routineId
         );
         return response;
      } catch (error) {
         throw error;
      }
   }

   async getTaskById(req: Request, res: Response) {
      try {
         const { id } = req.params;
         const response = await this.repository.getTaskById(id);
         return response;
      } catch (error) {
         throw error;
      }
   }

   async createTask(req: Request, res: Response) {
      try {
         const { name, description, comment } = req.body;
         const { routineId } = req.params;

         const newTask = {
            name: name,
            description: description,
            comment: comment,
            routineId: routineId,
         };
         const response = await this.repository.createTask(newTask);
         return response;
      } catch (error) {
         throw error;
      }
   }

   async putTask(req: Request, res: Response) {
      try {
         const { name, description, comment, routineId, taskId } = req.body;

         const updatedTask = {
            id: taskId,
            name: name,
            description: description,
            comment: comment,
            routineId: routineId,
         };
         // await this.middleware.isUserLoggedOrAdmin(req);

         const response = await this.repository.putTask(updatedTask);
         return response;
      } catch (error) {
         throw error;
      }
   }

   async deleteTask(req: Request, res: Response) {
      try {
         const { userId, routineId, taskId } = req.params;

         // await this.middleware.isUserLoggedOrAdmin(req);

         const response = await this.repository.deleteTask(taskId);
         return response;
      } catch (error) {
         throw error;
      }
   }

   async checkTask(req: Request, res: Response) {
      try {
         const { taskId } = req.params;

         const checkedTask = {
            checkDate: new Date(),
            taskId,
         };
         const response = await this.repository.checkTask(checkedTask);
         return response;
      } catch (error) {
         throw error;
      }
   }

   async uncheckTask(req: Request, res: Response) {
      try {
         const { taskId } = req.params;
         const response = await this.repository.uncheckTask(taskId);
         return response;
      } catch (error) {
         throw error;
      }
   }
}
