import { Request, Response, NextFunction } from "express";
import { UserLogic } from "../logic";

export class UserController {
   private logic: UserLogic;

   constructor() {
      this.logic = new UserLogic();
   }

   async getUsers(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await this.logic.getUsers(req, res);
         console.log(response, "all users");
         return res.status(200).send(response);
      } catch (error) {
         next(error);
      }
   }

   async createUser(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await this.logic.createUser(req, res);
         console.log(response, "response user");
         return res.status(200).send(response);
      } catch (error) {
         next(error);
      }
   }
   async updateUser(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await this.logic.updateUser(req, res);
         return res.status(200).send(response);
      } catch (error) {
         next(error);
      }
   }
   async getUserByUsernameOrEmail(
      req: Request,
      res: Response,
      next: NextFunction
   ) {
      try {
         const response = await this.logic.createUser(req, res);
         return res.status(200).send(response);
      } catch (error) {
         next(error);
      }
   }
}
