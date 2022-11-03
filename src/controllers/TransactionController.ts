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
  private cashbackRepository = AppDataSource.getRepository(Cashback);

  // Affichage de toutes les transactions
  async all(request: Request, response: Response, next: NextFunction) {
    return this.transactionRepository.find();
  }

  // Affichage d'une transaction par ID
  async one(request: Request, response: Response, next: NextFunction) {
    return this.transactionRepository.findOneBy({
      id: request.params.id,
    });
  }

  // // Enregistrement d'une transaction
  // async save(request: Request, response: Response, next: NextFunction) {
  //   switch (request.body.type) {
  //     case "CARD_AUTHORIZATION": {
  //       let merchantToUse: Merchant;
  //       let cashback: Cashback | null;

  //       // Recherche dans la BDD du BankAccount en fonction du card_id présent dans la transaction
  //       // reçue du partenaire bancaire
  //       const bankAccount: BankAccount =
  //         await this.bankAccountRepository.findOneBy({
  //           cardID: request.body.meta_info.card_id,
  //         });

  //       // Recherche du Merchant indiqué dans la transaction reçue dans la BDD
  //       const merchant: Merchant = await this.merchantRepository.findOneBy({
  //         id: parseInt(request.body.meta_info.merchant.id),
  //       });

  //       // Recherche de la catégorie du Merchant
  //       const merchantCategory: MerchantCategory =
  //         await this.merchantCategoryRepository.findOneBy({
  //           code: parseInt(request.body.meta_info.merchant.category_code),
  //         });

  //       //Création du Merchant s'il n'existe pas dans la table
  //       if (!merchant) {
  //         merchantToUse = await this.merchantRepository.save({
  //           id: request.body.meta_info.merchant.id,
  //           name: request.body.meta_info.merchant.name,
  //           description: "unknown merchant",
  //           merchantCategory: merchantCategory,
  //         });
  //       } else {
  //         merchantToUse = merchant;

  //         // Si le Merchant existe dans la base, vérification s'il est partenaire
  //         // Afin d'attribuer le cashback
  //         if (merchantToUse.partner) {
  //           console.log("ce Merchant est partenaire !!!!!!!");

  //           // Récupération du taux de cashback du Merchant partenaire
  //           const cashbackRate = await this.merchantBrandRepository
  //             .createQueryBuilder("merchant_brand")
  //             .select("merchant_brand.cashbackRate")
  //             .leftJoinAndSelect("merchant_brand.merchants", "merchant")
  //             .where("merchant.id = :merchantId", {
  //               merchantId: request.body.meta_info.merchant.id,
  //             })
  //             .getOne();

  //           console.log(
  //             "Le taux de cashback est de : " + cashbackRate.cashbackRate + " %"
  //           );

  //           // Calcul du montant du cashback et conversion de cents en euros
  //           const cashbackAmount: number =
  //             (request.body.amount.value * cashbackRate.cashbackRate) / 10000;
  //           console.log("Le montant du cashback est de : " + cashbackAmount);

  //           // Création du cashback
  //           cashback = await this.cashbackRepository.save({
  //             amount: cashbackAmount,
  //           });
  //         } else {
  //           console.log(
  //             "Ce Merchant n'est pas partenaire, il n'y a pas de cashback !"
  //           );
  //           cashback = null;
  //         }
  //       }

  //       // Enregistrement de la transaction, puis changement du statut du cashback
  //       // si la transaction a bien pu être enregistrée
  //       try {
  //         await this.transactionRepository.save({
  //           id: request.body.id,
  //           amount: request.body.amount.value,
  //           description: request.body.amount.unit,
  //           typeOfTransaction: request.body.type,
  //           bankAccount: bankAccount,
  //           merchant: merchantToUse,
  //           cashback: cashback,
  //         });

  //         // S'il y a un cashback pour cette trx, mise à jour de son statut
  //         if (cashback) {
  //           await this.cashbackRepository
  //             .createQueryBuilder()
  //             .update("cashback")
  //             .set({ status: "VALIDATED" })
  //             .where("id = :id", { id: cashback.id })
  //             .execute();
  //         }

  //         // Mise à jour de la balance du bankAccount
  //         console.log("Solde actuel : " + bankAccount.balance);
  //         console.log("Montant de la trx :" + request.body.amount.value / 100);
  //         console.log("Montant du cashback :" + cashback.amount);
  //         const newBalance =
  //           bankAccount.balance -
  //           request.body.amount.value / 100 +
  //           cashback.amount;

  //         console.log("Nouveau solde : " + newBalance);

  //         await this.bankAccountRepository
  //           .createQueryBuilder()
  //           .update("bank_account")
  //           .set({ balance: newBalance })
  //           .where("id = :id", { id: bankAccount.id })
  //           .execute();

  //         return response
  //           .status(201)
  //           .json({ message: "La transaction CB a bien été enregitrée" });
  //       } catch (error) {
  //         console.log("Error : " + error.message);
  //         return response
  //           .status(400)
  //           .json({ message: "La transaction CB n'a pas pu être enregistrée" });
  //       }
  //     }
  //     case "VIREMENT": {
  //       const bankAccount: BankAccount = await this.bankAccountRepository
  //         .createQueryBuilder("bank_account")
  //         .select("bank_account")
  //         .leftJoinAndSelect("bank_account.appUser", "app_user")
  //         .where("app_user.name = :userName", {
  //           userName: request.body.meta_info.user_name,
  //         })
  //         .getOne();

  //       try {
  //         await this.transactionRepository.save({
  //           id: request.body.id,
  //           amount: request.body.amount.value,
  //           description: request.body.amount.unit,
  //           typeOfTransaction: request.body.type,
  //           userName: request.body.meta_info.user_name,
  //           bankAccount: bankAccount,
  //         });
  //         return response
  //           .status(201)
  //           .json({ message: "La transaction Virement a bien été enregitrée" });
  //       } catch (error) {
  //         console.log("Error : " + error.message);
  //         return response.status(400).json({
  //           message: "La transaction Virement n'a pas pu être enregitrée",
  //         });
  //       }
  //     }
  //   }
  // }
}
