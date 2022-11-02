import "reflect-metadata";
import { DataSource } from "typeorm";
import { AppUser } from "../entities/AppUser";
import { BankAccount } from "../entities/BankAccount";
import { Cashback } from "../entities/Cashback";
import { Merchant } from "../entities/Merchant";
import { MerchantBrand } from "../entities/MerchantBrand";
import { MerchantCategory } from "../entities/MerchantCategory";
import { Transaction } from "../entities/Transaction";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "klub",
  synchronize: true,
  logging: true,
  entities: [
    AppUser,
    BankAccount,
    Transaction,
    Merchant,
    MerchantCategory,
    MerchantBrand,
    Cashback,
  ],
  migrations: [],
  subscribers: [],
});
