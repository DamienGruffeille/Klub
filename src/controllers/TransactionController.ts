import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../init/data-source";
import { Transaction } from "../entities/Transaction";
import { BankAccount } from "../entities/BankAccount";

export class TransactionController {
  private transactionRepository = AppDataSource.getRepository(Transaction);
  private bankAccountRepository = AppDataSource.getRepository(BankAccount);

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
      return this.transactionRepository.save({
        id: request.body.id,
        amount: request.body.amount.value,
        description: request.body.amount.unit,
        typeOfTransaction: request.body.type,
        merchantID: request.body.meta_info.merchant.id,
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
