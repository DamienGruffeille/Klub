import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { AppUser } from "./AppUser";

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
    type: "numeric",
  })
  balance: number;

  @OneToOne(() => AppUser, (appUser) => appUser.bankAccount)
  @JoinColumn({
    name: "app_user_id",
  })
  appUser: AppUser;
}
