import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, Image, View, ScrollView, TouchableOpacity } from 'react-native';

import jsonData from '../../json/food_data.json';
import { FoodConvertList, DEFAULT_FOOD_TYPE } from '../../setting';

// 食物圖片元件列表
const IconImage = (title, activeIcon) => {
  const IconImageList =  {
    'fruit': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/fruit.png')}/>,
    'prepared_and_other': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/prepared_and_other.png')}/>,
    'meat': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/meat.png')}/>,
    'legume': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/legume.png')}/>,
    'milk': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/milk.png')}/>,
    'fat': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/fat.png')}/>,
    'nut': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/nut.png')}/>,
    'egg': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/egg.png')}/>,
    'seafoods': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/seafoods.png')}/>,
    'mushroom': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/mushroom.png')}/>,
    'drink': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/drink.png')}/>,
    'grains': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/grains.png')}/>,
    'vegetable': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/vegetable.png')}/>,
    'seasoning': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/seasoning.png')}/>,
    'starch': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/starch.png')}/>,
    'pastry': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/pastry.png')}/>,
    'sugar': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/sugar.png')}/>,
    'alga': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/alga.png')}/>,
    'default': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../../images/undefined.png')}/>
  };
  return IconImageList[title]() || IconImageList['default']();
}

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
        horizontal={true}
      >
      { headerArray.map((title) => {
        if (title === 'undefined') return;  // 按下去會掛掉 todo: 待修正
        return (
          <TouchableOpacity key={title} onPress={ () => changeIngredientType(title) }>
            <View>
              { IconImage(title, activeIcon) }
            </View>
          </TouchableOpacity>
        )
      }) }
      </ScrollView>
      <View>
        <Text>現在食材類型是: { foodTypeToZhTw(activeIcon) }</Text>
      </View>
    </View>
  )
}

export default HeaderList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: 40,
    flexDirection: 'row',
  },
  mainView: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8
  },
  seperator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  image: {
    width: 40,
    height: 40,
  },
  activeImage: {
    width: 40,
    height: 40,
    backgroundColor: "#000"
  }
});