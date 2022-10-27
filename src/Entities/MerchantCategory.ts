import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Merchant } from "./Merchant";

@Entity()
export class MerchantCategory extends BaseEntity {
  @PrimaryColumn({
    unique: true,
  })
  code: number;

  @Column()
  name: string;

  @OneToMany(() => Merchant, (Merchant) => Merchant.merchantCategory)
  merchants: Merchant[];
}
