const express = require('express');
const bodyParser = require('body-parser');
const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { ApolloServer } = require('apollo-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const { typeDefs, resolvers } = require('./graphql/index');

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to GQL Demo!!!'
  })
})

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer);

mongoose
  .connect(`mongodb://vildantursic:${process.env.PASSWORD}@cluster0-shard-00-00-2zosu.mongodb.net:27017,cluster0-shard-00-01-2zosu.mongodb.net:27017,cluster0-shard-00-02-2zosu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, {useNewUrlParser: true})
  .then(() => {
    httpServer.listen(process.env.PORT || 4000, () => {
      new SubscriptionServer({
        execute,
        subscribe,
        schema: typeDefs,
      }, {
        server: app,
        path: '/subscriptions',
      });
      console.log(`🚀 Server ready at http://localhost:4000`);
    })
  })
  .catch(err => {
    console.log(err);
  });