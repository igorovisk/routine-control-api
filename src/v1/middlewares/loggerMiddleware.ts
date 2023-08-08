import { NextFunction } from "express";
import { JWTTokenUtils } from "../utils";
import { LogInterface } from "../interfaces";
import { Request } from "express";

export class LoggerMiddleware {
   async loggerMiddleware(req: Request, next: NextFunction): Promise<void> {
      try {
         const token = JWTTokenUtils.formatToken(req.headers.cookie);
         const decodedToken = JWTTokenUtils.decode(token);
         let user;
         if (decodedToken) {
            user = decodedToken.user;
         }

         const log: LogInterface = {
            userId: user?.id,
            userEmail: user?.email || "",
            username: user?.username || "",
            userRole: user?.role || "",
            method: req?.method || "",
            url: req?.url || "",
         };

         // const logController = new LogController();
         // await logController.createLog(log);
         next();
      } catch (error) {
         console.log(error);
      }
   }
}
