import { RoutineInterface } from "../interfaces";
import { PrismaClient } from "@prisma/client";
import { RoutineDTO } from "../interfaces/dtos";
const prisma = new PrismaClient();

export class RoutineRepository {
   async getAllRoutines(): Promise<RoutineDTO[]> {
      const routines = await prisma.routine.findMany();
      return routines;
   }

   async getRoutineById(id: string): Promise<RoutineDTO | {}> {
      const routine = await prisma.routine.findUnique({
         where: {
            id: id,
         },
      });
      if (!routine) {
         return {};
      }
      return routine;
   }

   async createRoutine(routine: RoutineInterface): Promise<RoutineDTO> {
      const newRoutine = await prisma.routine.create({ data: routine });
      return newRoutine;
   }

   async updateRoutine(routine: RoutineInterface): Promise<RoutineDTO> {
      const updatedRoutine = await prisma.routine.update({
         where: { id: routine.id },
         data: routine,
      });
      return updatedRoutine;
   }

   async deleteRoutine(routineId: string): Promise<RoutineDTO> {
      const deletedRoutine = await prisma.routine.delete({
         where: { id: routineId },
      });
      return deletedRoutine;
   }
}
