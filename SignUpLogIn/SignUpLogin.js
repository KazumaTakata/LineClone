import React, { Component } from 'react';
import LogInScreen from "./login";
import SignupScreen from "./signup"
import SignupLoginHome from "./SignupLoginHome"
import { StackNavigator } from 'react-navigation';


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
