import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../init/data-source";
import { Transaction } from "../entities/Transaction";
import { BankAccount } from "../entities/BankAccount";
import { Merchant } from "../entities/Merchant";

export class TransactionController {
  private transactionRepository = AppDataSource.getRepository(Transaction);
  private bankAccountRepository = AppDataSource.getRepository(BankAccount);
  private merchantRepository = AppDataSource.getRepository(Merchant);

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

      const merchant = await this.merchantRepository.findOneBy({
        id: parseInt(request.body.meta_info.merchant.id),
      });

      if (!merchant) {
        // Enregistrer dans la table UnknownMerchant
      }
      return this.transactionRepository.save({
        id: request.body.id,
        amount: request.body.amount.value,
        description: request.body.amount.unit,
        typeOfTransaction: request.body.type,
        merchant: merchant,
        bankAccount: bankAccount,
      });
    } else if (request.body.type === "VIREMENT") {
      return this.transactionRepository.save({
        id: request.body.id,
        amount: request.body.amount.value,
        description: request.body.amount.unit,
        typeOfTransaction: request.body.type,
        userName: request.body.meta_info.card_id,
      });
    }
  }
}
