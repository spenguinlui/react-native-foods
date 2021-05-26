import React from 'react';
import { Text, View, ScrollView, FlatList } from 'react-native';
import detailStyles from '../style/detail';

import { bgImage, FoodConvertList } from '../setting';

const dataWithType = (data) => {
  let newNutrientData = [];
  data.map((item) => {
    let existType = newNutrientData.find(i => i.type === item.type);
    if (!existType) {
      if (item.per_content > 0) newNutrientData.push({ type: item.type, content: [item] });
    } else {
      if (item.per_content > 0) existType.content.push(item);
    }
  })
  newNutrientData.sort((a, b) => {
    if (a.type > b.type) return 1;
    if (a.type < b.type) return -1;
  })
  return newNutrientData;
}

export default function IngredientDetail (props) {
  const data = props.route.params.passProps || {};
  const renderNutrientCard = (nu_data) => (
    <View style={ detailStyles.nutrientOuterBlock }>
      <View style={ detailStyles.nutrientBlock } key={nu_data.type}>
        <Text style={ detailStyles.nutrientTitleText }>{ nu_data.type }</Text>
        { nu_data.content.map((nu_data_content) => {
          if (nu_data_content.per_content <= 0) return;
          return (
            <View style={ detailStyles.nutrientList }>
              <View><Text style={ detailStyles.nutrientName }>{nu_data_content.name}</Text></View>
              <View style={ detailStyles.nutrientListText }>
                <View><Text style={ detailStyles.valueText }> {Math.round(nu_data_content.per_content)}</Text></View>
                <View><Text style={ detailStyles.unitText }> /g</Text></View>
              </View>
            </View>
          )
        }) }
      </View>
    </View>
  )
  return (
    <ScrollView style={detailStyles.container}>
      <View style={detailStyles.circleBg} />
      <View style={detailStyles.topContent}>
        <View>
          <View style={detailStyles.nameBlock}>
            <Text style={detailStyles.name}>{data.name}</Text>
          </View>
          <View style={detailStyles.enNameBlock}>
            <Text style={detailStyles.enName}>{data.en_name}</Text>
          </View>
        </View>
        <View>
          { bgImage(FoodConvertList[data.food_type]() || FoodConvertList['未定義類型']()) }
        </View>
      </View>
      <View style={detailStyles.descriptionBlock}>
        { data.common_name ? <Text style={detailStyles.description}>俗名: {data.common_name}</Text> : <Text style={detailStyles.description} /> }
        <Text style={detailStyles.description}>{data.description}</Text>
      </View>
      <View style={detailStyles.nutrientBoard}>
        <FlatList
          data={dataWithType(data.nutrient_content)}
          renderItem={({item}) => renderNutrientCard(item)}
          keyExtractor={(item, index) => index}
          horizontal={false}
          numColumns={2}
        />
      </View>
    </ScrollView>
  )
}
      {/*<Text>廢棄率: {data.abandonment_rate}</Text>*/}
      {/*<Text>每單位重: {data.unit_weight}</Text>*/}
                {/* <Text>含量單位: {nu_data.unit_content}</Text> */}
                {/* <Text>每單位重: {nu_data.per_100_content}</Text> */}
                {/* <Text>每單位重含量: {nu_data.per_weight}</Text> */}
                {/* <Text>樣本數: {nu_data.per_weight_content}</Text> */}
                {/* <Text>標準差: {nu_data.sample_count}</Text> */}