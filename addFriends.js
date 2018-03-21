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
const { fromJS } = require('immutable')
import Icon from 'react-native-vector-icons/FontAwesome';

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
      id: ""
    }
    this.submitPressed = this.submitPressed.bind(this)
  }

  submitPressed(){
    console.log(this.state.id)
    let searchId = this.state.id
    console.log(searchId)
    firebase.database()
        .ref(`user/${searchId}`)
        .once('value', (snapshot) => {
          const value = snapshot.val();
          console.log(value)
          console.log(this.props.reduxState.dataReducer)
          firebase.database()
            .ref(`user/${searchId}/friends`).push()
            .set({
              id: this.props.reduxState.dataReducer.id,
            });
          firebase.database()
            .ref(`user/${this.props.reduxState.dataReducer.id}/friends`).push()
            .set({
              id: searchId
            });
          // firebase.database()
          //   .ref(`user/${this.props.reduxState.dataReducer.id}/talks/${searchId}`).push()
          //   .set({
          //     id: searchId
          //   });
        })
  }
  render() {
    return (
      <View style={{flex: 1, alignItems: "center"}}>
          <Text style={{fontSize: 20, margin:10}}>Search By ID</Text>
        <TextInput  style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 300, margin: 20}} onChangeText={(text) => this.setState({id :text})}
        value={this.state.id}></TextInput>
      <Button onPress={this.submitPressed} title="search"></Button>
      </View>
  );
  }
}

const mapStateToProps = state => {
  return { reduxState : state };
};

const addFriend = connect(mapStateToProps, null)(addFriendComp);

const styles = StyleSheet.create({
})

export default addFriend;
