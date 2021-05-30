import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

import jsonData from '../../json/food_data.json';
import { DEFAULT_FOOD_TYPE, IconImage, MAIN_COLOR_2 } from '../../setting';

// 用於 IngredientScreen
const HeaderList = (props) => {
  const headerArray = Object.keys(jsonData);     // 這裡也要讀取一次原始 json資料(的key)
  const [activeIcon, setActiveIcon] = useState(DEFAULT_FOOD_TYPE);  // 現在所選食材類型

  const changeIngredientType = (title) => {
    props.setIngredientType(title);
    props.setPageNumber(1);
    setActiveIcon(title);
  }

  return (
    <View>
      <ScrollView
        style={ styles.header }
        horizontal={ true }
        contentContainerStyle={{ alignItems: 'center' }}
      >
      { headerArray.map((title) => {
        if (title === 'undefined') return;  // 按下去會掛掉 todo: 待修正，原始資料好像不用特地加一個 undefined 的空物件
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

const styles = StyleSheet.create({
  header: {
    height: 70,
    paddingLeft: 10,
    marginVertical: 10,
  },
  headerIcon: {
    marginRight: 10,
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 50
  },
  headerActiveIcon: {
    marginRight: 10,
    padding: 10,
    backgroundColor: MAIN_COLOR_2,
    borderRadius: 50
  }
});

export default HeaderList;