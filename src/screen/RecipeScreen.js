import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react/cjs/react.development';
import * as StorageHelper from '../helper/StorageHelper';

export default function RecipeScreen ({navigation}) {
  const [recipeData, setRecipeData] = useState([]);   // 食譜資料
  const [recipeCount, setRecipeCount] = useState(0);  // 食譜數量

  // todo: 讀取資料會有重複讀取問題, 要用 promise 把更新到 state的動作都包起來
  const loadStorageData = async () => {
    const gotData = await StorageHelper.getJsonArraySetting('recipe');
    setRecipeData(gotData);
    setRecipeCount(gotData.length);
    console.log('得到資料了')
  }

  // 移除食譜
  const removeRecipe = async (item) => {
    await StorageHelper.removeJsonArraySetting('recipe',item );
    setRecipeCount(recipeCount - 1);
    console.log('移除該食譜');
  }

  // 
  const renderRecipe = (item) => (
    <View>
      <View style={styles.mainView}>
        <View style={{ flex: 1 }}>
          <Text ellipsizeMode='tail' numberOfLines={3} style={{ color: 'black', fontSize: 15, marginTop: 8 }}>
            食譜名稱: { item.name }
          </Text>
          <Text ellipsizeMode='tail' numberOfLines={3} style={{ marginTop: 8, fontSize: 13, marginBottom: 8 }}>
            材料: { item.ingredient.map((name) => `${name} .`) }
          </Text>
        </View>
        <TouchableOpacity>
          <Button title='>>細節' onPress={() => navigation.push('RecipeDetail', { data: item })} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeRecipe(item)}>
          <Ionicons name={'ios-trash-outline'} size={25} />
        </TouchableOpacity>
      </View>
      <View style={styles.seperator}/>
    </View>
  )

  // 首次進入畫面讀取資料
  useEffect(() => {
    loadStorageData();
  }, [])

  // 每次切換頁面 render 食譜清單
  useEffect(() => {
    const refreshList = navigation.addListener('focus', () => loadStorageData());
    return refreshList;
  }, [loadStorageData])

  // 移除食譜時重新渲染資料
  useEffect(() => {
    loadStorageData();
  }, [recipeCount])

  return (
    <View>
      <FlatList
        data={recipeData}
        renderItem={({item}) => renderRecipe(item)}
        keyExtractor={(item) => item.name}
        getItemLayout={(data, index) => (
          {length: 80, offset: 80 * index, index}
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 20,
    height: 40
  }
});