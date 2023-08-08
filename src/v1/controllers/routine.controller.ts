import { Request, Response, NextFunction } from "express";
import { RoutineLogic } from "../logic";

export class RoutineController {
   private logic: RoutineLogic;

   constructor() {
      this.logic = new RoutineLogic();
   }

   async getAllRoutines(req: Request, res: Response, next: NextFunction) {
      const routines = await this.logic.getAllRoutines(req, res);
      return res.status(200).send(routines);
   }

   async getRoutineById(req: Request, res: Response, next: NextFunction) {
      const routine = await this.logic.getRoutineById(req, res);
      return res.status(200).send(routine);
   }

   async createRoutine(req: Request, res: Response, next: NextFunction) {
      const newRoutine = await this.logic.createRoutine(req, res);
      return res.status(200).send(newRoutine);
   }

   async putRoutine(req: Request, res: Response, next: NextFunction) {
      const updatedRoutine = await this.logic.updateRoutine(req, res);
      return res.status(200).send(updatedRoutine);
   }

   async deleteRoutine(req: Request, res: Response, next: NextFunction) {
      const deletedRoutine = await this.logic.deleteRoutine(req, res);
      return res.status(200).send(deletedRoutine);
   }
}
