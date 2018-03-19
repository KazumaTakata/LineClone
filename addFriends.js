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
class addFriend extends Component<Props> {

  static navigationOptions = {
    title: 'Add Friend',

  }

  constructor(props){
    super(props);
    console.log("constructor")

    storage = firebase.storage();

    this.state = {
      text: ""
    }
  }


  render() {
    return (
      <View style={{flex: 1, alignItems: "center"}}>
          <Text style={{fontSize: 20, margin:10}}>Search By ID</Text>
        <TextInput  style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 300, margin: 20}} onChangeText={(text) => this.setState({text})}
        value={this.state.text}></TextInput>
      <Button title="search"></Button>
      </View>
  );
  }
}

const styles = StyleSheet.create({

})


export default addFriend;
