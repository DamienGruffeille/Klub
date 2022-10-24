import express, { Request, Response } from "express";

const router = express.Router();

router.use("/", (req: Request, res: Response) => {
  res.send({
    transaction: {
      id: "40695e2ae8c71302dc73bbb0",
      amount: {
        value: 199,
        unit: "cents",
        currency: "EUR",
      },
      type: "CARD_AUTHORIZATION",
      status: "OPEN",
      meta_info: {
        card_id: "efe766c766461593d151d12eb65d8",
        merchant: {
          id: "123",
          category_code: "4816",
          country_code: "FR",
          name: "PAYPAL *NETFLIX",
        },
      },
    },
  });
});

export default router;
