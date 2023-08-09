import { Task } from "@prisma/client";

export interface RoutineDTO {
   id: string;
   name: string;
   description?: string | null;
   tasks?: Task[];
   userId: string;
   color?: string;
   createdAt: Date;
   updatedAt: Date;
}
