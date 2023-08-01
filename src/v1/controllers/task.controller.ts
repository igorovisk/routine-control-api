import { Request, Response, NextFunction } from "express";
import { TaskLogic } from "../logic";

export class TaskController {
   private logic: TaskLogic;

   constructor() {
      this.logic = new TaskLogic();
   }

   async getAllTasks(req: Request, res: Response, next: NextFunction) {
      try {
         const tasks = await this.logic.getAllTasks(req, res);
         return res.status(200).send(tasks);
      } catch (error) {
         throw error;
      }
   }

   async getTasksByRoutine(req: Request, res: Response, next: NextFunction) {
      try {
         const tasks = await this.logic.getTasksByRoutine(req, res);
         return res.status(200).send(tasks);
      } catch (error) {
         throw error;
      }
   }
   async getTaskById(req: Request, res: Response, next: NextFunction) {
      try {
         const task = await this.logic.getTaskById(req, res);
         return res.status(200).send(task);
      } catch (error) {
         throw error;
      }
   }

   async createTask(req: Request, res: Response, next: NextFunction) {
      try {
         const newTask = await this.logic.createTask(req, res);
         return res.status(200).send(newTask);
      } catch (error) {
         throw error;
      }
   }
   async putTask(req: Request, res: Response, next: NextFunction) {
      try {
         const updatedTask = await this.logic.putTask(req, res);
         return updatedTask;
      } catch (error) {
         throw error;
      }
   }

   async deleteTask(req: Request, res: Response, next: NextFunction) {
      try {
         const deletedTask = await this.logic.deleteTask(req, res);
         return res.status(200).send(deletedTask);
      } catch (error) {
         throw error;
      }
   }

   async checkTask(req: Request, res: Response, next: NextFunction) {
      try {
         const checkedTask = await this.logic.checkTask(req, res);
         return res.status(200).send(checkedTask);
      } catch (error) {
         throw error;
      }
   }
   async uncheckTask(req: Request, res: Response, next: NextFunction) {
      try {
         const checkedTask = await this.logic.uncheckTask(req, res);
         return res.status(200).send(checkedTask);
      } catch (error) {
         throw error;
      }
   }
}
