import { Request, Response, NextFunction } from "express";
import { UserLogic } from "../logic";

export class UserController {
   private logic: UserLogic;

   constructor() {
      this.logic = new UserLogic();
   }

   async getMe(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.getMe(req, res);
      return res.status(200).send(response);
   }

   async getUsers(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.getUsers(req, res);
      return res.status(200).send(response);
   }
   async getUserById(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.getUserById(req, res);
      return res.status(200).send(response);
   }

   async createUser(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.createUser(req, res);
      return res.status(200).send(response);
   }
   async updateUser(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.updateUser(req, res);
      return res.status(200).send(response);
   }
   async getUserByEmail(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.getUserByEmail(req, res);
      return res.status(200).send(response);
   }
   async resetPassword(req: Request, res: Response, next: NextFunction) {
      const response = await this.logic.resetPassword(req, res);
      return res.status(200).send(response);
   }
}
