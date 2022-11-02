import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { MerchantBrand } from "./MerchantBrand";
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

  @Column({
    default: false,
  })
  partner: boolean;

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

  @ManyToOne(() => MerchantBrand, (merchantBrand) => merchantBrand.merchants, {
    nullable: true,
  })
  @JoinColumn({
    name: "merchantBrand_id",
  })
  merchantBrand: MerchantBrand;

  @OneToMany(() => Transaction, (transaction) => transaction.merchant)
  transactions: Transaction[];
}
