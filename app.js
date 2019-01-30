const express = require('express');
const bodyParser = require('body-parser');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const { typeDefs, resolvers } = require('./graphql/index');

const app = express();

app.use(cors())
app.use(bodyParser.json());

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

mongoose
  .connect(`mongodb://vildantursic:${process.env.PASSWORD}@cluster0-shard-00-00-2zosu.mongodb.net:27017,cluster0-shard-00-01-2zosu.mongodb.net:27017,cluster0-shard-00-02-2zosu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, {useNewUrlParser: true})
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`🚀 Server ready at http://localhost:3000`);
    })
  })
  .catch(err => {
    console.log(err);
  });