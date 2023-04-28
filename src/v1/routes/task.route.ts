import { NextFunction, Request, Response, Router } from "express";
import { TaskController } from "../controllers";
import { JWTTokenUtils } from "../utils";

const controller = new TaskController();
const router = Router();

router
   .route("/tasks$")
   .get((req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      controller.getAllTasks(req, res, next);
   });

router
   .route("/tasks/:id")
   .get((req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      controller.getTaskById(req, res, next);
   });

router
   .route("/tasks$")
   .post((req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      controller.createTask(req, res, next);
   });

router
   .route("/tasks$")
   .put((req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      controller.createTask(req, res, next);
   });

export { router as TaskRouter };
