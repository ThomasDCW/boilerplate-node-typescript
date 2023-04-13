import { Query, Resolver } from "type-graphql";
import { Skill } from "../entity/Skill";
import dataSource from "../utils";

@Resolver()
class SkillResolver {
  @Query(() => [Skill])
  async skills(): Promise<Skill[]> {
    const result = await dataSource
      .getRepository(Skill)
      .find({ relations: { grades: { wilder: true } } });
    return result;
  }
}
export default SkillResolver;
