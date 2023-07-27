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
      try {
         await middleware.checkIfAdminMiddleware(req);
         await controller.getAllRoutines(req, res, next);
      } catch (error) {
         const err = error as Error;
         res.status(401).json({ error: err.message });
      }
   });

router
   .route("/users/:userId/routines/:id")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      try {
         await middleware.checkIfAdminMiddleware(req);
         await controller.getRoutineById(req, res, next);
      } catch (error) {
         const err = error as Error;
         res.status(401).json({ error: err.message });
      }
   });

router
   .route("/users/:userId/routines")
   .post(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const token = JWTTokenUtils.formatToken(req.headers.cookie);
         JWTTokenUtils.verify(token);
         await controller.createRoutine(req, res, next);
      } catch (error) {
         const err = error as Error;
         res.status(401).json({ error: err.message });
      }
   });

router
   .route("/users/:userId/routines$")
   .put(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const token = JWTTokenUtils.formatToken(req.headers.cookie);
         JWTTokenUtils.verify(token);
         await controller.putRoutine(req, res, next);
      } catch (error) {
         const err = error as Error;
         res.status(401).json({ error: err.message });
      }
   });

router
   .route("/users/:userId/routines/:routineId")
   .delete(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const token = JWTTokenUtils.formatToken(req.headers.cookie);
         JWTTokenUtils.verify(token);
         await controller.deleteRoutine(req, res, next);
      } catch (error) {
         const err = error as Error;
         res.status(401).json({ error: err.message });
      }
   });

export { router as RoutineRouter };
