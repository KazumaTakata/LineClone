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
  TouchableHighlight,
  ScrollView,
  FlatList,
  ListItem
} from 'react-native';
import firebase from 'react-native-firebase';
import { connect } from 'react-redux';
import { setUserId } from "../redux/action"



const { fromJS } = require('immutable')

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
    this.state = { email: "", emailError: null,
                   password: "", passwordError: null,
                   username: "", usernameError: null,
                   emailTextInputStyle: {
                     borderBottomWidth: 0.5,
                     borderBottomColor: '#d6d7da',
                   },
                   nameTextInputStyle: {
                     borderBottomWidth: 0.5,
                     borderBottomColor: '#d6d7da',
                   },
                   passwordTextInputStyle: {
                     borderBottomWidth: 0.5,
                     borderBottomColor: '#d6d7da',
                   },
                 };

    this.sendAuthenticationData = this.sendAuthenticationData.bind(this)
  }

  static navigationOptions = ({ navigation }) => { {

    let params = navigation.state.params
    console.log(params)

    return {
    headerTitle: 'LOGIN'
    }
    }
  }


  handleEmailInput(email){
    this.setState({email})
    console.log(this.state.email)
  }

  handlePasswordInput(password){
    this.setState({password})
    console.log(this.state.password)
  }

  onLogin = (email, password) => {

  firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
    .then((user) => {
    
      let userId = user.user._user.uid
      this.props.setUserId(userId)

    })
    .catch((error) => {
      const { code, message } = error;
      console.log(message)
      if ( message == "The password is invalid or the user does not have a password."){
        this.setState((prevState) => {
          let Estate = fromJS(prevState)
          let Estate1 = Estate.setIn(["passwordError"], "The password is invalid")
          return Estate1.toJSON()
        } )
        this.setState((prevState) => {
          let Estate = fromJS(prevState)
          let Estate1 = Estate.setIn(["emailError"], null)
          return Estate1.toJSON()
        } )
      }
      if ( message == "The email address is badly formatted." ){
        this.setState((prevState) => {
          let Estate = fromJS(prevState)
          let Estate1 = Estate.setIn(["emailError"], "The email address is badly formatted.")
          return Estate1.toJSON()
        } )
        this.setState((prevState) => {
          let Estate = fromJS(prevState)
          let Estate1 = Estate.setIn(["passwordError"], null)
          return Estate1.toJSON()
        } )
      }
      if ( message == "There is no user record corresponding to this identifier. The user may have been deleted." ){
        this.setState((prevState) => {
          let Estate = fromJS(prevState)
          let Estate1 = Estate.setIn(["emailError"], "There is no user record corresponding to this identifier. The user may have been deleted.")
          return Estate1.toJSON()
        } )
        this.setState((prevState) => {
          let Estate = fromJS(prevState)
          let Estate1 = Estate.setIn(["passwordError"], null)
          return Estate1.toJSON()
        } )
      }
      // console.log(message)
      // console.log(message.length)
    });
  }

  sendAuthenticationData(){
    console.log("button click")
    this.onLogin(this.state.email, this.state.password)
  }

  TextInputFocus(stylePath){
    console.log("textInputFocus")
    this.setState((prevState) => {
        let Estate = fromJS(prevState)
        let Estate1 = Estate.setIn([stylePath, "borderBottomColor"], "red")
        return Estate1.toJSON()
    } )
  }
  TextInputBlur(stylePath){
    console.log("textInputBlur")
    this.setState((prevState) => {
        let Estate = fromJS(prevState)
        let Estate1 = Estate.setIn([stylePath, "borderBottomColor"], "#d6d7da")
        return Estate1.toJSON()
    } )
  }


  render() {
    return (
      <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
        <View>
          <Text>Email</Text>
          <View style={this.state.emailTextInputStyle} >
          <TextInput onBlur={ () => { this.TextInputBlur("emailTextInputStyle") } } onFocus={() => {this.TextInputFocus("emailTextInputStyle") }} onChangeText={(email) => this.setState({email})} value={this.state.email} />
          </View>
          this.state.emailError ? <Text style={{color: "red"}}>{this.state.emailError}</Text> : null
        </View>
        <View>
          <Text>Password</Text>
        <View style={this.state.passwordTextInputStyle}>
          <TextInput onBlur={ () => { this.TextInputBlur("passwordTextInputStyle") } } onFocus={() => {this.TextInputFocus("passwordTextInputStyle") }} onChangeText={(password) => this.setState({password})} value={this.state.password} />
        </View>
          this.state.passwordError ? <Text style={{color: "red"}}>{this.state.passwordError}</Text> : null
        </View>
        {/* <Form options={options}  type={User} ref={c => this._form = c} /> */}
        <TouchableHighlight style={styles.buttonStyle} underlayColor='#fff' onPress={this.sendAuthenticationData} >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

function mapDispatchToProps(dispatch) {
    return { setUserId: id => dispatch(setUserId(id))};
}
const LogInScreen = connect(null, mapDispatchToProps)(LogInScreenComp)

const styles = StyleSheet.create({
  buttonStyle:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#68a0cf',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  submitText:{
      color:'#fff',
      textAlign:'center',
  }
})

export default LogInScreen;
