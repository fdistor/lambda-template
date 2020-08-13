require('dotenv').config();

const { ApolloServer } = require('apollo-server');
const path = require('path');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const PORT = process.env.PORT;

const typesArray = fileLoader(path.join(__dirname, './src/graphql/**/*.graphql'));
const typeDefs = mergeTypes(typesArray, { all: true });

const resolversArray = fileLoader(path.join(__dirname, './src/graphql/**/resolver.js'));
const resolvers = mergeResolvers(resolversArray);

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({ port: PORT }).then(({ url }) => console.log(`Listening at ${url}`));
