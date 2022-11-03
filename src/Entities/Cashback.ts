import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Transaction } from "./Transaction";

export enum CashbackStatus {
  ON_HOLD = "ON HOLD",
  VALIDATED = "VALIDATED",
  CANCELLED = "CANCELLED",
}

@Entity()
export class Cashback extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "numeric",
  })
  amount: number;

  @Column({
    type: "enum",
    enum: CashbackStatus,
    default: "ON HOLD",
  })
  status: string;

  @OneToOne(() => Transaction, (transaction) => transaction.cashback)
  transaction: Transaction;
}
