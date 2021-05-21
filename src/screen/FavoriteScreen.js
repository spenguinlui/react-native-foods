import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from '../style/main';

import * as StorageHelper from '../helper/StorageHelper';
import { FoodConvertList, IconImage } from '../setting';

import { useMappedState, useDispatch } from 'redux-react-hook';
import { addToPrepareCookingList, removeFromPrepareCookingList } from '../redux/action';

export default function FavoritesScreen ({navigation}) {
  const [dataSource, setDataSource] = useState([]);
  const [disableArrived, setDisableArrived] = useState('');
  const [preparedCount, setPreparedCount] = useState(0);    // 用來記錄現在已準備食材數量
  const [favoritesCount, setFavoritesCount] = useState(0);  // 用來記錄現在我的最愛數量

  const prepareIdList = useMappedState(state => state.prepareIdList);

  const disPatch = useDispatch();

  // 讀取儲存資料
  const loadStorageData = useCallback(async () => {
    console.log('發動一次讀取');
    let gotData = await StorageHelper.getJsonArraySetting('favorites');
    if (!gotData) return;

    // 加工得到資料   -  Ingredient、Cook 會更改到準備食材
    gotData = gotData.map((item) => {
      prepareIdList.includes(item.id) ? (item.prepared = true) : (item.prepared = false);
      return item;
    });

    // 取得資料後要做三件事
    const gotPreparedCount = gotData.map((item) => item.prepared === true).length;
    if (gotPreparedCount !== preparedCount) setPreparedCount(gotPreparedCount);  // 內部 state 寫入 準備食材數量
    if (gotData.length !== favoritesCount) setFavoritesCount(gotData.length);   // 內部 state 寫入 我的最愛數量
    setDataSource(gotData);              // 內部 state 寫入 我的最愛資料
    console.log('發動一次讀取結束')
  })

  // 前往食材細節
  const goIngredientDetail = (item) => {
    setDisableArrived(item.id);
    navigation.push('IngredientDetail', { passProps: item, key: item.id });
  }

  // 移除我的最愛，要同步 redux 數量
  const removeFromFavorites = async (item) => {
    try {
      await StorageHelper.removeJsonArraySetting('favorites', item);
      setFavoritesCount(favoritesCount - 1);
    } catch(error) {
      console.log('移除失敗', error);
    }
  }

  // 增加/移除 準備料理 store
  const preparedCookingListHandler = async (item) => {
    if (prepareIdList.find((itemId) => itemId === item.id)) {
      try {
        await StorageHelper.removeJsonArraySetting('prepared', item);
        await disPatch(removeFromPrepareCookingList(item.id));
        await StorageHelper.patchJsonArraySetting('favorites', item);
        setPreparedCount(preparedCount - 1);
        console.log('移除待煮成功');
      } catch(error) {
        console.log('移除待煮清單失敗', error);
      }
    } else {
      try {
        await StorageHelper.setJsonArraySetting('prepared', item);
        await disPatch(addToPrepareCookingList(item.id));
        await StorageHelper.patchJsonArraySetting('favorites', item);
        setPreparedCount(preparedCount + 1);
        console.log('加入待煮成功');
      } catch(error) {
        console.log('加入待煮清單失敗', error);
      }
    }
  }

  const renderIngredient = (item) => (
    <TouchableOpacity
      onPress={ () => goIngredientDetail(item) }
      key={item.id}
      disabled={ disableArrived == item.id ? true : false }
    >
      <View style={styles.mainList}>
        <View style={styles.listView}>
          <TouchableOpacity style={styles.listTypeIcon}>
            { IconImage(FoodConvertList[item.food_type]() || FoodConvertList['未定義類型']()) }
          </TouchableOpacity>
          <View style={styles.listTextBlock}>
            <Text ellipsizeMode='tail' numberOfLines={3} style={styles.listTitle}>
              { item.name }
            </Text>
            <Text ellipsizeMode='tail' numberOfLines={3} style={styles.listDescription}>
              { item.en_name ? item.en_name : '(no english)' }
            </Text>
          </View>
          <TouchableOpacity style={styles.listIcon} onPress={() => preparedCookingListHandler(item)}>
            <Ionicons name={ item.prepared === true ? 'ios-bookmark' : 'ios-bookmark-outline' } size={25} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listIcon} onPress={() => removeFromFavorites(item)}>
            <Ionicons name={'ios-trash-outline'} size={25} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )

  // 每次切換進來讀取資料 & 讓曾點過細節按鈕可以再點
  useEffect(() => {
    const refreshFavorites = navigation.addListener('focus', () => {
      setDisableArrived('');  // 清空已點擊按鈕
      console.log("切換進來的讀取")
      loadStorageData();
    });
    return refreshFavorites;
  }, [loadStorageData]);

  // 當我的最愛移除、勾選準備食材時重新讀取資料渲染
  useEffect(() => {
    console.log("數量變化的讀取")
    loadStorageData();
  }, [favoritesCount, preparedCount])

  return (
    <View style={styles.listContainer}>
      <FlatList
        data={dataSource}
        renderItem={({item}) => renderIngredient(item)}
        keyExtractor={(item) => item.id}
        getItemLayout={(data, index) => (
          {length: 80, offset: 80 * index, index}
        )}
      />
    </View>
  )
}