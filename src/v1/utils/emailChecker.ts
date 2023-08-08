import { PrismaClient } from "@prisma/client";
import { BadRequestError } from "../../helpers/errors";

const prisma = new PrismaClient();
export class EmailUtils {
   async getUserByEmail(email: string): Promise<Boolean> {
      try {
         if (email) {
            const user = await prisma.user.findFirst({
               where: {
                  email: email,
               },
            });
            return user ? true : false;
         }
         throw new BadRequestError("No email provided");
      } catch (error) {
         throw error;
      }
   }
}
