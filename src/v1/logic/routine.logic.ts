import { Request, Response } from "express";
import { RoutineDTO } from "../interfaces/dtos";
import { RoutineRepository } from "../repositories";
import { Middleware } from "../middlewares";
export class RoutineLogic {
   private repository: RoutineRepository;
   private middleware: Middleware
   constructor() {
      this.repository = new RoutineRepository();
      this.middleware = new Middleware();
   }

   async getAllRoutines(req: Request, res: Response): Promise<RoutineDTO[]> {
      try {
         const response = await this.repository.getAllRoutines();
         
         return response;
      } catch (error) {
         console.log("error on routine logic...");
         throw error;
      }
   }

   async getRoutineById(req: Request, res: Response) {
      try {
         const { id } = req.params;
         const response = await this.repository.getRoutineById(id);
         return response;
      } catch (error) {
         console.log("error on routine logic...");
         throw error;
      }
   }

   async createRoutine(req: Request, res: Response) {
      try {
         const { name, description } = req.body;
         const {userId} = req.params
         const newRoutine = {
            name: name,
            description: description,
            userId: userId,
         };

         const response = await this.repository.createRoutine(newRoutine);
         return response;
      } catch (error) {
         console.log("error on routine logic...");
         throw error;
      }
   }

   async updateRoutine(req: Request, res: Response) {
      try {

         const { description, comment, name, routineId } = req.body;
        
         const updatedRoutine = {
            id: routineId,
            name: name,
            description: description,
            comment: comment,
            userId: req.params.userId,
         };

         await this.middleware.isUserLoggedOrAdmin(req);

         const response = await this.repository.updateRoutine(updatedRoutine);
         
         return response;
      } catch (error) {
         console.log("error on routine logic...");
         throw error;
      }
   }
}
