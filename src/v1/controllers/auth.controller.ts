import { Request, Response, NextFunction } from "express";
import { AuthLogic } from "../logic";

export class AuthController {
   private logic: AuthLogic;

   constructor() {
      this.logic = new AuthLogic();
   }

   async login(req: Request, res: Response, next: NextFunction) {
      const { email, password } = req.body;
      const response = await this.logic.login(email, password);
      // Set cookie options
      const cookieOptions = {
         httpOnly: true,
         secure: true,
      };
      // Set cookie with token
      res.cookie("token", response, cookieOptions);
      return res.status(200).send();
   }

   async logout(req: Request, res: Response, next: NextFunction) {
      await this.logic.logout(res);
      return res.status(200).send();
   }

   async resetPassword(req: Request, res: Response, next: NextFunction) {
      await this.logic.resetPassword(req, res);
      return res.status(200).send();
   }
}
