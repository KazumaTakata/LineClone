const functions = require('firebase-functions');
const express  = require("express")
const graphqlHTTP = require('express-graphql');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const schema = require("./schema/schema")

const app1 = express()
// api1.get("*", (req, res) => {
//   res.send("express Server")
// })

app1.use("/graphql", graphqlHTTP({
  schema,
  graphiql: true
}))


const api1 = functions.https.onRequest(app1)




module.exports = {
  api1
}
