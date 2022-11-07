import { TransactionController } from "../controllers/TransactionController";

export const transactionRoutes = [
  {
    method: "get",
    route: "/api/user/:id/transactions",
    controller: TransactionController,
    action: "allTrxByClientId",
  },
  {
    method: "get",
    route: "/api/user/:id/cashbacks",
    controller: TransactionController,
    action: "allCashbackByClientId",
  },
];
