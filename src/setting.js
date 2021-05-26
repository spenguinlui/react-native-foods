import React from 'react';
import { Image } from 'react-native';
import styles from './style/image';

// 主色系
export const MAIN_COLOR = "#FC7676";
export const MAIN_COLOR_2 = "#FF9292";
export const SECONDARY_COLOR = "#99154E";
export const BACKGROUND_COLOR = "#FFE8E8";

// 預設食材類型
export const DEFAULT_FOOD_TYPE = 'seafoods';

// 預設每頁資料量
export const DATA_COUNT_PER_PAGE = 10;

// 單件準備食材最高使用量
export const MAX_PREPARED_COUNT = 50;

// 食材類型中英文置換列表
// use: () => FoodConvertList[title]() || FoodConvertList['default']()
export const FoodConvertList = {
  'fruit': () => '水果類',
  'prepared_and_other': () => '加工調理食品及其他類',
  'meat': () => '肉類',
  'legume': () => '豆類',
  'milk': () => '乳品類',
  'fat': () => '油脂類',
  'nut': () => '堅果類',
  'egg': () => '蛋類',
  'seafoods': () => '魚貝類',
  'mushroom': () => '菇類',
  'drink': () => '飲料類',
  'grains': () => '穀物類',
  'vegetable': () => '蔬菜類',
  'seasoning': () => '調味料及香辛料類',
  'starch': () => '澱粉類',
  'pastry': () => '糕餅點心類',
  'sugar': () => '糖類',
  'alga': () => '藻類',
  'default': () => '未定義類型',
  '水果類': () => 'fruit',
  '加工調理食品及其他類': () => 'prepared_and_other',
  '肉類': () => 'meat',
  '豆類': () => 'legume',
  '乳品類': () => 'milk',
  '油脂類': () => 'fat',
  '堅果及種子類': () => 'nut',
  '蛋類': () => 'egg',
  '魚貝類': () => 'seafoods',
  '菇類': () => 'mushroom',
  '飲料類': () => 'drink',
  '穀物類': () => 'grains',
  '蔬菜類': () => 'vegetable',
  '調味料及香辛料類': () => 'seasoning',
  '澱粉類': () => 'starch',
  '糕餅點心類': () => 'pastry',
  '糖類': () => 'sugar',
  '藻類': () => 'alga',
  '未定義類型': () => 'default'
}

// 食物 icon 元件列表
export const IconImage = (title, activeIcon) => {
  const IconImageList =  {
    'fruit': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/fruit.png')}/>,
    'prepared_and_other': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/prepared_and_other.png')}/>,
    'meat': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/meat.png')}/>,
    'legume': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/legume.png')}/>,
    'milk': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/milk.png')}/>,
    'fat': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/fat.png')}/>,
    'nut': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/nut.png')}/>,
    'egg': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/egg.png')}/>,
    'seafoods': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/seafoods.png')}/>,
    'mushroom': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/mushroom.png')}/>,
    'drink': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/drink.png')}/>,
    'grains': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/grains.png')}/>,
    'vegetable': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/vegetable.png')}/>,
    'seasoning': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/seasoning.png')}/>,
    'starch': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/starch.png')}/>,
    'pastry': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/pastry.png')}/>,
    'sugar': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/sugar.png')}/>,
    'alga': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/alga.png')}/>,
    'default': () => <Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('./images/undefined.png')}/>
  };
  return IconImageList[title]() || IconImageList['default']();
}

// 食物大圖元件列表
export const bgImage = (title) => {
  const IconImageList =  {
    'fruit': () => <Image style={styles.bgImage} source={require('./images/fruit.png')}/>,
    'prepared_and_other': () => <Image style={styles.bgImage} source={require('./images/prepared_and_other.png')}/>,
    'meat': () => <Image style={styles.bgImage} source={require('./images/meat.png')}/>,
    'legume': () => <Image style={styles.bgImage} source={require('./images/legume.png')}/>,
    'milk': () => <Image style={styles.bgImage} source={require('./images/milk.png')}/>,
    'fat': () => <Image style={styles.bgImage} source={require('./images/fat.png')}/>,
    'nut': () => <Image style={styles.bgImage} source={require('./images/nut.png')}/>,
    'egg': () => <Image style={styles.bgImage} source={require('./images/egg.png')}/>,
    'seafoods': () => <Image style={styles.bgImage} source={require('./images/seafoods.png')}/>,
    'mushroom': () => <Image style={styles.bgImage} source={require('./images/mushroom.png')}/>,
    'drink': () => <Image style={styles.bgImage} source={require('./images/drink.png')}/>,
    'grains': () => <Image style={styles.bgImage} source={require('./images/grains.png')}/>,
    'vegetable': () => <Image style={styles.bgImage} source={require('./images/vegetable.png')}/>,
    'seasoning': () => <Image style={styles.bgImage} source={require('./images/seasoning.png')}/>,
    'starch': () => <Image style={styles.bgImage} source={require('./images/starch.png')}/>,
    'pastry': () => <Image style={styles.bgImage} source={require('./images/pastry.png')}/>,
    'sugar': () => <Image style={styles.bgImage} source={require('./images/sugar.png')}/>,
    'alga': () => <Image style={styles.bgImage} source={require('./images/alga.png')}/>,
    'default': () => <Image style={styles.bgImage} source={require('./images/undefined.png')}/>
  };
  return IconImageList[title]() || IconImageList['default']();
}