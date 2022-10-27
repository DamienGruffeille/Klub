import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { AppUser } from "./AppUser";
import { Transaction } from "./Transaction";

@Entity()
export class BankAccount extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    length: 35,
  })
  ibanBic: string;

  @Column({
    unique: true,
  })
  cardID: string;

  @Column({
    type: "numeric",
  })
  balance: number;

  @OneToOne(() => AppUser, (appUser) => appUser.bankAccount, {
    onDelete: "NO ACTION",
  })
  @JoinColumn({
    name: "app_user_id",
  })
  appUser: AppUser;

  //fonction qui retourne une transaction
  @OneToMany(() => Transaction, (transaction) => transaction.bankAccount)
  transactions: Transaction[];
}
