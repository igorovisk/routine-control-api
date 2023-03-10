import { Task } from "@prisma/client";


export interface RoutineInterface {
   id?: string;
   name: string;
   description?: string;
   userId: string;
}
