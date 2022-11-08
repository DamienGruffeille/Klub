import { NextFunction, Request, Response } from "express";
import { Cashback } from "../entities/Cashback";
import { Transaction } from "../entities/Transaction";
import { AppDataSource } from "../init/data-source";

export class AdminRoutesController {
  private cashbackRepository = AppDataSource.getRepository(Cashback);
  private transactionRepository = AppDataSource.getRepository(Transaction);

  // Montant total des cashback par merchant
  async totalAmountCashbackByMerchant(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this.cashbackRepository
      .createQueryBuilder("cashback")
      .select("merchant.name")
      .addSelect("SUM(cashback.amount)", "Cashback-total")
      .innerJoin("cashback.transaction", "transaction")
      .innerJoin("transaction.merchant", "merchant")
      .groupBy("merchant.name")
      .orderBy("SUM(cashback.amount)", "DESC")
      .execute();
  }

  // Liste des merchants avec 2 acheteurs différents minimum
  async merchantListWith2DifferentBuyers(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this.transactionRepository
      .createQueryBuilder("transaction")
      .select("merchant.name")
      .addSelect("COUNT(DISTINCT transaction.bankAccount_id)", "Nb de trx")
      .innerJoin("transaction.merchant", "merchant")
      .where("transaction.dateOfTransaction >= :d1", { d1: "2022-11-06" })
      .andWhere("transaction.dateOfTransaction <= :d2", { d2: "2022-12-06" })
      .groupBy("merchant.name")
      .having("COUNT(DISTINCT transaction.bankAccount_id) >= :n", { n: "2" })
      .execute();
  }

  // TOP 10 des merchants non partenaires
  async topTenNonPartnerMerchant(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    return this.transactionRepository
      .createQueryBuilder("transaction")
      .select("merchant.id")
      .addSelect("merchant.name")
      .addSelect("COUNT(merchant.id)", "nb de trx")
      .innerJoin("transaction.merchant", "merchant")
      .where("merchant.partner = false")
      .groupBy("merchant.id")
      .orderBy("COUNT(merchant.id)", "DESC")
      .limit(10)
      .execute();
  }
}
