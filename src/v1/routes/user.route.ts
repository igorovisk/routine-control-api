import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers";
import { JWTTokenUtils } from "../utils";
import { Middleware } from "../middlewares";

const controller = new UserController();
const router = Router();
const middleware = new Middleware();

router
   .route("/me$")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      try {
         if (req.headers.cookie) {
            const token = JWTTokenUtils.formatToken(req.headers.cookie);
            JWTTokenUtils.verify(token);
            await controller.getMe(req, res, next);
         }
      } catch (error) {
         const err = error as Error;
         res.status(401).send({ error: err.message });
      }
   });

router
   .route("/users")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      try {
         await middleware.checkIfAdminMiddleware(req);
         await controller.getUsers(req, res, next);
      } catch (error) {
         const err = error as Error;
         res.status(401).json({ error: err.message });
      }
   });

router
   .route("/users/:userId")
   .get(async (req: Request, res: Response, next: NextFunction) => {
      try {
         await middleware.checkIfAdminMiddleware(req);
         await controller.getUserById(req, res, next);
      } catch (error) {
         const err = error as Error;
         res.status(401).json({ error: err.message });
      }
   });

router
   .route("/users/:userId")
   .put(async (req: Request, res: Response, next: NextFunction) => {
      try {
         const token = JWTTokenUtils.formatToken(req.headers.cookie);
         JWTTokenUtils.verify(token);
         await controller.updateUser(req, res, next);
      } catch (error) {
         const err = error as Error;
         res.status(401).json({ error: err.message });
      }
   });

router
   .route("/users")
   .post(async (req: Request, res: Response, next: NextFunction) => {
      try {
         await controller.createUser(req, res, next);
      } catch (error) {
         const err = error as Error;
         res.status(401).json({ error: err.message });
      }
   });

export { router as UserRouter };
