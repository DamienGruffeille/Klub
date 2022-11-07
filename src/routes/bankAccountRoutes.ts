import { BankAccountController } from "../controllers/BankAccountController";

export const bankAccountRoutes = [
  {
    method: "get",
    route: "/api/bankAccounts",
    controller: BankAccountController,
    action: "all",
  },
  {
    method: "get",
    route: "/api/bankAccounts/:id",
    controller: BankAccountController,
    action: "one",
  },
  {
    method: "get",
    route: "/api/bankAccounts/cardID/:cardID",
    controller: BankAccountController,
    action: "oneByCardID",
  },
  {
    method: "post",
    route: "/api/bankAccounts",
    controller: BankAccountController,
    action: "save",
  },
  {
    method: "delete",
    route: "/api/bankAccounts/:id",
    controller: BankAccountController,
    action: "remove",
  },
];
