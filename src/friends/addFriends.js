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

import firebase from 'react-native-firebase';
import Swipeable from 'react-native-swipeable';
import { StackNavigator } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import FontAwesome, { Icons } from 'react-native-fontawesome';
const { fromJS } = require('immutable')
import Icon from 'react-native-vector-icons/FontAwesome';
import { addFriendAct } from "../../redux/action";

type Props = {};
class addFriendComp extends Component<Props> {

  static navigationOptions = {
    title: 'Add Friend'
  }

  constructor(props){
    super(props);
    console.log("constructor")

    storage = firebase.storage();

    this.state = {
      id: "",
      searchResult: null,
      searchId: null
    }
    this.submitPressed = this.submitPressed.bind(this)
  }

  submitPressed(){
    let searchId = this.state.id
    // let friendsIdList = firebase.database().ref(`user/${this.props.reduxState.dataReducer.id}/friends`).on('value', (snapshot) =>
    // {
    //   const value = snapshot.val();
    //   console.log(value)
    // })

    if (searchId != ""){
      firebase.database()
          .ref(`user/${searchId}`)
          .once('value', (snapshot) => {
            const value = snapshot.val();
            console.log(value)
            this.setState({searchResult: value})
            this.setState({searchId: searchId})
            console.log(this.state.searchResult.profilePhoto)
          //   if (value != null ){
          //     if( !this.props.reduxState.dataReducer.friends.includes(searchId) ){
          //     firebase.database()
          //       .ref(`user/${searchId}/friends`).push()
          //       .set({
          //         id: this.props.reduxState.dataReducer.id,
          //       });
          //     firebase.database()
          //       .ref(`user/${this.props.reduxState.dataReducer.id}/friends`).push()
          //       .set({
          //         id: searchId
          //       });
          //     this.props.addFriendAct(searchId)
          //   }
          // }
          })
      }
  }
  addPressed(){
    if( !this.props.reduxState.dataReducer.friends.includes(this.state.searchId) ){
        firebase.database()
          .ref(`user/${this.state.searchId}/friends`).push()
          .set({
            id: this.props.reduxState.dataReducer.id,
          });
        firebase.database()
          .ref(`user/${this.props.reduxState.dataReducer.id}/friends`).push()
          .set({
            id: this.state.searchId
          });
        this.props.addFriendAct(this.state.searchId)
      }
    this.props.navigation.navigate("Friends")
  }




  renderResult(){
    if (this.state.searchResult) {
      return ( <View style={{flex: 1, alignItems:"center", justifyContent: "center"}}>
                  <Text style={{padding: 20, fontSize: 20}}>{this.state.searchResult.userName}</Text>
                  <Image style={styles.image} source={{uri: this.state.searchResult.profilePhoto}}></Image>
                <TouchableOpacity style={styles.buttonStyle} onPress={this.addPressed.bind(this)}>
                      <Text style={{justifyContent: 'center', color: "white"}}>add</Text>
                  </TouchableOpacity>
               </View>
      )
    }
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: "center"}}>
          <Text style={{fontSize: 20, margin:10}}>Search By ID</Text>
        <TextInput  style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 300, margin: 20}} onChangeText={(text) => this.setState({id :text})}
        value={this.state.id}></TextInput>
      <TouchableOpacity style={styles.buttonStyle} onPress={this.submitPressed}>
          <Text style={{justifyContent: 'center', color: "white"}}>search</Text>
      </TouchableOpacity>
        {this.renderResult()}
      </View>
  );
  }
}

const mapStateToProps = state => {
  return { reduxState : state };
};

const mapDispatchToProps = (dispatch) => {
    return { addFriendAct: friendList => dispatch(addFriendAct(friendList))};
}


const addFriend = connect(mapStateToProps, mapDispatchToProps)(addFriendComp);

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },

  buttonStyle:{
    margin: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "black",
    backgroundColor: "black",
    height: 40,
    width: 50,
    justifyContent: 'center',
    alignItems: "center"
  }
})

export default addFriend;
