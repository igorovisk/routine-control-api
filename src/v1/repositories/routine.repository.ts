import { RoutineInterface } from "../interfaces";
import { PrismaClient } from "@prisma/client";
import { RoutineDTO } from "../interfaces/dtos";
const prisma = new PrismaClient();

export class RoutineRepository {
   async getAllRoutines(): Promise<RoutineDTO[]> {
      try {
         const routines = await prisma.routine.findMany();
         return routines;
      } catch (error) {
         console.log(error, "Error getting all RoutineS from database.");
         throw error;
      }
   }

   async getRoutineById(id: string): Promise<RoutineDTO | {}> {
      try {
         const routine = await prisma.routine.findUnique({
            where: {
               id: id,
            },
         });
         if (!routine) {
            return {};
         }
         return routine;
      } catch (error) {
         throw error;
      }
   }

   async  createRoutine(routine: RoutineInterface): Promise<RoutineDTO> {
      try {
        const newRoutine = await prisma.routine.create({ data: routine });
        return newRoutine;
      } catch (error) {
        throw error;
      }
    }

   async updateRoutine(routine: RoutineInterface): Promise<RoutineDTO> {
      try {
         const updatedRoutine = await prisma.routine.update({
            where: { id: routine.id },
            data: routine,
         });
         return updatedRoutine;
      } catch (error) {
         throw error;
      }
   }
}
