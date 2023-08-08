import { LogRepository } from "../repositories";
import { LogInterface } from "../interfaces";

export class LogLogic {
   private repository: LogRepository;

   constructor() {
      this.repository = new LogRepository();
   }

   async createLog(log: LogInterface): Promise<void> {
      try {
         const response = await this.repository.postLog(log);
         return response;
      } catch (error) {
         throw error;
      }
   }
}
