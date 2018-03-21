import React from 'react'
import { View, TextInput, Text } from 'react-native'

const TextField = props => (
  <View>
    <Text>{props.label}</Text>
    <TextInput/>
    props.error ? <Text>{props.error}</Text> : null
  </View>
)

export default TextField
