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
import { setFriends } from "../../redux/action"
const { fromJS } = require('immutable')
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from "axios"

type Props = {};
class NewsMainComp extends Component<Props> {

  static navigationOptions = ({ navigation }) => { {

    let params = navigation.state.params

    return {
    headerTitle: 'News',
    }

  }}

  componentWillMount() {
    console.log("focus")
  }

  constructor(props){
    super(props);


    this.state = {
                  news:null,
                  category: "general"
    };

    storage = firebase.storage();
    this.queryNews = this.queryNews.bind(this)
    this.renderList = this.renderList.bind(this)

    this.queryNews("general")

  }

  queryNews(category){
    let newsURL = 'https://newsapi.org/v2/top-headlines?' +
          'country=jp&' +
          `category=${category}&` +
          'apiKey=f3c5e090e20142f0b95b5a488b0d84e1';
    console.log(newsURL)
    axios.get(newsURL).then( newsData => {
      console.log(newsData)
      let Data = newsData.data.articles
      this.setState({news: Data})
    } )
  }

  gotoDetail(index){
    console.log("gotoDetail")
    console.log(index)
    this.props.navigation.navigate('NewsDetail', {
                                      news: this.state.news[index],
                                    })
  }
  renderTextImage(item, index){
    if (item.title != null && item.urlToImage != null){
      let imgUrl = null
      if (item.urlToImage.indexOf("https") >= 0 ){
        imgUrl = item.urlToImage
      }else{
        imgUrl = "https://firebasestorage.googleapis.com/v0/b/lineclone-2dcd7.appspot.com/o/linecloneImage%2FfacebookProfile.jpg?alt=media&token=2537b4f0-50fe-4f51-8230-b3abc65631d6"
      }
      return(
      <TouchableOpacity style={{padding: 20}} onPress={()=> {this.gotoDetail(index)}}>
      <View  style = {{flex: 1, flexDirection: "row"}}>
      <View  style = {{flex: 1}}>
        <Image style={{width: 50, height: 50, borderRadius: 25, marginRight: 10}} source={{uri: imgUrl}}></Image>
      </View>
      <View style={{ flex: 4}}>
      <Text>{item.title}</Text>
      </View>
      </View>
      </TouchableOpacity>
      )
      }
  }

  renderList(){
    if (this.state.news != null && this.state.news){
    console.log(this.state.news)
    return(
      <FlatList
          data={this.state.news}
          renderItem={({item, index}) => (
            <View>
              {this.renderTextImage(item, index)}
            </View> )}
          />
    )
    }
  }

  rerenderNews(C){
    this.queryNews(C)
  }


  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: "row", justifyContent: "space-around"}}>
          <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={() => this.rerenderNews('general')}
            underlayColor='#fff'>
            <Text style={styles.submitText}>top</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={() => this.rerenderNews('business')}
            underlayColor='#fff'>
            <Text style={styles.submitText}>business</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={() => this.rerenderNews('entertainment')}
            underlayColor='#fff'>
            <Text style={styles.submitText}>entertainment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={() => this.rerenderNews('health')}
            underlayColor='#fff'>
            <Text style={styles.submitText}>health</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={() => this.rerenderNews('science')}
            underlayColor='#fff'>
            <Text style={styles.submitText}>science</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={() => this.rerenderNews('sports')}
            underlayColor='#fff'>
            <Text style={styles.submitText}>sports</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.loginScreenButton}
            onPress={() => this.rerenderNews('technology')}
            underlayColor='#fff'>
            <Text style={styles.submitText}>technology</Text>
          </TouchableOpacity>

        </View>
        {this.renderList()}
      </View>
  );
  }
}

const mapStateToProps = state => {
  return { reduxState : state };
};

const mapDispatchToProps = (dispatch) => {
    return { setFriends: friendList => dispatch(setFriends(friendList))};
}

const NewsMain = connect(mapStateToProps, mapDispatchToProps)(NewsMainComp);


const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  loginScreenButton:{
    padding: 5,
    borderRadius:3,
    borderWidth: 1,
    borderColor: '#fff'
  },
  loginText:{
      color:'#fff',
      textAlign:'center',

  },
  submitText:{
    fontSize: 10
  }


})


export default NewsMain;
