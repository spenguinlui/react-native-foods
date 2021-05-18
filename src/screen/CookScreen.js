import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Button, ScrollView, TextInput } from 'react-native';
import { useState } from 'react/cjs/react.development';

import * as StorageHelper from '../helper/StorageHelper';

import { useMappedState, useDispatch } from 'redux-react-hook';
import { addToPrepareCookingList, removeFromPrepareCookingList } from '../redux/action';


export default function CookScreen ({navigation}) {
  const [recipe, setRecipe] = useState({name: '', ingredient: [], nutrient_content: []});
  const [recipeName, setRecipeName] = useState('');
  const prepareCookingList = useMappedState(state => state.prepareCookingList);
  const disPatch = useDispatch();
  
  // 確定是否烹煮 Alert
  const IsCookAlert = () =>
    Alert.alert(
      "將會清空目前已選定食材...",
      "",
      [
        { text: "確定", onPress: () => cookFunc(), style: "cancel" },
        { text: "再想想", onPress: () => console.log("先不煮") }
      ]
    )

  const cookFunc = () => {
    let newRecipe = {
      name: '',
      ingredient: [],
      nutrient_content: []
    }
    prepareCookingList.forEach((item) => {
      newRecipe.ingredient.push(item.name);
      if (!item.nutrient_content) return;  // 如果沒有營養成分便跳過

      // 計算所有營養成分 todo: 目前是單份含量而已，還需要增加數目
      item.nutrient_content.forEach((nutrient_item) => {
        if (nutrient_item.unit_content <= 0 || nutrient_item.per_content <= 0) return; // 如果營養成分低於 0 不納入計算
        let exisit_nutrient = newRecipe.nutrient_content.find(exisit_item => exisit_item.name === nutrient_item.name)
        if (exisit_nutrient) {
          exisit_nutrient.unit_content += parseFloat(nutrient_item.unit_content);
        } else {
          newRecipe.nutrient_content.push({name: nutrient_item.name, unit_content: parseFloat(nutrient_item.unit_content)})
        }
      })
    })

    // 加入 state
    setRecipe(newRecipe);
    console.log(newRecipe.ingredient, newRecipe.nutrient_content.length)
    console.log('進入烹煮')
    // todo: 要清空 prepareCookingList
  }

  const addRecipeToStorage = () => {
    try {
      StorageHelper.setJsonArraySetting('recipe', recipe);
      console.log("加入食譜成功");
    } catch(error) {
      console.log("加入食譜失敗");
    }
  }

  useEffect(() => {
    console.log('數量變了', prepareCookingList.length)
  }, [prepareCookingList])

  useEffect(() => {
    console.log("食譜更新")
  }, [recipe])

  return (
    <View style={styles.container}>
      { prepareCookingList.length && <Text>目前食材列表:</Text> }
      { prepareCookingList.map((item, index) => <Text>{`${index}: ${item.name}`}</Text>)}
      { recipe.ingredient.length > 0 && (
        <View>
          <Text>已新增料理！ 料理名稱: { recipe.name }</Text>
          { recipe.ingredient.map((ingredientName) => <Text>{ ingredientName }</Text>) }
          <Text>營養成分種類: { recipe.nutrient_content.length }</Text>
          <TextInput style={styles.input} onChangeText={setRecipeName} value={recipeName}></TextInput>
          <Button title="命名食譜" onPress={ () => setRecipe({...recipe, name: recipeName}) }/>
          <Button title="加入食譜" onPress={ () => addRecipeToStorage() }/>
        </View>
      )}
      { 1 ? <Button title="烹煮" onPress={ IsCookAlert }></Button> : <Button title="煮完了" onPress={ IsCookAlert }></Button> }
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
  input: {
    borderColor: '#DDD',
    borderWidth: 2,
    width: 200,
    height: 40
  }
});
