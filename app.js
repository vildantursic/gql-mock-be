const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(cors())
app.use(bodyParser.json());

io.on('connection', function (socket) {
  console.log('connected')
});

var fetchData = require('./routes/fetch_data');

app.use('/api/', fetchData);

app.post('/api/remoteactions/execute/:type', (req, res) => {
  io.emit('action', { type: req.params.type, obj: req.body });

  res.json({
      type: req.params.type,
      obj: req.body
  })
})

mongoose
  .connect(`mongodb://vildantursic:${process.env.PASSWORD}@cluster0-shard-00-00-2zosu.mongodb.net:27017,cluster0-shard-00-01-2zosu.mongodb.net:27017,cluster0-shard-00-02-2zosu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true`, {useNewUrlParser: true})
  .then(() => {
    server.listen(process.env.PORT || 4000, () => {
      console.log(`🚀 Server ready at http://localhost:4000`);
    })
  })
  .catch(err => {
    console.log(err);
  });