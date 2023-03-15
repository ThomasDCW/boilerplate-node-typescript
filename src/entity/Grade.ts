import { Entity, PrimaryColumn, ManyToOne, Column } from "typeorm";
import { Skill } from "./Skill";
import { Wilder } from "./Wilder";

@Entity()
export class Grade {
  @PrimaryColumn()
  wilderId: number;

  @PrimaryColumn()
  skillId: number;

  @Column()
  grade: number;

  @ManyToOne(() => Wilder, (wilder) => wilder.grades)
  wilder?: Wilder;

  @ManyToOne(() => Skill, (skill) => skill.grades)
  skill?: Skill;
}
