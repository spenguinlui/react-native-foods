import React from 'react';
import { Text, View, FlatList } from 'react-native';
import detailStyles from '../style/detail';

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

export default function RecipeDetail (props) {
  const data = props.route.params.data || {};

  const renderNutrientCard = (nu_data) => (
    <View style={ detailStyles.nutrientOuterBlock } key={ nu_data.type }>
      <View style={ detailStyles.nutrientBlock }>
        <Text style={ detailStyles.nutrientTitleText }>{ nu_data.type }</Text>
        { nu_data.content.map((nu_data_content) => {
          if (nu_data_content.per_content <= 0) return;
          return (
            <View style={ detailStyles.nutrientList } key={ nu_data_content.name }>
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
    <View style={ detailStyles.container } key={ data.name }>
      <View style={ detailStyles.circleBg }/>
      <View style={ detailStyles.topContent }>
        <View style={ detailStyles.nameBlock }>
          <Text style={ detailStyles.name }>{ data.name }</Text>
        </View>
      </View>
      <View style={ detailStyles.listContainer }>
        { data.ingredient.map(({name, count}, index) => (
          <View style={ [detailStyles.listBlock, { paddingLeft: index % 2 !== 0 ? 10 : 0 }] } key={ index }>
            <Text style={ detailStyles.listText }>{ name }</Text>
            <Text style={ detailStyles.listText }> x { count || 1 }</Text>
          </View>
        )) }
      </View>
      <View style={ detailStyles.nutrientBoard }>
        <FlatList
          data={ dataWithType(data.nutrient_content) }
          renderItem={ ({item}) => renderNutrientCard(item) }
          keyExtractor={ (item, index) => index }
          horizontal={ false }
          numColumns={ 2 }
        />
      </View>
    </View>
  )
}