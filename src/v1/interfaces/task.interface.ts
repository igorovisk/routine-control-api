import { TaskDoneInterface } from "./taskDone.interface";

export interface TaskInterface {
   id?: string;
   name: string;
   description: string;
   comment: string;
   routineId: string;
}
