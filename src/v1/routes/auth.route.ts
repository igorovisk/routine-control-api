import { Request, Response, NextFunction, Router } from "express";
import { AuthController } from "../controllers";

const controller = new AuthController();
const router = Router();

router
   .route("/login$")
   .post(async (req: Request, res: Response, next: NextFunction) => {
      await controller.login(req, res, next);
   });

router
   .route("/logout$")
   .post(async (req: Request, res: Response, next: NextFunction) => {
      await controller.logout(req, res, next);
   });

export { router as AuthRouter };
