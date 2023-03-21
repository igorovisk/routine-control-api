import { UserDTO } from "../interfaces/dtos";
import { UserInterface } from "../interfaces";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type UpdatedUserDate = {
   id: string;
   email: string;
   username: string;
   fullname: string;
   birthDate: Date;
   password: string;
   routineId?: string;
};
export class UserRepository {
   async getUsers(): Promise<UserDTO[]> {
      try {
         const users = await prisma.user.findMany({
            include: {
               Routine: {
                  select: {
                     id: true,
                     name: true,
                     description: true,
                     tasks: true,
                  },
               },
            },
         });
         return users;
      } catch (error) {
         console.log(error, "Error getting all users from database.");
         throw error;
      }
   }

   async getUserById(id: string): Promise<UserDTO | {}> {
      try {
         const user = await prisma.user.findUnique({
            where: { id: id },
            include: {
               Routine: {
                  select: {
                     id: true,
                     name: true,
                     description: true,
                     tasks: true,
                  },
               },
            },
         });
         if (!user) {
            return {};
         }
         console.log(user, "User");
         return user;
      } catch (error) {
         console.log(error, "Error getting user.");
         throw error;
      }
   }

   async createUser(user: UserInterface): Promise<UserDTO> {
      try {
         const newUser = await prisma.user.create({ data: user });
         console.log(newUser, "NEW USER");
         return newUser;
      } catch (error) {
         throw error;
      }
   }
   async updateUser(updatedUserData: UpdatedUserDate): Promise<UserDTO> {
      try {
         const updatedUser = await prisma.user.update({
            where: { id: updatedUserData.id },
            data: updatedUserData,
         });
         return updatedUser;
      } catch (error) {
         throw error;
      }
   }

   async getUserByEmail(email?: string): Promise<UserDTO | null> {
      try {
         const user = await prisma.user.findFirst({
            where: {
               email: email,
            },
            include: {
               Routine: {
                  select: {
                     id: true,
                     name: true,
                     description: true,
                     tasks: true,
                  },
               },
            },
         });
         return user;
      } catch (error) {
         console.log(error, "Error getting user by username ou email.");
         throw error;
      }
   }
}
