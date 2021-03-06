import React, { useEffect, useState } from 'react';
import { Text, View, Alert, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../style/main';

import * as StorageHelper from '../helper/StorageHelper';

export default function RecipeScreen ({navigation}) {
  const [recipeData, setRecipeData] = useState([]);   // 食譜資料
  const [recipeCount, setRecipeCount] = useState(0);  // 食譜數量
  const [disableArrived, setDisableArrived] = useState('');  // 預防按鈕重複點擊

  // todo: 讀取資料會有重複讀取問題
  const loadStorageData = async () => {
    const gotData = await StorageHelper.getJsonArraySetting('recipe');
    if (gotData) {
      setRecipeData(gotData);
      setRecipeCount(gotData.length);
      // console.log('得到資料了');
    }
  };

  // 確定是否移除 我的最愛
  const removeAlert = (item) =>
    Alert.alert(
      "確定要刪除食譜嗎？",
      "",
      [
        { text: "確定", onPress: () => removeRecipe(item), style: "cancel" },
        { text: "再想想" }
      ]
    )

  // 移除食譜
  const removeRecipe = async (item) => {
    await StorageHelper.removeJsonArraySetting('recipe', item);
    setRecipeCount(recipeCount - 1);
    // console.log('移除該食譜');
  };

  // FlatList 元件所需
  const renderRecipe = (item) => (
    <TouchableOpacity
      style={ styles.mainList }
      onPress={ () => goRecipeDetail(item) }
      disabled={ disableArrived === item.name ? true : false }
    >
      <View style={ styles.listView }>
        <View style={ styles.listTextBlock }>
          <Text ellipsizeMode='tail' numberOfLines={ 1 } style={ styles.listTitle }>
            { item.name }
          </Text>
          <Text ellipsizeMode='tail' numberOfLines={ 1 } style={ styles.listDescription }>
            材料: { item.ingredient.map(({name}) => `${name} .`) }
          </Text>
        </View>
        <TouchableOpacity style={ styles.listIcon } onPress={ () => removeAlert(item) }>
          <Ionicons name={'ios-trash-outline'} size={25} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // 前往至食材細節
  const goRecipeDetail = (item) => {
    setDisableArrived(item.name);
    navigation.push('RecipeDetail', { data: item, key: item.name });
  };

  // 每次進來都要復原 關閉細節的按鈕
  useEffect(() => {
    const resetDisabledButton = navigation.addListener('focus', () => setDisableArrived(''));
    return resetDisabledButton;
  }, [navigation]);

  // 每次切換頁面 render 食譜清單
  useEffect(() => {
    const refreshList = navigation.addListener('focus', () => loadStorageData());
    return refreshList;
  }, [loadStorageData]);

  // 移除食譜時重新渲染資料
  useEffect(() => {
    loadStorageData();
  }, [recipeCount]);

  return (
    <View style={ styles.listContainer }>
      <FlatList
        data={ recipeData }
        renderItem={ ({item}) => renderRecipe(item) }
        keyExtractor={ (item) => item.name }
        getItemLayout={ (data, index) => (
          { length: 80, offset: 80 * index, index }
        ) }
      />
    </View>
  );
}