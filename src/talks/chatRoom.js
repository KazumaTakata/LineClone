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
import firebase from 'react-native-firebase';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {};
class ChatRoomComp extends Component<Props> {

  static navigationOptions = ({ navigation, screenProps }) => ({
    title:  'Chat Room',
    headerLeft: <Icon.Button name="arrow-left" backgroundColor="transparent" color="black" onPress={ () => {navigation.goBack()} }>
                    ChatList
                </Icon.Button>
  });



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
    this.queryFriends = this.queryFriends.bind(this)
    this.buttonPressed = this.buttonPressed.bind(this)

    this.queryFriends()
  }


  buttonPressed(){
    console.log("button pressed")
    const { params } = this.props.navigation.state;

    firebase.database()
      .ref(this.MeToYou).push()
      .set({
        talk: this.state.text,
        which: 1
      });
    firebase.database()
      .ref(this.YouToMe).push()
      .set({
        talk: this.state.text,
        which: 0
      });

    let meId = this.props.reduxState.dataReducer.id
    let youId = params.id


    const writeOrder = function(meId, youId){
      let talkOrderList = `user/${meId}/talkOrder`
      firebase.database()
        .ref(talkOrderList).once("value", (snapshot)=>{
          let order = snapshot.val()
          if (order != null){
            console.log(order)
            let index = order.indexOf(youId)
            if (index > -1) {
              let orderRem = order.splice(index, 1)
              let orderNew = orderRem.unshift(youId)
            } else{
              let orderNew = order.unshift(youId)
            }
            firebase.database()
              .ref(talkOrderList).set({orderNew})
          } else{
            firebase.database()
              .ref(talkOrderList).set([youId])
          }
          }
        )
    }
    writeOrder(meId, youId)
    writeOrder(youId, meId)




    }

  queryFriends(){
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

      this.queryFriends()

    })
  }

  render() {
    return (
      <View style={{flex: 1, alignItems: "center"}}>
        <View style={{flex: 6, alignItems: "center"}}>
        <ScrollView ref={ref => this.scrollView = ref} onContentSizeChange={(contentWidth, contentHeight)=>{
        this.scrollView.scrollToEnd({animated: true});
            }} >
            <FlatList style={{width: 350}}
                data={this.state.chatData}
                renderItem={({item}) => this.chatboxRender(item)
            }/>
        </ScrollView>
        </View>
        <View style={{flex: 1, alignItems: "center"}}>
          <View style={{alignItems: "center" ,flexDirection: "row" ,position: "absolute", bottom: 2}}>
            <TextInput onChangeText={(text) => this.setState({text})} style={styles.TextBoxStyle} value={this.state.text}></TextInput>
            <TouchableOpacity style={styles.buttonStyle} onPress={this.buttonPressed}>
                <Text style={{justifyContent: 'center', color: "white"}}>Send</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: "black",
    height: 40,
    width: 50,
    justifyContent: 'center',
    alignItems: "center"
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

const mapDispatchToProps = (dispatch) => {
    return { setFriends: friendList => dispatch(setFriends(friendList))};
}


const ChatRoom = connect(mapStateToProps, null)(ChatRoomComp);


export default ChatRoom;
