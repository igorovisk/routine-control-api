export interface TaskDTO {
   id?: string;
   name: string;
   description?: string | null;
   comment?: string | null;
   routineId: string;
   doneDate?: [] | null;
   createdAt: Date;
   updatedAt: Date;
}
