import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import { userRoutes } from "../routes/userRoutes";
import { bankAccountRoutes } from "../routes/bankAccountRoutes";
import { transactionRoutes } from "../routes/transactionRoutes";
import config from "../init/config";

function handleError(err, req, res, next) {
  res
    .status(err.statusCode || 500)
    .send({ message: +"Erreur ici" + err.message });
}

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    userRoutes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        async (req: Request, res: Response, next: Function) => {
          try {
            const result = await new (route.controller as any)()[route.action](
              req,
              res,
              next
            );
            res.json(result);
          } catch (error) {
            next(error); // le middleware par défaut next renvoie un html d'erreur
          }
        }
      );
    });

    bankAccountRoutes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        async (req: Request, res: Response, next: Function) => {
          try {
            const result = await new (route.controller as any)()[route.action](
              req,
              res,
              next
            );
            res.json(result);
          } catch (error) {
            next(error);
          }
        }
      );
    });

    transactionRoutes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        async (req: Request, res: Response, next: Function) => {
          try {
            const result = await new (route.controller as any)()[route.action](
              req,
              res,
              next
            );
            // res.json(result);
          } catch (error) {
            next(error);
          }
        }
      );
    });

    app.use(handleError);

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
