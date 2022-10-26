import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import { userRoutes } from "../routes/userRoutes";
import { bankAccountRoutes } from "../routes/bankAccountRoutes";
import config from "../init/config";

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    userRoutes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    bankAccountRoutes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(config.port);

    // insert new users for test
    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(AppUser, {
    //     name: "Timber",
    //     firstName: "Saw",
    //     email: "tsaw@gmail.com",
    //   })
    // );

    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(AppUser, {
    //     name: "Phantom",
    //     firstName: "Assassin",
    //     email: "passassin@gmail.com",
    //   })
    // );

    console.log(`Express server has started on port ${config.port}.`);
  })
  .catch((error) => console.log(error));
