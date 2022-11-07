import { TransactionsWebhooks } from "../controllers/TransactionsWebhooks";

export const transactionsWebhooksRoutes = [
  {
    method: "post",
    route: "/api/webhooks/transactions",
    controller: TransactionsWebhooks,
    action: "save",
  },
];
