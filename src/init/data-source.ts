import "reflect-metadata";
import { DataSource } from "typeorm";
import { AppUser } from "../entities/AppUser";
import { BankAccount } from "../entities/BankAccount";
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
  entities: [AppUser, BankAccount, Transaction],
  migrations: [],
  subscribers: [],
});
