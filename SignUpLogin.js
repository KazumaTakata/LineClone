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

import LogInScreen from "./login";
import SignupScreen from "./signup"
import SignupLoginHome from "./SignupLoginHome"
import { StackNavigator } from 'react-navigation';
import addFriend from "./addFriends";



SignUpLoginStack = StackNavigator({
  login: {
      screen: LogInScreen
    },
  signup: {
      screen: SignupScreen,
    },
  home: {
      screen : SignupLoginHome
  }
  },
  {
      initialRouteName: "home"
  });


export default SignUpLoginStack
