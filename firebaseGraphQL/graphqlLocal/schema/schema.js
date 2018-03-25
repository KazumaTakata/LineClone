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
// const firebase = require("./firebaseInit")
// const admin = require('firebase-admin');


const firebase = require("firebase")

var config = {
  apiKey: "AIzaSyBMVK9UlGntEMEqKA7_ky5hk9J5Ezl4OIQ",
  authDomain: "lineclone-2dcd7.firebaseapp.com",
  databaseURL: "https://lineclone-2dcd7.firebaseio.com",
  projectId: "lineclone-2dcd7",
  storageBucket: "lineclone-2dcd7.appspot.com",
  messagingSenderId: "979175370322"
  };
firebase.initializeApp(config);



const TalkType = new GraphQLObjectType({
  name: "Talk",
  description: "This represent an author",
  fields: () => ({
    which: {type: GraphQLString},
    talk: {type: GraphQLString}
    // name: {type: new GraphQLNonNull(GraphQLString)}
  })
});


const FriendType = new GraphQLObjectType({
  name: "Friend",
  fields: () => ({
    id: {type: GraphQLString},
    talk: {type: new GraphQLList(TalkType),
            args: {id: {type: GraphQLString}},
          resolve: function(parentValue, args){
            console.log(parentValue["id"])
            return firebase.database().ref(`/user/${args.id}/talks/${parentValue.id}`).once("value").then((snapshot) => {
              console.log(snapshot.val())
              return Object.values(snapshot.val())
            })
          }}
  })
})

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represent an author",
  fields: () => ({
    id: {type: GraphQLString},
    profilePhoto: {type: GraphQLString},
    friendId: {type: FriendType,
               args: {id: {type: GraphQLString}},
               resolve: function(parentValue, args){
                  // console.log(parentValue)
                  return parentValue["friendId"].find(o => o.id === args.id)
               }
    }
  })
    // name: {type: new GraphQLNonNull(GraphQLString)}
  })





const QueryRootType = new GraphQLObjectType({
  name: 'BlogAppSchema',
  description: "Blog Application Schema Root",
  fields: () => ({
    user: {
      type: UserType,
      args: { id: {type: GraphQLString}},
      resolve: function(_, args) {
          return firebase.database().ref(`/user/${args.id}`).once("value").then((snapshot) => {
          let obj = {}
          let friends = Object.values(snapshot.child("friends").val())
          obj["id"] = args.id
          obj["friendId"] = friends
          obj["profilePhoto"] = snapshot.child("profilePhoto").val()
          console.log(snapshot.child("profilePhoto").val())
          // let friendsList = Object.values(snapshot.val())
          // console.log(snapshot)
          return obj
        })
        // return [{id: "ee"}]
      }
    }
  })
})




const Schema = new GraphQLSchema({
  query: QueryRootType
});


module.exports = Schema;
