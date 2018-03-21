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
  ListItem
} from 'react-native';
import Header from "./Header";
import firebase from 'react-native-firebase';
import DetailsScreen from "./login";
import ChatRoom from "./chatRoom";
import FriendsList from "./friends";

import { StackNavigator } from 'react-navigation';
import addFriend from "./addFriends";


RootStack = StackNavigator({
  Home: {
      screen: FriendsList
    },
  Talk: {
      screen: ChatRoom,
    },
  AddFriend: {
      screen : addFriend
  }
  },
  {
      initialRouteName: "Home"
  });


export default RootStack
