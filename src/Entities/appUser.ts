import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { BankAccount } from "./BankAccount";

@Entity()
export class AppUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  firstName: string;

  @Column({
    unique: true,
  })
  email: string;

  @OneToOne(() => BankAccount, (bankAccount) => bankAccount.appUser)
  bankAccount: BankAccount;
}
