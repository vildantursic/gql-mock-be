const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const cors = require('cors');

const Vote = require('./models/vote')
const faker = require('faker');

require('dotenv').config()

const { schema, resolvers } = require('./graphql/index');

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: schema,
    rootValue: resolvers,
    subscriptionsEndpoint: 'ws://localhost:4000/graphql',
    graphiql: true
  })
);

app.post('/vote', async (req, res) => {
  req.body.code = faker.random.uuid();
  const vote = new Vote(req.body);
  const data = await vote.save();
  res.json(data);
})

mongoose
  .connect(`mongodb://vildantursic:${process.env.PASSWORD}@cluster0-shard-00-00-2zosu.mongodb.net:27017,cluster0-shard-00-01-2zosu.mongodb.net:27017,cluster0-shard-00-02-2zosu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, {useNewUrlParser: true})
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log('🚀 listening on http://localhost:4000');
    });
  })
  .catch(err => {
    console.log(err);
  });