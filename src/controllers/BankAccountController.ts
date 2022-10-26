import { AppDataSource } from "../init/data-source";
import { NextFunction, Request, Response } from "express";
import { BankAccount } from "../entities/BankAccount";

export class BankAccountController {
  private bankAccountRepository = AppDataSource.getRepository(BankAccount);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.bankAccountRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    return this.bankAccountRepository.findOneBy({
      id: parseInt(request.params.id),
    });
  }

  async save(request: Request, response: Response, next: NextFunction) {
    return this.bankAccountRepository.save(request.body);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    let bankAccountToRemove = await this.bankAccountRepository.findOneBy({
      id: parseInt(request.params.id),
    });
    await this.bankAccountRepository.remove(bankAccountToRemove);
  }
}
