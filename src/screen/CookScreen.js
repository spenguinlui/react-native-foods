import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Button, ScrollView, TextInput } from 'react-native';
import { useState } from 'react/cjs/react.development';

import * as StorageHelper from '../helper/StorageHelper';

import { useMappedState, useDispatch } from 'redux-react-hook';
import { removeAllPrepareCookingList } from '../redux/action';
import { useCallback } from 'react';

// 食材合成
const ingredientMixing = (inputList, outputObj) => {
  inputList.forEach((item) => {
    outputObj.ingredient.push(item.name);
    if (!item.nutrient_content) return;  // 如果沒有營養成分便跳過

    // 計算所有營養成分 todo: 目前是單份含量而已，還需要增加數目
    item.nutrient_content.forEach((nutrient_item) => {
      if (nutrient_item.unit_content <= 0 || nutrient_item.per_content <= 0) return; // 如果營養成分低於 0 不納入計算
      let exisit_nutrient = outputObj.nutrient_content.find(exisit_item => exisit_item.name === nutrient_item.name);
      if (exisit_nutrient) {
        exisit_nutrient.unit_content += parseFloat(nutrient_item.unit_content);
      } else {
        outputObj.nutrient_content.push({name: nutrient_item.name, unit_content: parseFloat(nutrient_item.unit_content)});
      }
    })
  });
  return outputObj;
}

export default function CookScreen ({navigation}) {
  const [recipe, setRecipe] = useState({name: '', ingredient: [], nutrient_content: []});
  const [recipeName, setRecipeName] = useState('');

  const [preparedList, setPreparedList] = useState([]);  // 用來存放得到的已準備食材

  const prepareIdList = useMappedState(state => state.prepareIdList);
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

  // 烹煮
  const cookFunc = async () => {
    const newRecipe = ingredientMixing(preparedList, { name: '', ingredient: [], nutrient_content: [] });

    // 加入 state
    setRecipe(newRecipe);   // 加入內部 state 食譜
    disPatch(removeAllPrepareCookingList());  // 清空 redux 內的準備食材 id列表
    await StorageHelper.resetJsonArraySetting('prepared'); // 清空 storage 食材清單
    setPreparedList([]);   // 清空內部 state 準備食材清單
  }

  // 增加食譜
  const addRecipeToStorage = async () => {
    try {
      const oringinRecipe = await StorageHelper.getJsonArraySetting('recipe');
      if (oringinRecipe.find((item) => item.name === recipe.name)) {
        console.log("食譜撞名囉！");
        return;
      }
      StorageHelper.setJsonArraySetting('recipe', recipe);
      setRecipe({name: '', ingredient: [], nutrient_content: []})
      console.log("加入食譜成功");
    } catch(error) {
      console.log("加入食譜失敗", error);
    }
  }
  // 比對兩組陣列的 id 是否都相同，不計較順序
  const isSameIdForAll = (reduxList, stateList) => {
    // reduxList 是 id 陣列, stateList 是 物件陣列
    const resultA = reduxList.every(id => stateList.includes(id));
    const resultB = stateList.every(item => reduxList.includes(item.id));
    return resultA && resultB;
  }

  // 同步元件內 state 與 storage 資料
  const storagePreparedList = useCallback(async () => {
    console.log(`準備清單長度:${prepareIdList.length},  準備數量: ${preparedList.length}`)

    // 目前 render 的資料與 redux id 陣列不合才繼續
    if (isSameIdForAll(prepareIdList, preparedList)) return;
    console.log("食譜更新", prepareIdList.length)

    // 從 Storage 取得資料，並放入要 render 資料
    const getPrepareListData = await StorageHelper.getJsonArraySetting('prepared');
    setPreparedList(getPrepareListData);
  })

  // 每次切換頁面 render 準備食材清單
  useEffect(() => {
    const refreshList = navigation.addListener('focus', () => storagePreparedList());
    return refreshList;
  }, [storagePreparedList])

  return (
    <View style={styles.container}>
      { preparedList.length ? <Text>目前食材列表:</Text> : <View></View> }
      { preparedList.length ? preparedList.map((item, index) => <Text>{`${index}: ${item.name}`}</Text>) : <View></View>}
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
      { preparedList.length > 0 ? <Button title="烹煮" onPress={ IsCookAlert }></Button> : <Text>目前沒有預備食材</Text> }
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
