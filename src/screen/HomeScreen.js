import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from '../style/main';

export default function HomeScreen (props) {
  return (
    <View style={ styles.container }>
      <TouchableOpacity style={ styles.mainButton } onPress={ () => props.navigation.push('Instruction') }>
        <Text style={ styles.text }>操作說明</Text>
      </TouchableOpacity>
    </View>
  )
}