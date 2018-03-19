import React, { Component } from 'react';
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
const { fromJS } = require('immutable')
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {};
class FriendsList extends Component<Props> {

  static navigationOptions = ({ navigation }) => { {

    let params = navigation.state.params
    console.log(params)

    return {
    headerTitle: 'friends',
    headerRight: (
        <Icon.Button name="search" backgroundColor="black" onPress={ () => { params.navigationToAddFriend() } }>
            Search
        </Icon.Button>

      ),
    }
    }
  }
  componentWillMount() {
    this.props.navigation.setParams({ navigationToAddFriend: this._navigationToAddFriend });
  }

  _navigationToAddFriend =() => {
    console.log("addfriend")
    this.props.navigation.navigate('AddFriend')
  }

  searchFriends(){
    console.log("search friends")
  }

  constructor(props){
    super(props);
    console.log("constructor")

    firebase.database()
        .ref('user/friends')
        .on('value', (snapshot) => {
          const value = snapshot.val();
          this.setState(prevState => {
            return {friends: value}
          })
          this.state.friends.map( (friend, index) =>{
            firebase.storage().ref(friend.photo).getDownloadURL().then((url) => {
              this.setState((prevState) => {
                  let map1 = fromJS(prevState)
                  let map2 = map1.setIn(["friends", index, "photo"], url)

                  return map2.toJSON()
               } )
               console.log(this.state)
             })
          } )
        });

    this.state = { text: "Useless Placeholder",
                  friends: null,
                  imageUrl: {}
    };

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
      {/* <Header headerTitle="FrindsList"></Header> */}
        <ScrollView>
            <FlatList
                data={this.state.friends}
                renderItem={({item}) => <Swipeout right={swipeoutBtns}><View style={styles.viewContainer}><Image  style={styles.image} source={{uri: item.photo}}/><Text id={item.frindId} onPress={ () => this.FriendItemTouch(item.name, item.friendId)} style={styles.chatBoxStyle}>{item.name}</Text>
              </View>
            </Swipeout>
            }/>
        </ScrollView>
    </View>
  );
  }
}

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
