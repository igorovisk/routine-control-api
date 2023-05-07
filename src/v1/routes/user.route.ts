import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers";
import { JWTTokenUtils } from "../utils";
import { Middleware } from "../middlewares";

const controller = new UserController();
const router = Router();
const middleware = new Middleware();

router.route("/me$").get((req: Request, res: Response, next: NextFunction) => {
   const token = JWTTokenUtils.formatToken(req.headers.cookie);
   JWTTokenUtils.verify(token);
   controller.getMe(req, res, next);
});

router
   .route("/users$")
   .get((req: Request, res: Response, next: NextFunction) => {
      try {
         middleware.checkIfAdminMiddleware(req, res, next);
         controller.getUsers(req, res, next);
      } catch (error) {
         const err = error as Error;
         console.error(error);
         res.status(401).json({ error: err.message });
      }
   });

router
   .route("/users/:userId")
   .get((req: Request, res: Response, next: NextFunction) => {
      try {
         middleware.checkIfAdminMiddleware(req, res, next);
         controller.getUserById(req, res, next);
      } catch (error) {
         const err = error as Error;
         console.error(error);
         res.status(401).json({ error: err.message });
      }
   });

router
   .route("/users/:userId")
   .put( (req: Request, res: Response, next: NextFunction) => {
      try {
          middleware.checkIfAdminMiddleware(req, res, next);
         controller.updateUser(req, res, next);
      } catch (error) {
         const err = error as Error;
         console.error(error);
         res.status(401).json({ error: err.message });
      }
   });

router
   .route("/users$")
   .post((req: Request, res: Response, next: NextFunction) => {
      try {
         controller.createUser(req, res, next);
      } catch (error) {
         const err = error as Error;
         console.error(error);
         res.status(401).json({ error: err.message });
      }
   });

export { router as UserRouter };
