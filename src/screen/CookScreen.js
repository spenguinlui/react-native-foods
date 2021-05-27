import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Alert, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import common from '../style/main';
import { MAIN_COLOR, MAIN_COLOR_2, SECONDARY_COLOR, BACKGROUND_COLOR } from '../setting'

import * as StorageHelper from '../helper/StorageHelper';

import { useMappedState, useDispatch } from 'redux-react-hook';
import { removeAllPrepareCookingList } from '../redux/action';

import PreparedListBoard from './component/PreparedListBoard'

// 食材合成
const ingredientMixing = (inputList, outputObj) => {
  inputList.forEach((item) => {
    outputObj.ingredient.push({ name: item.name, count: item.count});
    if (!item.nutrient_content) return;  // 如果沒有營養成分便跳過

    // 計算所有營養成分 todo: 目前是單份含量而已，還需要增加數目
    item.nutrient_content.forEach((nutrient_item) => {
      if (nutrient_item.unit_content <= 0 || nutrient_item.per_content <= 0) return; // 如果營養成分低於 0 不納入計算
      let exisit_nutrient = outputObj.nutrient_content.find(exisit_item => exisit_item.name === nutrient_item.name);
      if (exisit_nutrient) {
        exisit_nutrient.unit_content += (parseFloat(nutrient_item.unit_content) * (item.count || 1));
      } else {
        outputObj.nutrient_content.push(
          { name: nutrient_item.name,
            unit_content: (parseFloat(nutrient_item.unit_content) * (item.count || 1)),
            ...nutrient_item
          }
        );
      }
    })
  });
  return outputObj;
}

export default function CookScreen ({navigation}) {
  const [recipe, setRecipe] = useState({name: '', ingredient: [], nutrient_content: []});
  const [recipeName, setRecipeName] = useState('');

  const [preparedList, setPreparedList] = useState([]);  // 用來存放得到的已準備食材
  const [listCountIsChange, setListCountIsChange] = useState(false)

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

  // 食譜命名同步
  const syncrecipeName = (name) => {
    setRecipeName(name);
    setRecipe({...recipe, name: recipeName});
  }

  // 增加食譜
  const addRecipeToStorage = async () => {
    try {
      const oringinRecipe = await StorageHelper.getJsonArraySetting('recipe');
      if (!recipe.name) return;
      if (oringinRecipe && oringinRecipe.find((item) => item.name === recipe.name)) {
        alert("食譜撞名囉！");
        return;
      }
      StorageHelper.setJsonArraySetting('recipe', recipe);
      setRecipe({name: '', ingredient: [], nutrient_content: []});
      alert("成功儲存！");
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

  // 監聽某項目內的數量被改變就重新 render
  useEffect(() => {
    setListCountIsChange(false);
  }, [listCountIsChange])

  return (
    <View style={common.container}>
      { recipe.ingredient.length > 0 && (
        <View style={ styles.board }>
          <View><Text style={ styles.title }>料理完成</Text></View>
          <TextInput style={styles.input} onChangeText={ (name) => syncrecipeName(name)} value={recipeName}></TextInput>
          <View style={ styles.buttonBlock}>
            { recipeName.length <= 0 ? 
            <Text style={styles.text}>取個名字吧！</Text>
            : <TouchableOpacity style={common.mainButton} onPress={ () => addRecipeToStorage() }>
              <Text style={common.text}>保留食譜</Text>
            </TouchableOpacity> 
            }
          </View>
        </View>
      )}
      { preparedList.length ? <PreparedListBoard list={preparedList} setListCountIsChange={setListCountIsChange}/> : <View/> }
      <View style={{ marginTop: 40 }}>
        { preparedList.length ?
          <TouchableOpacity style={common.mainButton} onPress={ IsCookAlert }>
            <Text style={common.text}>開始料理</Text>
          </TouchableOpacity>
          : <View/>
        }
      </View>
      <Text style={ styles.onlyText }>{ preparedList.length === 0 && recipe.ingredient.length === 0 ? '請先挑選食材' : '' }</Text>
    </View>
  )
}

const styles =  StyleSheet.create({
  board: {
    padding: 20,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  title: {
    color: SECONDARY_COLOR,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    marginTop: 10,
    borderBottomWidth: 2,
    borderColor: '#DDD',
    width: 200,
    height: 40,
    textAlign: 'center',
    color: '#333333',
    fontSize: 20,
  },
  text: {
    fontSize: 18,
    color: '#555555',
    textAlign: 'center',
    paddingTop: 15
  },
  buttonBlock: {
    marginTop: 20
  },
  onlyText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555555',
  }
})