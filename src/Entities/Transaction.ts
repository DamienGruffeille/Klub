import {
  Entity,
  PrimaryColumn,
  Column,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { BankAccount } from "./BankAccount";

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
  merchantID: number;

  @Column({
    nullable: true,
  })
  userName: string;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.transactions)
  @JoinColumn({
    name: "bankAccount_id",
  })
  bankAccount: BankAccount;
}
