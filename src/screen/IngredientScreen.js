import React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';

export default function IngredientScreen (props) {
  return (
    <View>
      <Text>我是食材清單</Text>
      <TouchableOpacity>
        <Button title='前往食材細節' onPress={() => props.navigation.push('IngredientDetail')} />
      </TouchableOpacity>
    </View>
  )
}