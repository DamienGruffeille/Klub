import "reflect-metadata";
import { DataSource } from "typeorm";
import { AppUser } from "../entities/AppUser";
import { BankAccount } from "../entities/BankAccount";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "klub",
  synchronize: true,
  logging: false,
  entities: [AppUser, BankAccount],
  migrations: [],
  subscribers: [],
});
