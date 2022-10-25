import "reflect-metadata";
import { DataSource } from "typeorm";
import { AppUser } from "../Entities/appUser";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "klub",
  synchronize: true,
  logging: false,
  entities: [AppUser],
  migrations: [],
  subscribers: [],
});
