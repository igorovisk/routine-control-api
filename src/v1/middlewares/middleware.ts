import { JWTTokenUtils } from "../utils";
import { NextFunction, Request } from "express";

export class Middleware {
   async checkIfAdminMiddleware(req: Request) {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      const decodedToken = JWTTokenUtils.decode(token);
      const { user } = decodedToken;
      console.log(user, "user");
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
         console.log(user, "user");
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

   loggerMiddleware(req: Request, next: NextFunction) {
      console.log(`[${new Date()}] ${req.method} ${req.url}`);
      next();
   }
}

export default Middleware;
