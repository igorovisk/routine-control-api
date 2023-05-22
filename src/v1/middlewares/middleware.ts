import { JWTTokenUtils } from "../utils";
import { NextFunction, Request } from "express";
import { LogController } from "../controllers/log.controller";
export class Middleware {
   async checkIfAdminMiddleware(req: Request) {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      const decodedToken = JWTTokenUtils.decode(token);
      const { user } = decodedToken;
      if (!user || user.role !== "admin" || req.query.admin !== "true") {
         throw new Error(
            "User is not admin. Not able to handle the request / missing query parameter"
         );
      }
   }

   async isUserLoggedOrAdmin(req: Request) {
      try {
         const { userId } = req.params;
         const token = JWTTokenUtils.formatToken(req.headers.cookie);
         const decodedToken = JWTTokenUtils.decode(token);
         const { user } = decodedToken;
         if (user.id !== userId && user.role !== "admin") {
            throw new Error(
               "Not allowed update current user. Request was not made by an administrator or the user to update is not the same as the user logged in."
            );
         }
         return true;
      } catch (error) {
         throw error;
      }
   }

   async loggerMiddleware(req: Request, next: NextFunction): Promise<void> {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);

      const decodedToken = JWTTokenUtils.decode(token);
      const { user } = decodedToken;
      const userMessage = `USER: 
      id: ${user.id}
      email: ${user.email}
      username: ${user.username}
      role: ${user.role}
      `;

      const messageToLog = `${
         user ? "REQUEST MADE BY:" + userMessage : ""
      }   \nREQUEST DATE: [${new Date()}] \nREQUEST METHOD: ${
         req.method
      }\nREQUEST URL${req.url} `;

      const log = {
         user: {
            id: user.id,
            email: user.email,
            username: user.email,
            role: user.role,
         },
         message: messageToLog,
      };

      const logController = new LogController();
      await logController.createLog(log);
      next();
   }
}

export default Middleware;
