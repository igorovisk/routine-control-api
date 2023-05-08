import { Request, Response, NextFunction } from "express";
import { UserLogic } from "../logic";

export class UserController {
   private logic: UserLogic;

   constructor() {
      this.logic = new UserLogic();
   }

   async getMe(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await this.logic.getMe(req, res);
         console.log(response, "get me");
         return res.status(200).send(response);
      } catch (error) {
         throw error;
      }
   }

   async getUsers(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await this.logic.getUsers(req, res);
         console.log(response, "get users");
         return res.status(200).send(response);
      } catch (error) {
         throw error;
      }
   }
   async getUserById(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await this.logic.getUserById(req, res);
         console.log(response, "get user by Id");
         return res.status(200).send(response);
      } catch (error) {
         throw error;
      }
   }

   async createUser(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await this.logic.createUser(req, res);
         return res.status(200).send(response);
      } catch (error) {
         throw error;
      }
   }
   async updateUser(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await this.logic.updateUser(req, res);
         return res.status(200).send(response);
      } catch (error) {
         console.log('error no controler')
         throw error;
      }
   }
   async getUserByEmail(req: Request, res: Response, next: NextFunction) {
      try {
         const response = await this.logic.getUserByEmail(req, res);
         return res.status(200).send(response);
      } catch (error) {
         throw error;
      }
   }
}
