import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export  class EmailUtils {

async getUserByEmail(email?: string): Promise<Boolean> {
    try {
       const user = await prisma.user.findFirst({
          where: {
             email: email,
          },
       });
       return user ? true : false
    } catch (error) {
       console.log(error, "Error getting user by email.");
       throw error;
    }
 }
}