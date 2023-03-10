import { RoutineDTO } from "../interfaces/dtos/Routine.dto";
import { RoutineInterface } from "../interfaces";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class RoutineRepository {
   async getAllRoutines(): Promise<RoutineDTO[]> {
      try {
         const Routines = await prisma.routine.findMany();
         return Routines;
      } catch (error) {
         console.log(error, "Error getting all RoutineS from database.");
         throw error;
      }
   }

   async getRoutineById(id: string): Promise<RoutineDTO | {}> {
      try {
         const response = await prisma.routine.findUnique({
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

   async createRoutine(Routine: RoutineInterface): Promise<RoutineDTO> {
      try {
         const newRoutine = await prisma.routine.create({ data: Routine });
         return newRoutine;
      } catch (error) {
         throw error;
      }
   }

   async updateRoutine(Routine: RoutineInterface): Promise<RoutineDTO> {
      try {
         const updatedRoutine = await prisma.routine.update({
            where: { id: Routine.id },
            data: Routine,
         });
         return updatedRoutine;
      } catch (error) {
         throw error;
      }
   }
}
