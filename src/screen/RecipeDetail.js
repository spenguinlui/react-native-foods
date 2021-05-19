import React from 'react';
import { Text, View, ScrollView } from 'react-native';

export default function RecipeDetail (props) {
  const data = props.route.params.data || {}
  return (
    <View>
      <Text>我是食譜頁細節</Text>
      <Text>食譜名稱: { data.name }</Text>
      <Text>使用食材: { data.ingredient.map((name) => name) }</Text>
      <Text style={{ paddingBottom: 10 }}>營養成分: { data.nutrient_content.length }</Text>
      <ScrollView>
        { data.nutrient_content.map((item) => {
          return <Text key={item.name}>{ item.name } : { item.unit_content } 克</Text>
        }) }
      </ScrollView>
    </View>
  )
}