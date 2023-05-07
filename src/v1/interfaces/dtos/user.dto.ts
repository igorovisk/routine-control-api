import { RoutineDTO } from "./routine.dto";

export interface UserDTO {
   id: string;
   fullname: string;
   email: string;
   password: string;
   birthDate: Date;
   createdAt: Date;
   updatedAt: Date;
   routineId?: string | null;
   routine?: RoutineDTO[] | null;
   profileImage?: Buffer | null;
   role: string;
}
