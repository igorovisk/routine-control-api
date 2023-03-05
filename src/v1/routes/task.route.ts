import { NextFunction, Request, Response, Router } from "express";
import { TaskController } from "../controllers";

const controller = new TaskController();
const router = Router();

router
   .route("/tasks$")
   .get((req: Request, res: Response, next: NextFunction) => {
      console.log("Get All Tasks route called...");
      controller.getAllTasks(req, res, next);
   });

router
   .route("/tasks/:id")
   .get((req: Request, res: Response, next: NextFunction) => {
      console.log("Get Task By Id route called...");
      controller.getTaskById(req, res, next);
   });

router
   .route("/tasks$")
   .post((req: Request, res: Response, next: NextFunction) => {
      console.log("Post Task route called...");
      controller.createTask(req, res, next);
   });

router
   .route("/tasks$")
   .put((req: Request, res: Response, next: NextFunction) => {
      console.log("Put Task route called...");
      controller.createTask(req, res, next);
   });

export { router as TaskRouter };
