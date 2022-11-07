import { TransactionController } from "../controllers/TransactionController";

export const transactionRoutes = [
  {
    method: "get",
    route: "/user/:id/transactions",
    controller: TransactionController,
    action: "allTrxByClientId",
  },
  {
    method: "get",
    route: "/user/:id/cashbacks",
    controller: TransactionController,
    action: "allCashbackByClientId",
  },
];
