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
                  news:null
    };

    storage = firebase.storage();
    this.queryNews = this.queryNews.bind(this)
    this.renderList = this.renderList.bind(this)

    this.queryNews()

  }

  queryNews(){
    let newsURL = 'https://newsapi.org/v2/top-headlines?' +
          'country=jp&' +
          'apiKey=f3c5e090e20142f0b95b5a488b0d84e1';

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
  renderTextImage(item){
    if (item.title != null && item.urlToImage)
    return(
    <View  style = {{ flexDirection: "row"}}>
      <Image style={{width: 50, height: 50, borderRadius: 25, marginRight: 10}} source={{uri: item.urlToImage}}></Image>
    <View style={{ width: 200}}>
    <Text>{item.title}</Text>
    </View>
    </View>
    )
  }

  renderList(){
    if (this.state.news != null && this.state.news){
    console.log(this.state.news)
    return(
      <FlatList
          data={this.state.news}
          renderItem={({item, index}) => (
            <TouchableOpacity style={{padding: 20}} onPress={()=> {this.gotoDetail(index)}}>
              {this.renderTextImage(item)}
            </TouchableOpacity> )}
          />
    )
    }
  }


  render() {
    return (
      <View style={{flex: 1, alignItems: "center"}}>
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


})


export default NewsMain;
