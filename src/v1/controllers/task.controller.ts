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
         next(error);
         console.log(error, "<- Get Tasks Error...");
      }
   }
   async getTaskById(req: Request, res: Response, next: NextFunction) {
      try {
         const task = await this.logic.getTaskById(req, res);
         return res.status(200).send(task);
      } catch (error) {
         next(error);
         console.log(error, "<- Get Tasks Error...");
      }
   }

   async createTask(req: Request, res: Response, next: NextFunction) {
      try {
         const newTask = await this.logic.createTask(req, res);
         return res.status(200).send(newTask);
      } catch (error) {
         console.log(error, "<- Create Task Error...");
      }
   }
   async putTask(req: Request, res: Response, next: NextFunction) {
      try {
         const updatedTask = await this.logic.updateTask(req, res);
         return updatedTask;
      } catch (error) {
         next(error);
         console.log(error, "<- Create Task Error...");
      }
   }
}
