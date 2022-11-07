import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../init/data-source";
import { Transaction } from "../entities/Transaction";

export class TransactionController {
  private transactionRepository = AppDataSource.getRepository(Transaction);

  // Affichage de toutes les transactions par client ID
  async allTrxByClientId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this.transactionRepository
      .createQueryBuilder("transaction")
      .select("transaction.id")
      .addSelect("merchant.name")
      .addSelect("transaction.amount")
      .addSelect("cashback.amount")
      .addSelect("cashback.status")
      .innerJoin("transaction.merchant", "merchant")
      .innerJoin("transaction.bankAccount", "bankAccount")
      .innerJoin("bankAccount.appUser", "appUser")
      .leftJoin("transaction.cashback", "cashback")
      .where("appUser.id = :id", {
        id: parseInt(request.params.id),
      })
      .orderBy("transaction.amount", "DESC")
      .execute();
  }

  // Affichage de tous les cashbacks par client ID
  async allCashbackByClientId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this.transactionRepository
      .createQueryBuilder()
      .from("cashback", "cashback")
      .select("merchant.name")
      .addSelect("cashback.amount")
      .addSelect("cashback.status")
      .addSelect("transaction.id")
      .leftJoin("cashback.transaction", "transaction")
      .innerJoin("transaction.bankAccount", "bankAccount")
      .innerJoin("transaction.merchant", "merchant")
      .innerJoin("bankAccount.appUser", "appUser")
      .where("appUser.id = :id", {
        id: parseInt(request.params.id),
      })
      .orderBy("cashback.amount", "DESC")
      .execute();
  }
}
