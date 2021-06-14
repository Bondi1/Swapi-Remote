const { ApolloServer, makeExecutableSchema } = require("apollo-server");
const PeopleAPI = require("./datasources/allPeople");
const typeDefs = require('./schema.graphql')

const resolvers = {
  Query: {
    allPeople: (parent, args, { dataSources }, info) => {
      people = dataSources.peopleAPI.getAllPeople();
      return people;
    },
    person: (parent, { id }, { dataSources }, info) => {
      return dataSources.peopleAPI.getPersonById(id);
    },
    allFilms: (parent, args, { dataSources }, info) => {
      var filmArray = [];
      dataSources.peopleAPI.getAllPeople().people.map( 
        person => {
          let personsfilms = person.filmConnection.edges.map( item => item.node);
          personsfilms.map(p => {
            let filmExists = filmArray.find(f => f.id === p.id);
            if(!filmExists)  filmArray.push(p)})  
        }); 
        return filmArray;
    },
    allReviews: (parent, args, { dataSources }, info) => {
      reviews = dataSources.peopleAPI.getAllReviews();
      return reviews;
    },
    getReview: (parent, { type }, { dataSources }, info) => {
      return dataSources.peopleAPI.getReviewByType(type);
    },
  },
  Person: {
    filmConnection: (parent) => {
      return parent.filmConnection;
    },
  },
  PeopleFilmsConnection: {
    totalCount: (parent) => {
        return parent.edges.length;
    }
  },
  Mutation: {
    review: async (_, { type }, { dataSources }) => {
      const review = await dataSources.peopleAPI.findOrCreateReview({ type });
      if (review) {
        return review;
      }
    },
  },

};

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers,
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
