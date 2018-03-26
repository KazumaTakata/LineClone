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
  TouchableHighlight,
  Modal
} from 'react-native';
import firebase from 'react-native-firebase';
import Swipeable from 'react-native-swipeable';
import { StackNavigator } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { setFriends } from "../../redux/action"
const { fromJS } = require('immutable')
import Icon from 'react-native-vector-icons/FontAwesome';
import { Query, graphql } from "react-apollo";
import {gql} from "apollo-boost";


const TrainerQuery = gql`
  query Query {
    user(id: "4ij7rdxxJLVtY3cvAogZB5wiy692") {
      id
    }
  }
`

type Props = {};
class FriendsListComp extends Component<Props> {

  static navigationOptions = ({ navigation }) => { {

    let params = navigation.state.params


    return {
    headerTitle: 'friends',
    headerRight: (
        <Icon.Button name="search" color="black" backgroundColor="transparent" onPress={ () => { params.navigationToAddFriend() } }>
            SEARCH
        </Icon.Button>
      ),
    headerLeft: (
        <Icon.Button name="cog" color="black" backgroundColor="transparent" onPress={ () => { params.navigationToUserProfile() } }>
            SETTING
        </Icon.Button>
      ),
    }
    }
  }

  queryFriends(){
    firebase.database()
        .ref(`user/${this.props.reduxState.dataReducer.id}/friends`)
        .on('value', (snapshot) => {
          console.log("queryCalled")
          let friendIds = []
          snapshot.forEach(function(childSnapshot) {
          let childKey = childSnapshot.key;
          let childData = childSnapshot.val();
          friendIds.push(childData.id)
          })
          this.setState((prevState) => {
            let Mstate = fromJS(prevState)
            let Mstate1 = Mstate.setIn(["friends"], [])
            return Mstate1.toJSON()
          })
          this.props.setFriends(friendIds)

          friendIds.forEach((id) => {
          firebase.database()
                .ref(`user/${id}`)
                .on('value', (snapshot) => {
                  let userVal = snapshot.val()
                  userVal["id"] = id
                  this.setState((prevState) => {
                    let Mstate = fromJS(prevState)
                    let Mstate1 = Mstate.updateIn(["friends"], list => list.push(userVal))
                    return Mstate1.toJSON()
                    })
                  })
        })
      });
  }

  componentWillMount() {
    console.log("focus")
    this.props.navigation.setParams({ navigationToAddFriend: this._navigationToAddFriend });
    this.props.navigation.setParams({ navigationToUserProfile: this._navigationToUserProfile });

    this.props.setFriends([])
  }

  _navigationToAddFriend =() => {

    this.props.navigation.navigate('AddFriend')
  }

  _navigationToUserProfile =() => {

    this.props.navigation.navigate('UserProfile')
  }

  constructor(props){
    super(props);


    this.state = {
                  friends: [],
                  imageUrl: {},
                  modalVisible: false,
                  activeModalName: null,
                  activeModalPhoto: null,
                  activeModalId: null
    };


    swipeoutBtns = [
      {
        text: 'Button',
        backgroundColor: "red",
        onPress: () => {
          this.deleteButton()
        }
      }
      ]

      storage = firebase.storage();
      this.queryFriends = this.queryFriends.bind(this)
      this.modalRender = this.modalRender.bind(this)
      this.goToChat = this.goToChat.bind(this)

      // this.queryFriends()
  }

  componentDidMount(){
    console.log("did mounted")

    this.props.navigation.addListener('willFocus', (playload)=>{
    this.queryFriends()
    })
  }





