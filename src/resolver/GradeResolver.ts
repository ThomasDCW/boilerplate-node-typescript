import { Query, Resolver } from "type-graphql";
import { Grade } from "../entity/Grade";
import dataSource from "../utils";

@Resolver()
class GradeResolver {
  @Query(() => [Grade])
  async grades(): Promise<Grade[]> {
    const result = await dataSource
      .getRepository(Grade)
      .find({ relations: { skill: true, wilder: true } });
    return result;
  }
}

export default GradeResolver;
