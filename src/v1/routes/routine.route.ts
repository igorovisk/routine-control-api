import { NextFunction, Request, Response, Router } from "express";
import { RoutineController } from "../controllers";
import { JWTTokenUtils } from "../utils";
import { Middleware } from "../middlewares";

const controller = new RoutineController();
const router = Router();
const middleware = new Middleware();

router
   .route("/user/:userId/routines$")
   .get((req: Request, res: Response, next: NextFunction) => {
      middleware.checkIfAdminMiddleware(req);
      controller.getAllRoutines(req, res, next);
   });

router
   .route("/user/:userId/routines/:id")
   .get((req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      controller.getRoutineById(req, res, next);
   });

router
   .route("/user/:userId/routines$")
   .post((req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      controller.createRoutine(req, res, next);
   });

router
   .route("/user/:userId/routines$")
   .put((req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      controller.createRoutine(req, res, next);
   });

export { router as RoutineRouter };
