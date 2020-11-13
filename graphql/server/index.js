const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => 'Hello world'
};

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: false
}));

app.listen(4000);

console.log('App running at localhost:4000');
