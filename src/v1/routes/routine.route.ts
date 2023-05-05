import { NextFunction, Request, Response, Router } from "express";
import { RoutineController } from "../controllers";
import { JWTTokenUtils } from "../utils";

const controller = new RoutineController();
const router = Router();

router
   .route("/user/:userId/routines$")
   .get((req: Request, res: Response, next: NextFunction) => {
      const token = JWTTokenUtils.formatToken(req.headers.cookie);
      JWTTokenUtils.verify(token);
      //TODO PASSAR NO REQ HEADERS? ONDE PASSAR O ROLE PARA O REPOSITORY RETORNAR TODAS AS ROTINAS?
      //TODO OU POSSO CRIAR OUTRA ROTA CHAMADA SÓ ROTINAS PARA RETORNAR TUDO E SOMENTE ADM PODE USAR
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
