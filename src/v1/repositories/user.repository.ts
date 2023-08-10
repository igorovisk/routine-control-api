import { UserDTO } from "../interfaces/dtos";
import { UserInterface } from "../interfaces";
import { PrismaClient } from "@prisma/client";
import { BadRequestError } from "../../helpers/errors";
import { PrismaClientValidationError } from "@prisma/client/runtime";

const prisma = new PrismaClient();

type UpdatedUserDate = {
   id: string;
   email: string;
   username: string;
   fullname: string;
   birthDate: Date;
   password: string;
};
export class UserRepository {
   async getMe(id: string): Promise<UserDTO[] | {}> {
      try {
         const me = await prisma.user.findUnique({
            where: { id: id },
            include: {
               Routine: {
                  select: {
                     id: true,
                     name: true,
                     description: true,
                     color: true,
                     tasks: {
                        select: {
                           id: true,
                           name: true,
                           description: true,
                           doneDate: {
                              select: {
                                 checkDate: true,
                              },
                           },
                        },
                     },
                  },
               },
            },
         });
         if (!me) {
            throw new Error("User not found");
         }
         return {
            id: me.id,
            fullname: me.fullname,
            email: me.email,
            username: me.username,
            birthDate: me.birthDate,
            routines: me.Routine,
            profileImage: me.profileImage,
            role: me.role,
            createdAt: me.createdAt,
         };
      } catch (error: any) {
         throw new BadRequestError(error.message);
      }
   }

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
      } catch (error: any) {
         throw new BadRequestError(error.message);
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
         return user;
      } catch (error: any) {
         throw new BadRequestError(error.message);
      }
   }

   async createUser(user: UserInterface): Promise<UserDTO> {
      try {
         const newUser = await prisma.user.create({ data: user });
         return newUser;
      } catch (error: any) {
         throw new BadRequestError(error.message);
      }
   }
   async updateUser(updatedUserData: UpdatedUserDate): Promise<UserDTO> {
      try {
         const updatedUser = await prisma.user.update({
            where: { id: updatedUserData.id },
            data: updatedUserData,
         });

         return updatedUser;
      } catch (error: any) {
         throw new BadRequestError(error.message);
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
      } catch (error: any) {
         throw new BadRequestError(error.message);
      }
   }
}
