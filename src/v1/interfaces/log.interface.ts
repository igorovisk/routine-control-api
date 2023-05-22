export interface UserLogInterface {
   id?: string;
   email?: string;
   username?: string;
   role?: string;
}

export interface LogInterface {
   user?: UserLogInterface;
   message: string;
}
