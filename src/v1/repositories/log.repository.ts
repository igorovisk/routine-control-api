import { LogInterface } from "../interfaces";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class LogRepository {
   async postLog(log: LogInterface): Promise<void> {
      try {
         const { userId, userEmail, username, userRole, method, url } = log;

         await prisma.log.create({
            data: {
               userId,
               userEmail,
               username,
               userRole,
               method,
               url,
            },
         });
      } catch (error) {
         console.error("Error creating log", error);
      }
   }
}
