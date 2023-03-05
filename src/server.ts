import express, { Request, Response, json } from "express";
import { Express } from "express";
import { TaskRouter, UserRouter } from "./v1/routes";
require("dotenv").config();
const app = express();
const port = process.env.PORT;

app.use(json());
app.get("/", function (req: Request, res: Response) {
   res.send("Server running...");
});

app.use(UserRouter);
app.use(TaskRouter);

export class Server {
   static async init(app: Express) {
      app.listen(port, () => console.info(`Server started on port ${port}`));
   }
}

Server.init(app);
