const { ApolloServer } = require('apollo-server-lambda');
const path = require('path');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const typesArray = fileLoader(path.join(__dirname, './src/graphql/**/*.graphql'));
const typeDefs = mergeTypes(typesArray, { all: true });

const resolversArray = fileLoader(path.join(__dirname, './src/graphql/**/resolver.js'));
const resolvers = mergeResolvers(resolversArray);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

module.exports.graphql = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
