import { TransactionsWebhooks } from "../controllers/TransactionsWebhooks";

export const transactionsWebhooksRoutes = [
  {
    method: "post",
    route: "/webhooks/transactions",
    controller: TransactionsWebhooks,
    action: "save",
  },
];
