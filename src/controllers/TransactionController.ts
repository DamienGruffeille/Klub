import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../init/data-source";
import { Transaction } from "../entities/Transaction";
import { BankAccount } from "../entities/BankAccount";
import { Merchant } from "../entities/Merchant";
import { MerchantCategory } from "../entities/MerchantCategory";
import { MerchantBrand } from "../entities/MerchantBrand";
import { Cashback } from "../entities/Cashback";

export class TransactionController {
  private transactionRepository = AppDataSource.getRepository(Transaction);
  private bankAccountRepository = AppDataSource.getRepository(BankAccount);
  private merchantRepository = AppDataSource.getRepository(Merchant);
  private merchantCategoryRepository =
    AppDataSource.getRepository(MerchantCategory);
  private merchantBrandRepository = AppDataSource.getRepository(MerchantBrand);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.transactionRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.transactionRepository.findOneBy({
      id: request.params.id,
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    switch (request.body.type) {
      case "CARD_AUTHORIZATION": {
        let merchantToUse: Merchant;

        const bankAccount: BankAccount =
          await this.bankAccountRepository.findOneBy({
            cardID: request.body.meta_info.card_id,
          });

        const merchant: Merchant = await this.merchantRepository.findOneBy({
          id: parseInt(request.body.meta_info.merchant.id),
        });

        const merchantCategory: MerchantCategory =
          await this.merchantCategoryRepository.findOneBy({
            code: parseInt(request.body.meta_info.merchant.category_code),
          });

        if (!merchant) {
          merchantToUse = await this.merchantRepository.save({
            id: request.body.meta_info.merchant.id,
            name: request.body.meta_info.merchant.name,
            description: "unknown merchant",
            merchantCategory: merchantCategory,
          });
        } else {
          merchantToUse = merchant;

          if (merchantToUse.partner) {
            console.log("ce Merchant est partenaire !!!!!!!");

            const cashback = await this.merchantBrandRepository
              .createQueryBuilder("merchant_brand")
              .select("merchant_brand.cashbackRate")
              .leftJoinAndSelect("merchant_brand.merchants", "merchant")
              .where("merchant.id = :merchantId", {
                merchantId: request.body.meta_info.merchant.id,
              })
              .getOne();

            console.log("Le cashback 2 est de : " + cashback.cashbackRate);

            // Calculer le montant du cashback
            const cashbackAmount =
              (request.body.amount.value * cashback.cashbackRate) / 100;
            // Créer le cashback
          }
        }

        return this.transactionRepository.save({
          id: request.body.id,
          amount: request.body.amount.value,
          description: request.body.amount.unit,
          typeOfTransaction: request.body.type,
          bankAccount: bankAccount,
          merchant: merchantToUse,
        });
      }
      case "VIREMENT": {
        const bankAccount: BankAccount = await this.bankAccountRepository
          .createQueryBuilder("bank_account")
          .select("bank_account")
          .leftJoinAndSelect("bank_account.appUser", "app_user")
          .where("app_user.name = :userName", {
            userName: request.body.meta_info.user_name,
          })
          .getOne();
        return this.transactionRepository.save({
          id: request.body.id,
          amount: request.body.amount.value,
          description: request.body.amount.unit,
          typeOfTransaction: request.body.type,
          userName: request.body.meta_info.user_name,
          bankAccount: bankAccount,
        });
      }
    }
  }
}
