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

import firebase from 'react-native-firebase';
import ChatRoom from "./talks/chatRoom";
import FriendsList from "./friends/friends";
import ChatList from "./talks/chatList";
import NewsMain from "./news/index"
import NewsDetail from "./news/newsDetail"

import { StackNavigator, TabNavigator } from 'react-navigation';
import addFriend from "./friends/addFriends";
import UserProfile from "./friends/userProfile";
import Icon from 'react-native-vector-icons/FontAwesome';


RootStack = StackNavigator({
  Friends: {
      screen: FriendsList
    },
  Talk: {
      screen: ChatRoom,
    },
  AddFriend: {
      screen : addFriend
  },
  UserProfile:{
      screen: UserProfile
  },
  },
  {
      initialRouteName: "Friends"
  });

RootStack2 = StackNavigator({
    Chat: {
        screen: ChatList
      },
    Talk: {
        screen: ChatRoom,
      }
    },
    {
        initialRouteName: "Chat"
    });


RootStack3 = StackNavigator({
        NewsMain: {
            screen: NewsMain
          },
        NewsDetail: {
            screen: NewsDetail,
          }
        },
        {
            initialRouteName: "NewsMain"
        });

RootTab = TabNavigator({
  tabUsers: { screen: RootStack },
  tabChats: { screen: RootStack2},
  tabNews: { screen:  RootStack3}
  },
  {
  navigationOptions: ({ navigation }) => ({
       tabBarLabel:({ focused, tintColor }) => {
         const { routeName } = navigation.state;
         if (routeName === 'tabUsers') {
          return (
              "Friends  "
            )
          }
         if (routeName === "tabChats"){
           return (
             "Chat"
           )
         }
         if (routeName === "tabNews"){
           return (
             "News"
           )
         }
       },
       tabBarIcon:({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'tabUsers') {
         return (
             <Icon.Button name="users" backgroundColor="transparent"></Icon.Button>
           )
         }
        if (routeName === "tabChats"){
          return (
            <Icon.Button name="comment" backgroundColor="transparent"></Icon.Button>
          )
        }
        if (routeName === "tabNews"){
          return (
            <Icon.Button name="newspaper-o" backgroundColor="transparent"></Icon.Button>
          )
        }
     }
     }),
  tabBarOptions: {
    activeTintColor: 'rgb(204, 176, 205)',
    labelStyle: {
      fontSize: 10,
      marginRight: 10
    },
    style: {
      backgroundColor: 'black',
      color: "white"
    },
  }
  },
  )

export default RootTab
