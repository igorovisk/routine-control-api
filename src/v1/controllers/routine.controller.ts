import { Request, Response, NextFunction } from "express";
import { RoutineLogic } from "../logic";

export class RoutineController {
   private logic: RoutineLogic;

   constructor() {
      this.logic = new RoutineLogic();
   }

   async getAllRoutines(req: Request, res: Response, next: NextFunction) {
      try {
         const routines = await this.logic.getAllRoutines(req, res);
         return res.status(200).send(routines);
      } catch (error) {
         next(error);
         console.log(error, "<- Get Routines Error...");
      }
   }
   async getRoutineById(req: Request, res: Response, next: NextFunction) {
      try {
         const routine = await this.logic.getRoutineById(req, res);
         return res.status(200).send(routine);
      } catch (error) {
         next(error);
         console.log(error, "<- Get Routines Error...");
      }
   }

   async createRoutine(req: Request, res: Response, next: NextFunction) {
      try {
         const newRoutine = await this.logic.createRoutine(req, res);
         return res.status(200).send(newRoutine);
      } catch (error) {
         console.log(error, "<- Create Routine Error...");
      }
   }
   async putRoutine(req: Request, res: Response, next: NextFunction) {
      try {
         const updatedRoutine = await this.logic.updateRoutine(req, res);
         return updatedRoutine;
      } catch (error) {
         next(error);
         console.log(error, "<- Create Routine Error...");
      }
   }
}
