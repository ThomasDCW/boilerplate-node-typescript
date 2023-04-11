import { ApolloServer, gql } from 'apollo-server';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

const typeDefs = gql`

  type Wilder {
    name: String
    city: String
    skills: [Skill]
  }
  type Skill {
    name: String
  }

  type Query {
    wilders: [Wilder]
    skills:[Skill]
  }
`;

const skills=[
  {
    name:"JS"
  },
  {
    name:"PHP"
  }
]

const wilders = [
  {
    name: 'toto',
    city: 'Lille',
  },
  {
    name: 'tata',
    city: 'Paris',
  },
];

const resolvers = {
  Query: {
    wilders: () => wilders,
    skills:()=> skills
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});

void server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});