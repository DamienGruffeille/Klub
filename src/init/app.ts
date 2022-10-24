import express, { Express } from "express";
import config from "./config";
import transactions from "../routes/transactions";

const app: Express = express();

app.listen(config.port);

app.use("/webhooks/transactions", transactions);

export default app;
