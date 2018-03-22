import React, { Component } from 'react';
import Triangle from 'react-native-triangle';
import { connect } from "react-redux";
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
class ChatRoomComp extends Component<Props> {

  constructor(props){
    super(props);
    const { params } = this.props.navigation.state;


    this.state = { text: "", chatData: []};

    this.MeToYou = `user/${this.props.reduxState.dataReducer.id}/talks/${params.id}`
    this.YouToMe = `user/${params.id}/talks/${this.props.reduxState.dataReducer.id}`

    firebase.database()
        .ref(this.MeToYou)
        .on('value', (snapshot) => {
          const value = snapshot.val();

        })

    this.buttonPressed = this.buttonPressed.bind(this)
  }


  buttonPressed(){
    console.log("button pressed")

    firebase.database()
      .ref(this.MeToYou).push()
      .set({
        talk: this.state.text,
        which: 0
      });
    firebase.database()
      .ref(this.YouToMe).push()
      .set({
        talk: this.state.text,
        which: 1
      });
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

    return <View style={{padding: 10, alignItems: viewStyle}}><Text style={style}>{data.talk}</Text></View>
  }

  componentWillMount() {
    this.props.navigation.addListener('willFocus', (playload)=>{

      firebase.database()
          .ref(this.MeToYou)
          .on('value', (snapshot) => {
            let talkList = []

            snapshot.forEach(function(childSnapshot) {
              console.log(childSnapshot)
              let childKey = childSnapshot.key;
              let childData = childSnapshot.val();
              talkList.push(childData)
            })
          this.setState((prevState) => {
            return { chatData: talkList }
          } )

    });
    })
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
      <TextInput onChangeText={(text) => this.setState({text})} style={styles.TextBoxStyle} value={this.state.text}></TextInput>
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


const mapStateToProps = state => {
  return { reduxState : state };
};

const ChatRoom = connect(mapStateToProps, null)(ChatRoomComp);


export default ChatRoom;
