const express = require('express');
const expressGraphQL = require('express-graphql');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const schema = require('./schema');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/graphql', expressGraphQL({
  schema: schema,
  pretty: true,
  graphiql: true
}))

module.exports = app;