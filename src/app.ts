import cors from "cors";
import express, { Application, Request, Response } from "express";

import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";
const app: Application = express();
const port = 3000;

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true })); // frontend e kaj korar somoy issue avoid korar jnno

// application routes. /api/v1/students ei route e gele student.routes e cole ashbe.
// zetay */create-student* ache
// eta ekhn routes.ts e ache
app.use("/api/v1", router);

const getController = (req: Request, res: Response) => {
  res.send("Hello from university!");
};

app.get("/", getController);

// **global error handler
app.use(globalErrorHandler);

// not found status
app.use(notFound);

export default app;
