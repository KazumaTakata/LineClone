import React from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import RootTab from "./src/App";
import SignUpLoginStack from "./SignUpLogIn/SignUpLogin"
import { connect } from "react-redux";

class AppComp extends React.Component {

  constructor() {
    super();
    this.unsubscriber = null;
    this.state = {
      user: null,
    };
  }


  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user: user });
    });
    firebase.auth().signOut()
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  sendUserInfo(){
    console.log(this.state.user)
  }

  render() {
    console.log(this.props.reduxState.dataReducer.id)
    if (!this.state.user || this.props.reduxState.dataReducer.id == null){
      return <SignUpLoginStack />;
    }

    return (
        <RootTab />
    );
  }

}

const mapStateToProps = state => {
  return { reduxState : state };
};

const App = connect(mapStateToProps, null)(AppComp);

export default App;
