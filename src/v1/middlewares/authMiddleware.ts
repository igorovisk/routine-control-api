import { ForbiddenRequestError } from "../../helpers/errors";
import { JWTTokenUtils } from "../utils";
import { Request } from "express";

export class Middleware {
   async checkIfAdminMiddleware(req: Request) {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      const decodedToken = JWTTokenUtils.decode(token);
      const { user } = decodedToken;
      if (!user || user.role !== "admin" || req.query.admin !== "true") {
         throw new ForbiddenRequestError(
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
            throw new ForbiddenRequestError(
               "Not allowed update current user. Request was not made by an administrator or the user to update is not the same as the user logged in."
            );
         }
         return true;
      } catch (error) {
         throw error;
      }
   }
}

export default Middleware;
