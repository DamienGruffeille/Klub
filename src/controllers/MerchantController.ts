import { AppDataSource } from "../init/data-source";
import { NextFunction, Request, Response } from "express";
import { Merchant } from "../entities/Merchant";

export class MerchantController {
  private merchantRepository = AppDataSource.getRepository(Merchant);

  async one(request: Request, response: Response, next: NextFunction) {
    return this.merchantRepository.findOneBy({
      id: parseInt(request.params.merchantID),
    });
  }
}
