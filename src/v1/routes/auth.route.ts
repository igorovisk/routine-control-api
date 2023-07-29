import { Request, Response, NextFunction, Router } from "express";
import { AuthController } from "../controllers";

const controller = new AuthController();
const router = Router();

router
   .route("/login$")
   .post(async (req: Request, res: Response, next: NextFunction) => {
      try {
         await controller.login(req, res, next);
      } catch (error) {
         const err = error as Error;
         res.status(401).json({ error: err.message });
      }
   });

router
   .route("/logout$")
   .post(async (req: Request, res: Response, next: NextFunction) => {
      try {
         await controller.logout(req, res, next);
      } catch (error) {
         const err = error as Error;
         res.status(401).json({ error: err.message });
      }
   });

export { router as AuthRouter };
