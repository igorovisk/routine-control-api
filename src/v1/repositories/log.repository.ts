import { LogInterface } from "../interfaces";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class LogRepository {
   async postLog(log: any): Promise<void> {
      try {
         await prisma.log.create({ data: log });
      } catch (error) {
         console.log(error, "error creating log");
      }
   }
}
