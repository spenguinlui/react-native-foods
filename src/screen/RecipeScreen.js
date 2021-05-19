import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
import { useEffect, useState } from 'react/cjs/react.development';
import * as StorageHelper from '../helper/StorageHelper';

export default function RecipeScreen (props) {
  const [recipeData, setRecipeData] = useState({});

  const loadStorageData = async () => {
    const gotData = await StorageHelper.getJsonArraySetting('recipe');
    setRecipeData(gotData);
    console.log('得到資料了', gotData)
  }

  // 移除食譜
  const removeRecipe = async (item) => {
    await StorageHelper.removeJsonArraySetting('recipe',item );
    const gotData = await StorageHelper.getJsonArraySetting('recipe');
    setRecipeData(gotData);
    console.log('移除該食譜, 新食譜資料:', gotData)
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
          <Button title='>>細節' onPress={() => props.navigation.push('RecipeDetail', { data: item })} />
          <Button title='-' onPress={() => removeRecipe(item)} />
        </TouchableOpacity>
      </View>
      <View style={styles.seperator}/>
    </View>
  )

  useEffect(() => {
    loadStorageData();
  }, [])

  return (
    <View>
      <Button title="點我更新食譜" onPress={ () => loadStorageData() }/>
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