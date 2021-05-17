import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as StorageHelper from '../helper/StorageHelper';
import jsonData from '../json/food_data.json';
import { DEFAULT_FOOD_TYPE, DATA_COUNT_PER_PAGE } from '../setting';

import { useMappedState, useDispatch } from 'redux-react-hook';
import { changeFavoritesCount } from '../redux/action';

import HeaderList from './component/HeaderList'

export default function IngredientScreen ({navigation}) {
  const [dataSource, setDataSource] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [disableArrived, setDisableArrived] = useState('');
  const [ingredientType, setIngredientType] = useState(DEFAULT_FOOD_TYPE);

  const favoritsCountFromStore = useMappedState(state => state.favoritsCount)
  const disPatch = useDispatch()

  // 讀取 JSON/API 資料
  const getPageData = (num) => {
    const renderData = [];
    for (let i = 0; i < num * DATA_COUNT_PER_PAGE; i++) { renderData.push(jsonData[ingredientType][i]); }
    return renderData;
  }

  // 更新資料
  const refeshData = () => {
    setIsLoading(true);
    setPageNumber(1);
  }

  // 往下拉更新更多資料
  const getNextDataPage = () => setPageNumber(pageNumber + 1);

  // 前往至食材細節
  const goIngredientDetail = (item) => {
    setDisableArrived(item.id);
    navigation.push('IngredientDetail', { passProps: item, key: item.id });
  };

  // 新增至我的最愛
  const addToFavorites = async (item) => {
    try {
      const origin_favorites = await StorageHelper.getJsonArraySetting('favorites');
      const find_data = origin_favorites.find((data) => {
        return data.id == item.id
      })
      if (find_data) {
        console.log('已經加入過了');
        return;
      }
      await StorageHelper.setJsonArraySetting('favorites', item);
      console.log(`更新數量為${favoritsCountFromStore}`);
      await disPatch(changeFavoritesCount(favoritsCountFromStore + 1));
      console.log(`更新數量為${favoritsCountFromStore}`);
    } catch(error) {
      console.log('寫入失敗', error);
    }
  };

  // FlatList 的內容清單's
  const renderIngredient = (item) => (
    <TouchableOpacity
      onPress={ () => goIngredientDetail(item) }
      key={item.id}
      disabled={ disableArrived == item.id ? true : false }
    >
      <View>
        <View style={styles.mainView}>
          <View style={{ flex: 1 }}>
            <Text ellipsizeMode='tail' numberOfLines={3} style={{ color: 'black', fontSize: 15, marginTop: 8 }}>
              { item.id + item.food_type }
            </Text>
            <Text ellipsizeMode='tail' numberOfLines={3} style={{ marginTop: 8, fontSize: 13, marginBottom: 8 }}>
              { item.name }{ item.en_name && ` (${item.en_name})` }
            </Text>
          </View>
          <TouchableOpacity onPress={() => addToFavorites(item)}>
            <Ionicons name={'ios-add-circle-outline'} size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.seperator}/>
      </View>
    </TouchableOpacity>
  )

  // 每次進來都要先重設
  useEffect(() => {
    const resetDisabledButton = navigation.addListener('focus', () => {
      setDisableArrived('');
    });
    return resetDisabledButton;
  }, [navigation]);

  // 當頁籤 or 食材類型改變時觸發
  useEffect(() => {
    console.log(`現在筆數${pageNumber * 10}`)
    console.log(`現在 store 為${favoritsCountFromStore}`);
    const renderData = getPageData(pageNumber);
    setDataSource(renderData);
    setIsLoading(false);
  }, [pageNumber, ingredientType])

  return (
    <View>
      <Text>我是食材清單, 現在珍藏清單有{favoritsCountFromStore}</Text>
      <FlatList
        data={dataSource}
        ListHeaderComponent={ <HeaderList setIngredientType={setIngredientType} setPageNumber={setPageNumber}></HeaderList> }
        renderItem={({item}) => renderIngredient(item)}
        keyExtractor={(item) => item.id}
        getItemLayout={(data, index) => (
          {length: 80, offset: 80 + (80 * index), index}
        )}
        onEndReached={ getNextDataPage }
        onRefresh={ refeshData }
        onEndReachedThreshold= { 0.01 }
        refreshing={isLoading}
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