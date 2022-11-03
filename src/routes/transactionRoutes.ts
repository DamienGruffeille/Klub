import { TransactionController } from "../controllers/TransactionController";

export const transactionRoutes = [
  {
    method: "get",
    route: "/transactions",
    controller: TransactionController,
    action: "all",
  },
  {
    method: "get",
    route: "/transactions/:id",
    controller: TransactionController,
    action: "one",
  },
  // {
  //   method: "post",
  //   route: "/webhooks/transactions",
  //   controller: TransactionController,
  //   action: "save",
  // },
];
