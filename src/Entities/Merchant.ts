import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { MerchantCategory } from "./MerchantCategory";
import { Transaction } from "./Transaction";

@Entity()
export class Merchant extends BaseEntity {
  @PrimaryColumn({
    unique: true,
  })
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;

  @Column()
  description: string;

  @ManyToOne(
    () => MerchantCategory,
    (merchantCategory) => merchantCategory.merchants,
    { nullable: false }
  )
  @JoinColumn({
    name: "merchant_category",
  })
  merchantCategory: MerchantCategory;

  @OneToMany(() => Transaction, (transaction) => transaction.merchant)
  transactions: Transaction[];
}
