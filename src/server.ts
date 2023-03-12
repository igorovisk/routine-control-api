import express, { Express, Request, Response, json } from "express";
import { RoutineRouter, TaskRouter, UserRouter, AuthRouter } from "./v1/routes";
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.use(json());
app.get("/", function (req: Request, res: Response) {
   res.send("Server running...");
});

app.use(AuthRouter, UserRouter, TaskRouter, RoutineRouter);

export class Server {
   static async init(app: Express) {
      app.listen(port, () => console.info(`Server started on port ${port}`));
   }
}

Server.init(app);
