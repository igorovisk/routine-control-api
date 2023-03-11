import {Request, Response, NextFunction, Router} from 'express'
import { AuthController } from '../controllers';


const controller = new AuthController();
const router =  Router()

router
  .route('/login$')
  .post((req: Request, res: Response, next: NextFunction) => {
    controller.login(req, res, next);
  });

export { router as AuthRouter };




