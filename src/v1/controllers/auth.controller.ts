import { Request, Response, NextFunction } from "express";
import { AuthLogic } from "../logic";

export class AuthController {
   private logic: AuthLogic;

   constructor() {
      this.logic = new AuthLogic();
   }

   async login(req: Request, res: Response, next: NextFunction) {
      try {
         const { email, password } = req.body;
         const response = await this.logic.login(email, password);
         return res.status(200).json({ token: response });
      } catch (error) {
         console.log(error);
      }
   }
}
