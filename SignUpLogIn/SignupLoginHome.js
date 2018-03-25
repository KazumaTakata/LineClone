import React, { Component } from 'react';
import { connect } from "react-redux";
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
  ListItem,
  TouchableHighlight
} from 'react-native';

import { StackNavigator } from 'react-navigation';



type Props = {};
class SignupLoginHome extends Component<Props> {

  static navigationOptions = ({ navigation }) => { {

    let params = navigation.state.params
    console.log(params)

    return {
    headerTitle: 'HOME'
    }
    }
  }

  constructor(props){
    super(props);

    this.state = {
                  friends: [],
                  imageUrl: {}
    };
    this.GoToSignUp = this.GoToSignUp.bind(this)
    this.GoToLogIn = this.GoToLogIn.bind(this)
  }

  GoToSignUp(){
    this.props.navigation.navigate('signup')
  }

  GoToLogIn(){
    this.props.navigation.navigate('login')
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Text style={{textAlign:'center', fontSize: 30, padding: 30, color: "white", backgroundColor: "#68a0cf"}}>LINE CLONE</Text>
        <TouchableHighlight style={styles.buttonStyle} underlayColor='#fff' onPress={this.GoToSignUp} >
          <Text style={styles.submitText}>SignUp</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.buttonStyle} underlayColor='#fff' onPress={this.GoToLogIn} >
          <Text style={styles.submitText}>LogIn</Text>
        </TouchableHighlight>
      </View>
  );
  }
}

const styles = StyleSheet.create({

  buttonStyle:{
    marginRight:40,
    marginLeft:40,
    marginTop:60,
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

export default SignupLoginHome;
