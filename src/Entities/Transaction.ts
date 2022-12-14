import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
} from "typeorm";
import { BankAccount } from "./BankAccount";
import { Cashback } from "./Cashback";
import { Merchant } from "./Merchant";

export enum TransactionTypes {
  VIREMENT = "VIREMENT",
  CARD_AUTHORIZATION = "CARD_AUTHORIZATION",
  REFUND = "REFUND",
}

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column({
    type: "numeric",
  })
  amount: number;

  @Column()
  description: string;

  @Column({
    type: "enum",
    enum: TransactionTypes,
  })
  typeOfTransaction: string;

  @Column({
    nullable: true,
  })
  userName: string;

  @CreateDateColumn({
    type: "date",
  })
  dateOfTransaction: Date;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.transactions, {
    nullable: false,
  })
  @JoinColumn({
    name: "bankAccount_id",
  })
  bankAccount: BankAccount;

  @ManyToOne(() => Merchant, (merchant) => merchant.transactions)
  @JoinColumn()
  merchant: Merchant;

  @OneToOne(() => Cashback, (cashback) => cashback.transaction, {
    nullable: true,
  })
  @JoinColumn()
  cashback: Cashback;
}
