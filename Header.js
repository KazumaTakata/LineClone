import React, { Component } from "react";

import { TextInput, View, Text, StyleSheet } from "react-native";



class Header extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return(
      <View style={styles.header}><Text style={styles.headerText}>{this.props.headerTitle}</Text></View>
    )
  }

}


export default Header

const styles = StyleSheet.create({
  header: {
    backgroundColor: "green",
    width: "100%",
    shadowOffset:{ width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: .3
  },
  headerText: {
    textAlign: "center",
    padding: 10,
    fontSize: 20,
    color: "white",

  }
})
