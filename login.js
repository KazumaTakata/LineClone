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



class LogInScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = { email: "", password: "" };

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

  onRegister = () => {
  const { email, password } = this.state;
  firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
    .then((user) => {
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
    this.onRegister()
    // this.props.navigation.navigate('Home')


  }


  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Email</Text>
      <TextInput style={{height: 40, borderColor: "gray", borderWidth: 1, width: 200, margin: 30}} autoCapitalize = 'none' onChangeText={ (input) => this.handleEmailInput(input)}/>
        <Text>Password</Text>
      <TextInput style={{height: 40, borderColor: "gray", borderWidth: 1, width: 200, margin: 30}} autoCapitalize = 'none' onChangeText={(password) => this.handlePasswordInput(password) }/>

    <Button title="Go to Details" onPress={this.sendAuthenticationData}/>
      </View>
    );
  }
}


export default LogInScreen;
