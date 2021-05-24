import React from 'react';
import { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import styles from '../../style/main';

import jsonData from '../../json/food_data.json';
import { FoodConvertList, DEFAULT_FOOD_TYPE, IconImage } from '../../setting';


// 食物中英文置換
const foodTypeToZhTw = (title) => FoodConvertList[title]() || FoodConvertList['default']();

const HeaderList = (props) => {
  const headerArray = Object.keys(jsonData);
  const [activeIcon, setActiveIcon] = useState(DEFAULT_FOOD_TYPE);

  const changeIngredientType = (title) => {
    props.setIngredientType(title);
    props.setPageNumber(1);
    setActiveIcon(title);
  }

  return (
    <View>
      <ScrollView
        style={styles.header}
        horizontal={ true }
        contentContainerStyle={{ alignItems: 'center' }}
      >
      { headerArray.map((title) => {
        if (title === 'undefined') return;  // 按下去會掛掉 todo: 待修正
        return (
          <TouchableOpacity key={title} onPress={ () => changeIngredientType(title) }>
            <View style={ activeIcon === title ? styles.headerActiveIcon : styles.headerIcon } >
              { IconImage(title, activeIcon) }
            </View>
          </TouchableOpacity>
        )
      }) }
      </ScrollView>
    </View>
  )
}

export default HeaderList;

// <View>
//         <Text>現在食材類型是: { foodTypeToZhTw(activeIcon) }</Text>
//       </View>