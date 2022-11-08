import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import { userRoutes } from "../routes/userRoutes";
import { bankAccountRoutes } from "../routes/bankAccountRoutes";
import { transactionRoutes } from "../routes/transactionRoutes";
import config from "../init/config";
import { transactionsWebhooksRoutes } from "../routes/transactionsWebhooksRoutes";
import { adminRoutes } from "../routes/adminRoutes";
import { AppUser } from "../entities/AppUser";
import { BankAccount } from "../entities/BankAccount";
import { MerchantCategory } from "../entities/MerchantCategory";
import { Merchant } from "../entities/Merchant";
import { MerchantBrand } from "../entities/MerchantBrand";
import { Transaction } from "../entities/Transaction";
import { Cashback } from "../entities/Cashback";

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
            res.json(result);
          } catch (error) {
            next(error);
          }
        }
      );
    });

    transactionsWebhooksRoutes.forEach((route) => {
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

    adminRoutes.forEach((route) => {
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

    app.use(handleError);

    // start express server
    app.listen(config.port);

    // insert new users for test
    const user1 = await AppDataSource.manager.save(AppUser, {
      name: "Bette",
      firstName: "Elisa",
      email: "eb@gmail.com",
    });
    const user2 = await AppDataSource.manager.save(AppUser, {
      name: "Boule",
      firstName: "Bill",
      email: "bb@gmail.com",
    });

    const ba1 = await AppDataSource.manager.save(BankAccount, {
      ibanBic: "AGRIMQMXFR7628521966142334508845001",
      cardID: "efe766c766461593d151d12eb65d8",
      balance: 100000,
      appUser: user1,
    });

    const ba2 = await AppDataSource.manager.save(BankAccount, {
      ibanBic: "AGRIMQMXFR7628521966142334508845002",
      cardID: "efe766c766461593d151d12eb65d2",
      balance: 100000,
      appUser: user2,
    });

    const merchCat1 = await AppDataSource.manager.save(MerchantCategory, {
      code: 4816,
      name: "Merch Cat",
    });

    const merchBrand1 = await AppDataSource.manager.save(MerchantBrand, {
      name: "Netflix",
      cashbackRate: 100,
    });

    const merch1 = await AppDataSource.manager.save(Merchant, {
      id: 123,
      name: "PAYPAL *NETFLIX",
      partner: true,
      description: "Plateforme streaming",
      merchantCategory: merchCat1,
      merchantBrand: merchBrand1,
    });
    const merch2 = await AppDataSource.manager.save(Merchant, {
      id: 124,
      name: "CARREFOUR",
      partner: false,
      description: "Pour faire les courses",
      merchantCategory: merchCat1,
    });
    const merch3 = await AppDataSource.manager.save(Merchant, {
      id: 125,
      name: "AUCHAN",
      partner: false,
      description: "Pour faire les courses",
      merchantCategory: merchCat1,
    });
    const merch4 = await AppDataSource.manager.save(Merchant, {
      id: 126,
      name: "LIDL",
      partner: false,
      description: "Pour faire les courses",
      merchantCategory: merchCat1,
    });

    const cb1 = await AppDataSource.manager.save(Cashback, {
      amount: 199,
      status: "VALIDATED",
    });

    await AppDataSource.manager.save(Transaction, {
      id: "40695e2ae8c71302dc73bbb0",
      amount: 199,
      description: "un achat",
      typeOfTransaction: "CARD_AUTHORIZATION",
      bankAccount: ba1,
      merchant: merch1,
      cashback: cb1,
    });

    await AppDataSource.manager.save(Transaction, {
      id: "40695e2ae8c71302dc73bbb1",
      amount: 25990,
      description: "un achat",
      typeOfTransaction: "CARD_AUTHORIZATION",
      bankAccount: ba1,
      merchant: merch2,
    });
    await AppDataSource.manager.save(Transaction, {
      id: "40695e2ae8c71302dc73bbb2",
      amount: 34900,
      description: "un achat",
      typeOfTransaction: "CARD_AUTHORIZATION",
      bankAccount: ba2,
      merchant: merch2,
    });
    await AppDataSource.manager.save(Transaction, {
      id: "40695e2ae8c71302dc73bbb3",
      amount: 6990,
      description: "un achat",
      typeOfTransaction: "CARD_AUTHORIZATION",
      bankAccount: ba1,
      merchant: merch3,
    });
    await AppDataSource.manager.save(Transaction, {
      id: "40695e2ae8c71302dc73bbb4",
      amount: 7990,
      description: "un achat",
      typeOfTransaction: "CARD_AUTHORIZATION",
      bankAccount: ba1,
      merchant: merch3,
    });
    await AppDataSource.manager.save(Transaction, {
      id: "40695e2ae8c71302dc73bbb5",
      amount: 8990,
      description: "un achat",
      typeOfTransaction: "CARD_AUTHORIZATION",
      bankAccount: ba1,
      merchant: merch4,
    });
    await AppDataSource.manager.save(Transaction, {
      id: "40695e2ae8c71302dc73bbb6",
      amount: 9990,
      description: "un achat",
      typeOfTransaction: "CARD_AUTHORIZATION",
      bankAccount: ba2,
      merchant: merch2,
    });
    await AppDataSource.manager.save(Transaction, {
      id: "40695e2ae8c71302dc73bbb7",
      amount: 10990,
      description: "un achat",
      typeOfTransaction: "CARD_AUTHORIZATION",
      bankAccount: ba2,
      merchant: merch2,
    });
    await AppDataSource.manager.save(Transaction, {
      id: "40695e2ae8c71302dc73bbb8",
      amount: 11990,
      description: "un achat",
      typeOfTransaction: "CARD_AUTHORIZATION",
      bankAccount: ba2,
      merchant: merch2,
    });
    await AppDataSource.manager.save(Transaction, {
      id: "40695e2ae8c71302dc73bbb9",
      amount: 12990,
      description: "un achat",
      typeOfTransaction: "CARD_AUTHORIZATION",
      bankAccount: ba2,
      merchant: merch3,
    });
    await AppDataSource.manager.save(Transaction, {
      id: "40695e2ae8c71302dc73bbc0",
      amount: 13990,
      description: "un achat",
      typeOfTransaction: "CARD_AUTHORIZATION",
      bankAccount: ba2,
      merchant: merch3,
    });

    console.log(`Express server has started on port ${config.port}.`);
  })
  .catch((error) => console.log(error));
