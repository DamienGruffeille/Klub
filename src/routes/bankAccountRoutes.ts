import { BankAccountController } from "../controllers/BankAccountController";

export const bankAccountRoutes = [
  {
    method: "get",
    route: "/bankAccounts",
    controller: BankAccountController,
    action: "all",
  },
  {
    method: "get",
    route: "/bankAccounts/:id",
    controller: BankAccountController,
    action: "one",
  },
  {
    method: "get",
    route: "/bankAccounts/cardID/:cardID",
    controller: BankAccountController,
    action: "oneByCardID",
  },
  {
    method: "post",
    route: "/bankAccounts",
    controller: BankAccountController,
    action: "save",
  },
  {
    method: "delete",
    route: "/bankAccounts/:id",
    controller: BankAccountController,
    action: "remove",
  },
];
