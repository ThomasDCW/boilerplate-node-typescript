import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Grade } from "./Grade";

@ObjectType()
@Entity()
export class Wilder {
  @Field((type) => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  city: string;

  @Field(() => [Grade])
  @OneToMany(() => Grade, (grade) => grade.wilder, { eager: true })
  grades: Grade[];
}