  textInputChange(){
    console.log("text input is changed");
  }
  buttonPressed(){
    console.log("button pressed")
  }
  FriendItemTouch(name, id, photo){
    console.log(id)
    this.setModalVisible(!this.state.modalVisible)
    this.setState((prevState) => {
      let Mstate = fromJS(prevState)
      let Mstate1 = Mstate.setIn(["activeModalName"], name)
      let Mstate2 = Mstate1.setIn(["activeModalPhoto"], photo)
      let Mstate3 = Mstate2.setIn(["activeModalId"], id)
      return Mstate3.toJSON()
    })
    // this.props.navigation.navigate('Talk', {
    //                             name,
    //                             id
    //                             })
  }
  deleteButton(){
    console.log("delete")
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  modalRender(){
    if (this.state.activeModalPhoto != null){
        return (
            <Image  style={{height: 100, width: 100, borderRadius: 50}} source={{uri: this.state.activeModalPhoto}}/>
          )
    }
    return <Text>{this.state.activeModalName}</Text>
  }

  goToChat(visible){
    let name = this.state.activeModalName
    let id = this.state.activeModalId
    this.setState({modalVisible: visible});
    this.props.navigation.navigate('Talk', {
                                name,
                                id
                                })
  }

  // friendsListRender(){
  //   return( <Query query={TrainerQuery}>
  //     {({ loading, error, data }) => {
  //       if (loading) return <Text>Loading...</Text>;
  //       if (error){
  //         console.log(error.message)
  //         console.log(data)
  //         return <Text>Error :</Text>};
  //       console.log(data)
  //       return (<FlatList
  //                     data={data}
  //                     renderItem={({item}) =>
  //                     <Swipeout right={swipeoutBtns}>
  //                       <View style={styles.viewContainer}>
  //                               <Image  style={styles.image} source={{uri: item.profilePhoto}}/>
  //                               <Text id={item.id} onPress={ () => this.FriendItemTouch(item.userName, item.id, item.profilePhoto)} style={styles.chatBoxStyle}>{item.userName}</Text>
  //                       </View>
  //                     </Swipeout>
  //                  } />)
  //               }}
  //       </Query>)
  // }




  render() {
    return (
      <View style={{flex: 1, alignItems: "center"}}>
        <Modal
         animationType="slide"
         transparent={true}
         visible={this.state.modalVisible}
         onRequestClose={() => {
           alert('Modal has been closed.');
         }}>
         <View style={{flex: 1, alignItems: "center", justifyContent: "center", shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 1.0}}>
           <View style={{alignItems: "center", justifyContent: "center", width: 250, height: 250, backgroundColor: "rgb(162, 199, 90)", borderRadius: 20}}>

             <Text style={{color: "white", fontSize: 20, margin: 10}}>{this.state.activeModalName}</Text>
                { this.modalRender() }
             <View style={{flexDirection: "row", justifyContent: "space-around" , margin:10}}>
             <TouchableHighlight
               onPress={() => {
                 this.setModalVisible(!this.state.modalVisible);
               }}>
               <Text style={{color: "white", margin: 10}}>Hide</Text>
             </TouchableHighlight>
             <TouchableHighlight
               onPress={() => {
                 this.goToChat(!this.state.modalVisible)
               }}>
               <Text style={{color: "white", margin: 10}}>Chat</Text>
             </TouchableHighlight>
            </View>
           </View>
          </View>
        </Modal>
        <View>
        </View>
        <ScrollView>
            <FlatList
                data={this.state.friends}
                renderItem={({item}) => <Swipeout right={swipeoutBtns}><View style={styles.viewContainer}><Image  style={styles.image} source={{uri: item.profilePhoto}}/><Text id={item.id} onPress={ () => this.FriendItemTouch(item.userName, item.id, item.profilePhoto)} style={styles.chatBoxStyle}>{item.userName}</Text>
              </View>
            </Swipeout>
            }/>
        </ScrollView>
    </View>
  );
  }
}
//
// class Pokedex extends React.Component {
//
//   render () {
//     if (this.props.data.loading) {
//       return (<Text>Loading</Text>)
//     }
//
//     if (this.props.data.error) {
//       console.log(this.props.data.error)
//       return (<Text>An unexpected error occurred</Text>)
//     }
//
//     console.log(this.props.data.user.id)
//     return (
//       <View>
//         <Text>
//           {this.props.data.user.id}
//         </Text>
//       </View>
//     )
//   }
// }
//
// const TrainerQuery = gql`
//   query Query {
//     user(id: "4ij7rdxxJLVtY3cvAogZB5wiy692") {
//       id
//     }
//   }
// `

// const PokedexWithData = graphql(TrainerQuery)(Pokedex)


const mapStateToProps = state => {
  return { reduxState : state };
};

const mapDispatchToProps = (dispatch) => {
    return { setFriends: friendList => dispatch(setFriends(friendList))};
}

const FriendsList = connect(mapStateToProps, mapDispatchToProps)(FriendsListComp);


const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  viewContainer:{
    flexDirection: "row",
    backgroundColor: "rgb(162, 199, 90)",
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    padding: 10,
  },
  chatBoxStyle:{
    width: 1000,
    padding: 20,
    backgroundColor: "rgb(162, 199, 90)",
    fontSize: 20,
    color: "white"
  }

})


export default FriendsList;
