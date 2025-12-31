import dotenv from "dotenv";
import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";

dotenv.config();

import router from "./src/routes";
import {
  responseInternalServerError,
  responseNotFound,
} from "./src/libs/response";

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use((req: Request, res: Response, next: NextFunction) => {
  responseNotFound(res, "Service Not Found");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  responseInternalServerError(res, "Internal Server Error");
});

app.listen(port, () => {
  console.info(`[server] server is running on port: ${port}`);
});
