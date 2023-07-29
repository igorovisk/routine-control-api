import { LogLogic } from "../logic";
import { LogInterface } from "../interfaces";

export class LogController {
   private logic: LogLogic;

   constructor() {
      this.logic = new LogLogic();
   }

   async createLog(log: LogInterface): Promise<void> {
      try {
         await this.logic.createLog(log);
      } catch (error) {
         throw error;
         console.log(error, "<- Create Log Error...");
      }
   }
}
