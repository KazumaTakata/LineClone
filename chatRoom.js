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

import { StackNavigator } from 'react-navigation';


type Props = {};
class ChatRoom extends Component<Props> {

  constructor(props){
    super(props);
    const { params } = this.props.navigation.state;
    console.log(params)

    this.state = { text: "", chatData: [
      {which: 1, content: "Hellooofeefewfewafwfewfwefewfewfwfwefwfwefeweafwefeweeeeeo"},
      {which: 0, content: "Hello bro"},
      {which: 0, content: "What's happen"},
      {which: 1, content: "What's happen"}
    ]};
    console.log(`user/talks/name/${params.name}`)
    firebase.database()
        .ref(`user/talks/name/${params.name}`)
        .on('value', (snapshot) => {
          const value = snapshot.val();
          console.log(value)

        })
    this.setState((prevState) => {

    })


  }
  textInputChange(){
    console.log("text input is changed");

  }
  buttonPressed(){
    console.log("button pressed")
  }

  chatboxRender(data){
    let style = null
    let viewStyle = null
    if (data.which == 0){
      style = styles.chatBoxStyleRight
      viewStyle = "flex-start"
    }else{
      style = styles.chatBoxStyleLeft
      viewStyle = "flex-end"
    }

    return <View style={{padding: 10, alignItems: viewStyle}}><Text style={style}>{data.content}</Text></View>

  }

  render() {
    return (
      <View style={{flex: 1, alignItems: "center"}}>
      <Header headerTitle="ChatRoom"></Header>
        <ScrollView>
            <FlatList style={{width: 350}}
                data={this.state.chatData}
                renderItem={({item}) => this.chatboxRender(item)
            }/>
        </ScrollView>

    <View style={{flexDirection: "row" ,position: "absolute", bottom: 2}}>
      <TextInput onChangeText = {this.textInputChange} style={styles.TextBoxStyle} value={this.state.text}></TextInput>
      <TouchableOpacity style={styles.buttonStyle} onPress={this.buttonPressed}>
          <Text style={{textAlign: "center", color: "white"}}>Send</Text>
      </TouchableOpacity>
    </View>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  tri:{
    position:"absolute",
    top: 10,
    right: 0
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  maintext:{
    color: 'blue',
    fontSize: 30
  },
  TextBoxStyle:{
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "black",
    width: "70%",
    marginLeft: 20,
    fontSize: 20,
    margin: 20
  },
  buttonStyle:{
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "black",
    backgroundColor: "green",
    width: 50,
  },
  chatBoxStyleRight: {
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    backgroundColor: "green",
    color: "white"
  },
  chatBoxStyleLeft: {
    borderRadius: 10,
    overflow: "hidden",
    padding: 10,
    backgroundColor: "red",
    color: "white"
  }
});




export default ChatRoom;
