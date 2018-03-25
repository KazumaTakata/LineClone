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
import firebase from 'react-native-firebase';
import Swipeable from 'react-native-swipeable';
import { StackNavigator } from 'react-navigation';
import Swipeout from 'react-native-swipeout';
import FontAwesome, { Icons } from 'react-native-fontawesome';
const { fromJS } = require('immutable')
import Icon from 'react-native-vector-icons/FontAwesome';
import { addFriendAct } from "../../redux/action";
import RNFetchBlob from 'react-native-fetch-blob'
import FirebaseClient from '../utils/firebaseClient'

let ImagePicker = require('react-native-image-picker');

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

// More info on all the options is below in the README...just some common use cases shown here
var options = {
  title: 'Select Avatar',
  customButtons: [
    {name: 'fb', title: 'Choose Photo from Facebook'},
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const uploadImage = (uri, mime = 'image/jpeg') => {
  return new Promise((resolve, reject) => {
    console.log(uri)
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const sessionId = new Date().getTime()
    let uploadBlob = null
    const imageRef = FirebaseClient.storage().ref('images').child('image_001')
    console.log(imageRef)
    fs.readFile(uploadUri, 'base64')
      .then((data) => {

        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        console.log(blob)
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        console.log(imageRef.getDownloadURL())
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        console.log(url)
        resolve(url)
      })
      .catch((error) => {
        reject(error)
        console.log(error)
    })
  })
}

type Props = {};
class UserProfileComp extends Component<Props> {

  static navigationOptions = {
    title: 'SETTING'
  }

  constructor(props){
    super(props);
    console.log("constructor")



    this.state = {
      id: "",
      avatarSource: ""
    }

    this.ImagePicker = require('react-native-image-picker');

  }

  componentDidMount(){
    firebase.database()
      .ref(`user/${this.props.reduxState.dataReducer.id}/profilePhoto`)
      .once('value', (snapshot) => {
        let profilePhotoUrl = snapshot.val()
        console.log(profilePhotoUrl)
        console.log(this.state)
        this.setState({avatarSource: profilePhotoUrl})
      })

  }

  openImage(ImagePicker){
    console.log(ImagePicker)
    ImagePicker.showImagePicker(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          console.log(response.uri)
          uploadImage(response.uri).then( url => {
            this.setState({avatarSource: url})

            let updates = {}
            updates[`user/${this.props.reduxState.dataReducer.id}/profilePhoto`] = url
            firebase.database()
              .ref()
              .update(updates);
          })
        }
      });
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, alignItems:"center", justifyContent: "center"}}>
          <Text style={{padding: 20, fontSize: 20}}>Profile Photo</Text>
          <Image style={styles.image} source={{uri: this.state.avatarSource}}></Image>
        </View>
        <View style={{flex: 1, alignItems:"center"}}>
            <TouchableHighlight style={styles.buttonStyle} underlayColor='#fff' onPress={() => { this.openImage(this.ImagePicker) }} >
              <Text style={styles.submitText}>Choose Profile Photo</Text>
            </TouchableHighlight>
        </View>
      </View>
  );
  }
}

const mapStateToProps = state => {
  return { reduxState : state };
};

const mapDispatchToProps = (dispatch) => {
    return { addFriendAct: friendList => dispatch(addFriendAct(friendList))};
}


const UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfileComp);

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  buttonStyle:{
    marginRight:40,
    marginLeft:40,
    marginTop:60,
    paddingTop:20,
    paddingBottom:20,
    padding: 20,
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

export default UserProfile;
