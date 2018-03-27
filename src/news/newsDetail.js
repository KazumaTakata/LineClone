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
  TouchableHighlight,
  WebView
} from 'react-native';
import firebase from 'react-native-firebase';
import Swipeable from 'react-native-swipeable';
import { StackNavigator } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { setFriends } from "../../redux/action"
const { fromJS } = require('immutable')
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios"

type Props = {};
class NewsDetailComp extends Component<Props> {

  static navigationOptions = ({ navigation }) => { {

    let params = navigation.state.params
    return {
    headerTitle: 'News',
    }


  }}


  constructor(props){
    super(props);


    this.state = {
                  news:null
    };

    const { params } = this.props.navigation.state;

  }


  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{flex: 1, justifyContent:"center" ,alignItems: "center"}}>
        <Image style={{width: 300, height: 300}} source={{uri: params.news.urlToImage}}></Image>
        <Text>{JSON.stringify(params.news.description)}</Text>
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

const NewsDetail = connect(mapStateToProps, mapDispatchToProps)(NewsDetailComp);


const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },


})


export default NewsDetail;
