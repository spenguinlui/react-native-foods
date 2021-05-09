import React from 'react';
import { Text, View, TouchableOpacity, Button } from 'react-native';

export default function RecipeScreen (props) {
  return (
    <View>
      <Text>我是食譜頁</Text>
      <TouchableOpacity>
        <Button title='前往食譜細節' onPress={() => props.navigation.push('RecipeDetail')} />
      </TouchableOpacity>
    </View>
  )
}