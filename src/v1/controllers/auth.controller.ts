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
         // Set cookie options
         const cookieOptions = {
            httpOnly: true,
            secure: true,
         };

         // Set cookie with token
         res.cookie("token", response, cookieOptions);

         return res.status(200).send();
      } catch (error) {
         console.log(error);
         res.status(401).json({ Error: "Wrong email or password." }).send();
         next(error);
      }
   }
}
