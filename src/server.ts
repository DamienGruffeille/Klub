import app from "./init/app";
import { Request, Response } from "express";

app.use("/", (req: Request, res: Response) => {
  res.send({ test: 1 });
});
