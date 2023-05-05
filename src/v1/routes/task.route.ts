import { NextFunction, Request, Response, Router } from "express";
import { TaskController } from "../controllers";
import { JWTTokenUtils } from "../utils";

const controller = new TaskController();
const router = Router();

router
   .route("/user/:userId/routines/:routineId/tasks$")
   .get((req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      controller.getAllTasks(req, res, next);
   });

router
   .route("/user/:userId/routines/:routineId/tasks/:taskId")
   .get((req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      controller.getTaskById(req, res, next);
   });

router
   .route("/user/:userId/routines/:routineId/tasks")
   .post((req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      controller.createTask(req, res, next);
   });

router
   .route("/user/:userId/routines/:routineId/tasks/:taskId")
   .put((req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      controller.putTask(req, res, next);
   });

export { router as TaskRouter };
