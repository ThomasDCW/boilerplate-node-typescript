import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Wilder } from "../entity/Wilder";
import dataSource from "../utils";
import { DeletedResult } from "../entity/DeletedResult";
import { DeleteResult } from "typeorm";

@Resolver()
class WilderResolver {
  @Query(() => [Wilder])
  async wilders(): Promise<Wilder[]> {
    const result = await dataSource
      .getRepository(Wilder)
      .find({ relations: { grades: { skill: true } } });
    return result;
  }

  @Mutation(() => Wilder)
  async createWilder(
    @Arg("city") city: string,
    @Arg("name") name: string
  ): Promise<Wilder> {
    const newWilder = await dataSource
      .getRepository(Wilder)
      .save({ name, city });
    return newWilder;
  }

  @Mutation(() => DeletedResult)
  async deletedWilder(@Arg("id") id: number): Promise<DeleteResult> {
    const deletedWilder = await dataSource.getRepository(Wilder).delete({ id });
    return deletedWilder;
  }
}

export default WilderResolver;
