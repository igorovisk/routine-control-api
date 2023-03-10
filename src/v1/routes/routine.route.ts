import { NextFunction, Request, Response, Router } from "express";
import { RoutineController } from "../controllers";

const controller = new RoutineController();
const router = Router();

router
   .route("/routines$")
   .get((req: Request, res: Response, next: NextFunction) => {
      console.log("Get All Routines route called...");
      controller.getAllRoutines(req, res, next);
   });

router
   .route("/routines/:id")
   .get((req: Request, res: Response, next: NextFunction) => {
      console.log("Get Routine By Id route called...");
      controller.getRoutineById(req, res, next);
   });

router
   .route("/routines$")
   .post((req: Request, res: Response, next: NextFunction) => {
      console.log("Post Routine route called...");
      controller.createRoutine(req, res, next);
   });

router
   .route("/routines$")
   .put((req: Request, res: Response, next: NextFunction) => {
      console.log("Put Routine route called...");
      controller.createRoutine(req, res, next);
   });

export { router as RoutineRouter };
