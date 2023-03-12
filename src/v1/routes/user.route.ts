import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers";
import { JWTTokenUtils } from "../utils";

const controller = new UserController();
const router = Router();

router
   .route("/users$")
   .get((req: Request, res: Response, next: NextFunction) => {
      const token = req.headers["x-access-token"] as string;
      JWTTokenUtils.verify(token);
      controller.getUsers(req, res, next);
   });

router
   .route("/users/:id")
   .get((req: Request, res: Response, next: NextFunction) => {
      const token = req.headers["x-access-token"] as string;
      JWTTokenUtils.verify(token);
      controller.getUserById(req, res, next);
   });

router
   .route("/users$")
   .put((req: Request, res: Response, next: NextFunction) => {
      const token = req.headers["x-access-token"] as string;
      JWTTokenUtils.verify(token);
      controller.updateUser(req, res, next);
   });

router
   .route("/users$")
   .post((req: Request, res: Response, next: NextFunction) => {
      controller.createUser(req, res, next);
   });

export { router as UserRouter };
