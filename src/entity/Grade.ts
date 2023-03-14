import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { Skill } from "./Skill";
import { Wilder } from "./Wilder";

@Entity()
export class Grade {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value?: number;

  @ManyToOne(() => Wilder, (wilder) => wilder.grades)
  wilder?: Wilder;

  @ManyToOne(() => Skill, (skill) => skill.grades)
  skill?: Skill;
}
