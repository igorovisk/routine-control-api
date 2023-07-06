export interface UserInterface {
   email: string;
   username: string;
   fullname: string;
   birthDate: Date;
   password: string;
   profileImage?: Buffer | null | undefined;
   role: string;
}
