import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Merchant } from "./Merchant";

@Entity()
export class MerchantBrand extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  logo: string;

  @Column()
  cashbackRate: number;

  @OneToMany(() => Merchant, (merchant) => merchant.merchantBrand)
  merchants: Merchant[];
}
