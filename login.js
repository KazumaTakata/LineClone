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
import t from 'tcomb-form-native';
import { connect } from 'react-redux';
import { setUserId } from "./redux/action"
import TextField from "./TextField"

const Form = t.form.Form;

const User = t.struct({
  email: t.String,
  username: t.maybe(t.String),
  password: t.String
});

const options = {
  fields:{
    email:{
    autoCapitalize: 'none'
  },
    username:{
    autoCapitalize: 'none'
  },
    password:{
    autoCapitalize: 'none'
    }
  }
}

class LogInScreenComp extends React.Component {

  constructor(props){
    super(props);
    this.state = { email: "", password: "", username: "" };
    this.sendAuthenticationData = this.sendAuthenticationData.bind(this)
  }
  handleEmailInput(email){
    this.setState({email})
    console.log(this.state.email)
  }

  handlePasswordInput(password){
    this.setState({password})
    console.log(this.state.password)
  }

  onRegister = (email, password, username) => {
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then((user) => {
        let userId = user.user._user.uid
        this.props.setUserId(userId)
        console.log(`user/${userId}/`)
        firebase.database()
          .ref(`user/${userId}`)
          .set({
            friendsNum: 0,
            profilePhoto: "none",
            friends: "none",
            userName: username
          });
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(message)
      });
    }

  onLogin = () => {
  const { email, password } = this.state;
  firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
    .then((user) => { console.log(user)
    })
    .catch((error) => {
      const { code, message } = error;
      console.log(message)
    });
  }

  sendAuthenticationData(){
    console.log("button click")
    const value = this._form.getValue();
    this.onRegister(value.email, value.password, value.username)
    // this.props.navigation.navigate('Home')
  }


  render() {
    return (
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        {/* <TextField error={"ii"} label={"name"} /> */}
        <Form options={options}  type={User} ref={c => this._form = c} />
        <Button title="Sign Up" onPress={this.sendAuthenticationData}/>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return { setUserId: id => dispatch(setUserId(id))};
}

const LogInScreen = connect(null, mapDispatchToProps)(LogInScreenComp)

export default LogInScreen;
