import express, { Express, Request, Response, json } from "express";
import { RoutineRouter, TaskRouter, UserRouter, AuthRouter } from "./v1/routes";
require("dotenv").config();
var cors = require("cors");
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyCw__fXboWweQqt3BIo43nkGq4EFUtqSlo",
   authDomain: "routine-control-93e9c.firebaseapp.com",
   projectId: "routine-control-93e9c",
   storageBucket: "routine-control-93e9c.appspot.com",
   messagingSenderId: "450951022448",
   appId: "1:450951022448:web:a55196e8e486d4dbadb1b5",
   measurementId: "G-7YEBHBHRD7",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

const app = express();
const port = process.env.PORT;
app.use(json());
app.use(cors());
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
