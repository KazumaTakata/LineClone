import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import RootStack from "./App";
import LogInScreen from './login';


class App extends React.Component {

  constructor() {
    super();
    this.unsubscriber = null;
    this.state = {
      user: null,
    };
  }


  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
    // this.unsubscriber()
    firebase.auth().signOut()
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    if (!this.state.user) {
      return <LogInScreen />;
    }

    return (
        <RootStack />
    );
  }

}

export default App;
