import React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';

export default function HomeScreen (props) {
  return (
    <View>
      <Text>我是首頁</Text>
      <TouchableOpacity>
        <Button title='前往說明書' onPress={() => props.navigation.push('Instruction')} />
      </TouchableOpacity>
    </View>
  )
}