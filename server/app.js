const { ApolloServer, gql } = require("apollo-server");
const PeopleAPI = require("./datasources/allPeople");
const _ = require("lodash");

const typeDefs = gql`
  type Film {
    title: String
    episodeID: Int
    director: String
    producers: [String]
    created: String
    id: ID!
  }

  type PeopleFilmsEdge {
    node: Film
    cursor: String!
  }

  type PeopleFilmsConnection {
    edges: [PeopleFilmsEdge]
    totalCount: Int
  }

  type Person {
    id: ID!
    name: String
    birthYear: String
    eyeColor: String
    gender: String
    hairColor: String
    height: Int
    mass: Int
    skinColor: String
    created: String
    edited: String
    filmConnection: PeopleFilmsConnection
  }

  type AllPeople {
      people : [Person]
  }

  type Query {
    allPeople: AllPeople
    person(id: ID): Person
    allFilms: [Film]
  }
`;

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
          
          console.log(filmArray);
        }); 
        console.log(filmArray);
        return filmArray;
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
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      peopleAPI: new PeopleAPI(),
    };
  },
});

server.listen().then(({ url }) => console.log(`Server ready at ${url}`));
