import { JWTTokenUtils } from "../utils";
import { Request, Response, NextFunction } from "express";

export class Middleware {
   private JWTTokenUtils;
   constructor() {
      this.JWTTokenUtils = new JWTTokenUtils();
   }

    checkIfAdminMiddleware(
      req: Request,
      res: Response,
      next: NextFunction
   ) {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      const decodedToken = JWTTokenUtils.decode(token);
      const { user } = decodedToken;
      if (!user || user.role !== "admin" || !req.query.admin) {
         throw new Error("User is not admin. Not able to handle the request.");
      }
   }
}
