import express, { Express, Request, Response, json } from "express";
import { RoutineRouter, TaskRouter, UserRouter, AuthRouter } from "./v1/routes";
import { Middleware } from "./v1/middlewares/middleware";
require("dotenv").config();
const port = process.env.PORT;
var cors = require("cors");
const middleware = new Middleware();
const corsOrigin = {
   origin: "http://localhost:3000", //or whatever port your frontend is using
   credentials: true,
   optionSuccessStatus: 200,
};
const app = express();
app.use(cors(corsOrigin));
app.use((req, res, next) => {
   middleware.loggerMiddleware(req, next);
});
app.use(json());
app.use(AuthRouter, UserRouter, TaskRouter, RoutineRouter);

export class Server {
   static async init(app: Express) {
      app.listen(port, () => console.info(`Server started on port ${port}`));
   }
}

app.get("/", function (req: Request, res: Response) {
   res.send("Server running...");
});

Server.init(app);
