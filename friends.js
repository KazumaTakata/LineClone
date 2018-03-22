import React, { Component } from 'react';
import { connect } from "react-redux";
import Triangle from 'react-native-triangle';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ListItem,
  TouchableHighlight
} from 'react-native';
import Header from "./Header";
import firebase from 'react-native-firebase';
import DetailsScreen from "./login";
import Swipeable from 'react-native-swipeable';
import { StackNavigator } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { setFriends } from "./redux/action"
const { fromJS } = require('immutable')
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {};
class FriendsListComp extends Component<Props> {

  static navigationOptions = ({ navigation }) => { {

    let params = navigation.state.params
    console.log(params)

    return {
    headerTitle: 'friends',
    headerRight: (
        <Icon.Button name="search" backgroundColor="black" onPress={ () => { params.navigationToAddFriend() } }>
            SEARCH
        </Icon.Button>
      ),
    headerLeft: (
        <Icon.Button name="cog" backgroundColor="black" onPress={ () => { params.navigationToUserProfile() } }>
            SETTING
        </Icon.Button>
      ),
    }
    }
  }

  componentWillMount() {
    console.log("focus")
    this.props.navigation.setParams({ navigationToAddFriend: this._navigationToAddFriend });
    this.props.navigation.setParams({ navigationToUserProfile: this._navigationToUserProfile });

    this.props.navigation.addListener('willFocus', (playload)=>{


      firebase.database()
          .ref(`user/${this.props.reduxState.dataReducer.id}/friends`)
          .on('value', (snapshot) => {
            let friendIds = []
            snapshot.forEach(function(childSnapshot) {
            let childKey = childSnapshot.key;
            let childData = childSnapshot.val();
            friendIds.push(childData.id)
            })
            this.setState((prevState) => {
              let Mstate = fromJS(prevState)
              let Mstate1 = Mstate.setIn(["friends"], [])
              return Mstate1.toJSON()
            })

            friendIds.forEach((id) => {
            firebase.database()
                  .ref(`user/${id}`)
                  .on('value', (snapshot) => {
                    let userVal = snapshot.val()
                    userVal["id"] = id
                    this.setState((prevState) => {
                      let Mstate = fromJS(prevState)
                      let Mstate1 = Mstate.updateIn(["friends"], list => list.push(userVal))
                      return Mstate1.toJSON()
                      })
                    })
          })
    });
    })
  }

  _navigationToAddFriend =() => {

    this.props.navigation.navigate('AddFriend')
  }

  _navigationToUserProfile =() => {

    this.props.navigation.navigate('UserProfile')
  }

  constructor(props){
    super(props);


    this.state = {
                  friends: [],
                  imageUrl: {}
    };

    firebase.database()
        .ref(`user/${this.props.reduxState.dataReducer.id}/friends`)
        .on('value', (snapshot) => {
          let friendIds = []
          snapshot.forEach(function(childSnapshot) {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          friendIds.push(childData.id)
          })
          this.props.setFriends(friendIds)
        })



    // firebase.database()
    //     .ref(`user/${this.props.reduxState.dataReducer.id}/friends`)
    //     .on('value', (snapshot) => {
    //       // snapshot.forEach(function(childSnapshot){
    //       //   const value = childSnapshot.val();
    //       //   console.log(`user/${this.props.reduxState.dataReducer.id}/friends`)
    //       //   console.log(this.state)
    //       //   this.setState((prevState) => {
    //       //     console.log(prevState)
    //       //     let Pstate = fromJS(prevState)
    //       //     let Pstate1 = Pstate.updateIn(["friends"], list => list.push(value))
    //       //     return Pstate1.toJSON()
    //       //   })
    //       //
    //       // })
    //       const value = snapshot.val();
    //       console.log(value)
    //       this.setState((prevState) => {
    //        return {friends: value}
    //      })
    //      console.log(this.state)
    //
    //       // this.setState(prevState => {
    //       //   return {friends: value}
    //       // })
    //       // if (typeof this.state.friends == "undefined"){
    //       //     this.state.friends.map( (friend, index) =>{
    //       //       firebase.storage().ref(friend.photo).getDownloadURL().then((url) => {
    //       //         this.setState((prevState) => {
    //       //             let map1 = fromJS(prevState)
    //       //             let map2 = map1.setIn(["friends", index, "photo"], url)
    //       //
    //       //             return map2.toJSON()
    //       //          } )
    //       //          console.log(this.state)
    //       //        })
    //       //      } )
    //       // }
    //     });


    swipeoutBtns = [
      {
        text: 'Button',
        backgroundColor: "red",
        onPress: () => {
          this.deleteButton()
        }
      }
    ]

    storage = firebase.storage();
  }
  textInputChange(){
    console.log("text input is changed");
  }
  buttonPressed(){
    console.log("button pressed")
  }
  FriendItemTouch(name, id){
    console.log(id)
    this.props.navigation.navigate('Talk', {
                                name,
                                id
                                })
  }
  deleteButton(){
    console.log("delete")
  }



  render() {
    return (
      <View style={{flex: 1, alignItems: "center"}}>
        <ScrollView>
            <FlatList
                data={this.state.friends}
                renderItem={({item}) => <Swipeout right={swipeoutBtns}><View style={styles.viewContainer}><Image  style={styles.image} source={{uri: item.profilePhoto}}/><Text id={item.id} onPress={ () => this.FriendItemTouch(item.userName, item.id)} style={styles.chatBoxStyle}>{item.userName}</Text>
              </View>
            </Swipeout>
            }/>
        </ScrollView>
    </View>
  );
  }
}

const mapStateToProps = state => {
  return { reduxState : state };
};

const mapDispatchToProps = (dispatch) => {
    return { setFriends: friendList => dispatch(setFriends(friendList))};
}

const FriendsList = connect(mapStateToProps, mapDispatchToProps)(FriendsListComp);


const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  viewContainer:{
    flexDirection: "row",
    backgroundColor: "rgb(162, 199, 90)",
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 10,
  },
  chatBoxStyle:{
    width: 1000,
    padding: 20,
    backgroundColor: "rgb(162, 199, 90)",
    fontSize: 20,
    color: "white"
  }

})


export default FriendsList;
