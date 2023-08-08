import { NextFunction, Request, Response, Router } from "express";
import { TaskController } from "../controllers";
import { JWTTokenUtils } from "../utils";
import { Middleware } from "../middlewares";

const controller = new TaskController();
const router = Router();
const middleware = new Middleware();

router
   .route("/users/:userId/routines/:routineId/tasks")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      await middleware.checkIfAdminMiddleware(req);
      await controller.getTasksByRoutine(req, res, next);
   });

router
   .route("/tasks")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      await middleware.checkIfAdminMiddleware(req);
      await controller.getAllTasks(req, res, next);
   });

router
   .route("/users/:userId/routines/:routineId/tasks/:taskId")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      await middleware.checkIfAdminMiddleware(req);
      await controller.getTaskById(req, res, next);
   });

router
   .route("/users/:userId/routines/:routineId/tasks")
   .post(async (req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      await controller.createTask(req, res, next);
   });

router
   .route("/users/:userId/routines/:routineId/tasks/:taskId")
   .put(async (req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      await controller.putTask(req, res, next);
   });

router
   .route("/users/:userId/routines/:routineId/tasks/:taskId")
   .delete(async (req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      await controller.deleteTask(req, res, next);
   });

//CHECK
router
   .route("/users/:userId/tasks/:taskId")
   .post(async (req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      await controller.checkTask(req, res, next);
   });
// UNCHECK
router
   .route("/users/:userId/tasks/:taskId/undo")
   .delete(async (req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      await controller.uncheckTask(req, res, next);
   });
export { router as TaskRouter };
