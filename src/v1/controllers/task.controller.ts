import { Request, Response, NextFunction } from "express";
import { TaskLogic } from "../logic";

export class TaskController {
   private logic: TaskLogic;

   constructor() {
      this.logic = new TaskLogic();
   }

   async getAllTasks(req: Request, res: Response, next: NextFunction) {
      const tasks = await this.logic.getAllTasks(req, res);
      return res.status(200).send(tasks);
   }

   async getTasksByRoutine(req: Request, res: Response, next: NextFunction) {
      const tasks = await this.logic.getTasksByRoutine(req, res);
      return res.status(200).send(tasks);
   }
   async getTaskById(req: Request, res: Response, next: NextFunction) {
      const task = await this.logic.getTaskById(req, res);
      return res.status(200).send(task);
   }

   async createTask(req: Request, res: Response, next: NextFunction) {
      const newTask = await this.logic.createTask(req, res);
      return res.status(200).send(newTask);
   }
   async putTask(req: Request, res: Response, next: NextFunction) {
      const updatedTask = await this.logic.putTask(req, res);
      return updatedTask;
   }

   async deleteTask(req: Request, res: Response, next: NextFunction) {
      const deletedTask = await this.logic.deleteTask(req, res);
      return res.status(200).send(deletedTask);
   }

   async checkTask(req: Request, res: Response, next: NextFunction) {
      const checkedTask = await this.logic.checkTask(req, res);
      return res.status(200).send(checkedTask);
   }
   async uncheckTask(req: Request, res: Response, next: NextFunction) {
      const checkedTask = await this.logic.uncheckTask(req, res);
      return res.status(200).send(checkedTask);
   }
}
