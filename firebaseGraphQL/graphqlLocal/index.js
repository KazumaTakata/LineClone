const express = require("express")
const graphqlHTTP = require('express-graphql');

const schema = require("./schema/schema")

const app = express()




app.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
