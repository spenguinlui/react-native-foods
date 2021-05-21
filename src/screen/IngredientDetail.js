import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from '../style/main';

export default function IngredientDetail (props) {
  const data = props.route.params.passProps || {}
  return (
    <ScrollView key={props.route.params.key}>
      <Text>我是食材細節</Text>
      <Text>類型: {data.food_type}</Text>
      <Text>名字: {data.name}</Text>
      <Text>英文名字: {data.en_name}</Text>
      <Text>俗名: {data.common_name}</Text>
      <Text>敘述: {data.description}</Text>
      <Text>廢棄率: {data.abandonment_rate}</Text>
      <Text>每單位重: {data.unit_weight}</Text>
      { data.nutrient_content.map((nu_data) => {
        // 如果包含成分沒標示或是 0 就不顯示了
        if (nu_data.per_content > 0 && nu_data.unit_content > 0 ) {
          return (
            <View>
              <Text>－－－－－－－</Text>
              <Text>營養成分: {nu_data.name}</Text>
              <Text>類型: {nu_data.type}</Text>
              <Text>含量單位: {nu_data.unit_content}</Text>
              <Text>每單位含量: {nu_data.per_content}</Text>
              <Text>每單位重: {nu_data.per_100_content}</Text>
              {/* <Text>每單位重含量: {nu_data.per_weight}</Text> */}
              {/* <Text>樣本數: {nu_data.per_weight_content}</Text> */}
              {/* <Text>標準差: {nu_data.sample_count}</Text> */}
              <Text>－－－－－－－</Text>
            </View>
          )
        }
      }) }
    </ScrollView>
  )
}