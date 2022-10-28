import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../init/data-source";
import { Transaction } from "../entities/Transaction";
import { BankAccount } from "../entities/BankAccount";
import { AppUser } from "../entities/AppUser";

export class TransactionController {
  private transactionRepository = AppDataSource.getRepository(Transaction);
  private bankAccountRepository = AppDataSource.getRepository(BankAccount);
  private appUserRepository = AppDataSource.getRepository(AppUser);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.transactionRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.transactionRepository.findOneBy({
      id: request.params.id,
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    if (request.body.type === "CARD_AUTHORIZATION") {
      const bankAccount = await this.bankAccountRepository.findOneBy({
        cardID: request.body.meta_info.card_id,
      });

      return this.transactionRepository.save({
        id: request.body.id,
        amount: request.body.amount.value,
        description: request.body.amount.unit,
        typeOfTransaction: request.body.type,
        merchantID: request.body.meta_info.merchant.id,
        merchantCategoryCode: request.body.meta_info.merchant.category_code,
        merchantName: request.body.meta_info.merchant.name,
        merchantCountryCode: request.body.meta_info.merchant.country_code,
        bankAccount: bankAccount,
      });
    } else if (request.body.type === "VIREMENT") {
      const bankAccount = await this.bankAccountRepository
        .createQueryBuilder("bank_account")
        .select("bank_account")
        // .from(BankAccount, "")
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
