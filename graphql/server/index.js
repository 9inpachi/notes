const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./schema');

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('Database connected');
});

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

app.listen(4000);

console.log('App running at localhost:4000');
