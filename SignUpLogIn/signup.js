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

class SignupScreenComp extends React.Component {

  static navigationOptions = ({ navigation }) => { {

    let params = navigation.state.params
    console.log(params)

    return {
    headerTitle: 'SIGNUP'
    }
    }
  }

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
        firebase.storage().ref("linecloneImage/facebookProfile.jpg").getDownloadURL().then((url) => {
          firebase.database()
            .ref(`user/${userId}`)
            .set({
              friendsNum: 0,
              profilePhoto: url,
              friends: "none",
              userName: username
            });
        })
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(message)

        if (message == "The given password is invalid."){
          this.setState((prevState) => {
            let Estate = fromJS(prevState)
            let Estate1 = Estate.setIn(["passwordError"], "The given password is invalid.")
            return Estate1.toJSON()
          })
          this.setState((prevState) => {
            let Estate = fromJS(prevState)
            let Estate1 = Estate.setIn(["emailError"], null)
            return Estate1.toJSON()
          })
        }
        if (message == "An email address must be provided."){
          this.setState((prevState) => {
            let Estate = fromJS(prevState)
            let Estate1 = Estate.setIn(["emailError"], "An email address must be provided.")
            return Estate1.toJSON()
          } )
          this.setState((prevState) => {
            let Estate = fromJS(prevState)
            let Estate1 = Estate.setIn(["passwordError"], null)
            return Estate1.toJSON()
          })
        }
        if (message == "The email address is badly formatted."){
          this.setState((prevState) => {
            let Estate = fromJS(prevState)
            let Estate1 = Estate.setIn(["emailError"], "The email address is badly formatted.")
            return Estate1.toJSON()
          } )
          this.setState((prevState) => {
            let Estate = fromJS(prevState)
            let Estate1 = Estate.setIn(["passwordError"], null)
            return Estate1.toJSON()
          })
        }

      });
    }

  sendAuthenticationData(){
    this.onRegister(this.state.email, this.state.password, this.state.username)
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
          <Text>Username</Text>
        <View style={this.state.nameTextInputStyle}>
            <TextInput onBlur={ () => { this.TextInputBlur("nameTextInputStyle") } } onFocus={() => {this.TextInputFocus("nameTextInputStyle") }} onChangeText={(username) => this.setState({username})} value={this.state.username} />
          </View>
          this.state.usernameError ? <Text style={{color: "red"}}>{this.state.usernameError}</Text> : null
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
const SignupScreen = connect(null, mapDispatchToProps)(SignupScreenComp)

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

export default SignupScreen;
