import "reflect-metadata";
import dataSource from "./utils";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import WilderResolver from "./resolver/WilderResolver";

const start = async (): Promise<void> => {
  await dataSource.initialize();

  const typeGraphQLgeneratedSchema = await buildSchema({
    resolvers: [WilderResolver],
  });

  const server = new ApolloServer({ schema: typeGraphQLgeneratedSchema });

  const { url } = await server.listen();
  console.log(`🚀  Server ready at ${url}`);
};

void start();
