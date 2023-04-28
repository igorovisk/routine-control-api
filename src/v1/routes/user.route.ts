import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers";
import { JWTTokenUtils } from "../utils";

const controller = new UserController();
const router = Router();

router.route("/me$").get((req: Request, res: Response, next: NextFunction) => {
   const token = JWTTokenUtils.formatToken(req.headers.cookie);
   JWTTokenUtils.verify(token);
   controller.getMe(req, res, next);
});

router
   .route("/users$")
   .get((req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      controller.getUsers(req, res, next);
   });

router
   .route("/users/:id")
   .get((req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      controller.getUserById(req, res, next);
   });

router
   .route("/users$")
   .put((req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      controller.updateUser(req, res, next);
   });

router
   .route("/users$")
   .post((req: Request, res: Response, next: NextFunction) => {
      controller.createUser(req, res, next);
   });

export { router as UserRouter };
