export interface UserInterface {
   email: string;
   username: string;
   fullname: string;
   birthDate: Date;
   password: string;
   routineId?: string;
   profileImage?: Buffer | null | undefined;
}
