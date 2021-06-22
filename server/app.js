const { ApolloServer, makeExecutableSchema } = require("apollo-server");
const PeopleAPI = require("./datasources/allPeople");
const typeDefs = require("./schema.graphql");
const resolvers = require("./resolvers");

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers
})

const server = new ApolloServer({
  schema: schema,
  dataSources: () => {
    return {
      peopleAPI: new PeopleAPI(),
    };
  },
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
