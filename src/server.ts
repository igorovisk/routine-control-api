import "express-async-errors";
import express, {
   Express,
   NextFunction,
   Request,
   Response,
   json,
} from "express";
import { RoutineRouter, TaskRouter, UserRouter, AuthRouter } from "./v1/routes";
import { errorMiddleware } from "./v1/middlewares/errorMiddleware";
// import { Middleware } from "./v1/middlewares/middleware";
require("dotenv").config();
const port = process.env.PORT;
var cors = require("cors");
// const middleware = new Middleware();
const corsOrigin = {
   origin: true,
   credentials: true,
   optionSuccessStatus: 200,
};
const app = express();
export class Server {
   static async init(app: Express) {
      app.listen(port, () => console.info(`Server started on port ${port}`));
   }
}
app.get("/", function (req: Request, res: Response) {
   res.send("Server running...");
});
app.use(cors(corsOrigin));
// app.use((req, res, next) => {
//    middleware.loggerMiddleware(req, next);
// });
app.use(json());
app.use(AuthRouter, UserRouter, TaskRouter, RoutineRouter);
app.use(errorMiddleware);

Server.init(app);
