import { NextFunction, Request, Response, Router } from "express";
import { RoutineController } from "../controllers";
import { JWTTokenUtils } from "../utils";

const controller = new RoutineController();
const router = Router();

router
   .route("/routines$")
   .get((req: Request, res: Response, next: NextFunction) => {
      const token = req.headers["x-access-token"] as string;
      JWTTokenUtils.verify(token);
      controller.getAllRoutines(req, res, next);
   });

router
   .route("/routines/:id")
   .get((req: Request, res: Response, next: NextFunction) => {
      const token = req.headers["x-access-token"] as string;
      JWTTokenUtils.verify(token);
      controller.getRoutineById(req, res, next);
   });

router
   .route("/routines$")
   .post((req: Request, res: Response, next: NextFunction) => {
      const token = req.headers["x-access-token"] as string;
      JWTTokenUtils.verify(token);
      controller.createRoutine(req, res, next);
   });

router
   .route("/routines$")
   .put((req: Request, res: Response, next: NextFunction) => {
      const token = req.headers["x-access-token"] as string;
      JWTTokenUtils.verify(token);
      controller.createRoutine(req, res, next);
   });

export { router as RoutineRouter };
