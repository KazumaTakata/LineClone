let {
  // These are the basic GraphQL types need in this tutorial
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  // This is used to create required fileds and arguments
  GraphQLNonNull,
  // This is the class we need to create the schema
  GraphQLSchema,
} = require('graphql');

// const admin = require('firebase-admin');




const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represent an author",
  fields: () => ({
    id: {type: new GraphQLNonNull(GraphQLString)},
    name: {type: new GraphQLNonNull(GraphQLString)}
  })
});





const QueryRootType = new GraphQLObjectType({
  name: 'BlogAppSchema',
  description: "Blog Application Schema Root",
  fields: () => ({
    user: {
      type: new GraphQLList(UserType),
      args: { id: {type: GraphQLString}},
      resolve: function(_, args) {
        admin.database().ref(`/user/${args.id}/friends`).once("value", (snapshot) => {
          let friendsList = snapshot.val()
          console.log(friendsList)
        })
        return [{id: "ee", name: "one ok"}]
      }
    }
  })
})




const Schema = new GraphQLSchema({
  query: QueryRootType
});


module.exports = Schema;
