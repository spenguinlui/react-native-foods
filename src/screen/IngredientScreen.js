import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../style/main';

import * as StorageHelper from '../helper/StorageHelper';
import jsonData from '../json/food_data.json';
import { DEFAULT_FOOD_TYPE, DATA_COUNT_PER_PAGE, IconImage, FoodConvertList } from '../setting';

import { useMappedState, useDispatch } from 'redux-react-hook';
import { addToPrepareCookingList, removeFromPrepareCookingList } from '../redux/action';

import HeaderList from './component/HeaderList'

// 讀取 JSON/API 資料
const getPageData = (num, ingredientType) => {
  const renderData = [];
  // for (let i = 0; i < DATA_COUNT_PER_PAGE; i++) { renderData.push(jsonData[ingredientType][i + ((num - 1 ) * 10) ]); }
  for (let i = 0; i < num * DATA_COUNT_PER_PAGE; i++) { jsonData[ingredientType][i] && renderData.push(jsonData[ingredientType][i]); }
  return renderData;
}

export default function IngredientScreen ({navigation}) {
  const [dataSource, setDataSource] = useState([]);      // 主要資料存放
  const [pageNumber, setPageNumber] = useState(1);       // 往下拉會增加資料
  const [isLoading, setIsLoading] = useState(false);     // 是否重新讀取中(往上拉的時候)
  const [disableArrived, setDisableArrived] = useState('');    // 避免重複點擊 push 至 detail
  const [ingredientType, setIngredientType] = useState(DEFAULT_FOOD_TYPE);   // 紀錄現在是哪個食材類型(選單用)
  const [preparedCount, setPreparedCount] = useState(0);  // 用來記錄現在已準備食材數量

  const prepareIdList = useMappedState(state => state.prepareIdList);  // 已準備食材列表(只放ID)
  const disPatch = useDispatch();

  // 更新資料
  const refeshData = () => {
    setIsLoading(true);
    setPageNumber(1);
  }

  // 往下拉更新更多資料
  const getNextDataPage = () => setPageNumber(pageNumber + 1);

  // 讀取資料
  const loadData = () => {
    const renderData = getPageData(pageNumber, ingredientType);
    setDataSource(renderData);
    setIsLoading(false);
  }

  // 前往至食材細節
  const goIngredientDetail = (item) => {
    setDisableArrived(item.id);
    navigation.push('IngredientDetail', { passProps: item, key: item.id });
  };

  // 新增至我的最愛
  const addToFavorites = async (item) => {
    try {
      const origin_favorites = await StorageHelper.getJsonArraySetting('favorites');

      // 已存在清單不動作
      if (origin_favorites && origin_favorites.find((data) => data.id === item.id)) {
        alert('已經加入過了');
        return;
      }
      await StorageHelper.setJsonArraySetting('favorites', item);
      alert('食材收藏！');
    } catch(error) {
      // console.log('寫入失敗', error);
    }
  };

  // 增加/移除 準備料理 store
  const preparedCookingListHandler = async (item) => {
    if (prepareIdList.find((itemId) => itemId === item.id)) {
      try {
        await StorageHelper.removeJsonArraySetting('prepared', item);
        await disPatch(removeFromPrepareCookingList(item.id));
        setPreparedCount(preparedCount - 1);
        // console.log('移除待煮成功', prepareIdList.length);
      } catch(error) {
        // console.log('移除待煮清單失敗', error);
      }
    } else {
      try {
        await StorageHelper.setJsonArraySetting('prepared', item);
        await disPatch(addToPrepareCookingList(item.id));
        setPreparedCount(preparedCount + 1);
        // console.log('加入待煮成功', prepareIdList.length);
      } catch(error) {
        // console.log('加入待煮清單失敗', error);
      }
    }
  }

  // FlatList 的內容清單's
  const renderIngredient = (item) => (
    <TouchableOpacity
      onPress={ () => goIngredientDetail(item) }
      key={ item.id }
      disabled={ disableArrived === item.id }
    >
      <View style={ styles.mainList }>
        <View style={ styles.listView }>
          <TouchableOpacity style={ styles.listTypeIcon }>
            { IconImage(FoodConvertList[item.food_type]() || FoodConvertList['未定義類型']()) }
          </TouchableOpacity>
          <View style={ styles.listTextBlock }>
            <Text ellipsizeMode='tail' numberOfLines={ 1 } style={ styles.listTitle }>
              { item.name }
            </Text>
            <Text ellipsizeMode='tail' numberOfLines={ 1 } style={ styles.listDescription }>
              { item.en_name ? item.en_name : '(no english)' }
            </Text>
          </View>
          <TouchableOpacity style={ styles.listIcon } onPress={ () => preparedCookingListHandler(item) }>
            <Ionicons name={ prepareIdList.find((itemId) => itemId === item.id) ? 'ios-bookmark' : 'ios-bookmark-outline'} size={ 25 } />
          </TouchableOpacity>
          <TouchableOpacity style={ styles.listIcon } onPress={ () => addToFavorites(item) }>
            <Ionicons name={'ios-add-circle-outline'} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )

  // 每次進來都要復原 關閉細節的按鈕
  useEffect(() => {
    const resetDisabledButton = navigation.addListener('focus', () => setDisableArrived(''));
    return resetDisabledButton;
  }, [navigation]);

  // 當頁籤 or 食材類型改變時觸發
  useEffect(() => {
    // console.log(`現在筆數${pageNumber * 10}`);
    loadData();
  }, [pageNumber, ingredientType]);

  return (
    <View style={ styles.listContainer }>
      <HeaderList setIngredientType={ setIngredientType } setPageNumber={ setPageNumber }></HeaderList>
      <FlatList
        data={ dataSource }
        renderItem={ ({item}) => renderIngredient(item) }
        keyExtractor={ (item) => item.id }
        getItemLayout={ (data, index) => (
          { length: 80, offset: 80 + (80 * index), index }
        ) }
        onEndReached={ getNextDataPage }
        onRefresh={ refeshData }
        onEndReachedThreshold= { 0.0001 }
        refreshing={ isLoading }
      />
    </View>
  )
}