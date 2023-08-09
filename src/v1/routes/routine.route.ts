import { NextFunction, Request, Response, Router } from "express";
import { RoutineController } from "../controllers";
import { JWTTokenUtils } from "../utils";
import { Middleware } from "../middlewares";

const controller = new RoutineController();
const router = Router();
const middleware = new Middleware();

router
   .route("/users/:userId/routines")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      await middleware.checkIfAdminMiddleware(req);
      await controller.getAllRoutines(req, res, next);
   });

router
   .route("/users/:userId/routines/:routineId")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      await middleware.checkIfAdminMiddleware(req);
      await controller.getRoutineById(req, res, next);
   });

router
   .route("/users/:userId/routines")
   .post(async (req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      await controller.createRoutine(req, res, next);
   });

router
   .route("/users/:userId/routines/:routineId")
   .put(async (req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      await controller.putRoutine(req, res, next);
   });

router
   .route("/users/:userId/routines/:routineId")
   .delete(async (req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      await controller.deleteRoutine(req, res, next);
   });

export { router as RoutineRouter };
