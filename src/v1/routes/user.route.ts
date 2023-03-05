import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers";

const controller = new UserController();
const router = Router();

router
   .route("/users$")
   .get((req: Request, res: Response, next: NextFunction) => {
      controller.getUsers(req, res, next);
   });

router
   .route("/users$")
   .post((req: Request, res: Response, next: NextFunction) => {
      controller.createUser(req, res, next);
   });

export { router as UserRouter };
