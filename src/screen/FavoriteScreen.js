import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as StorageHelper from '../helper/StorageHelper';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { changeFavoritesCount, addToPrepareCookingList, removeFromPrepareCookingList } from '../redux/action';
import { useCallback } from 'react';

export default function FavoritesScreen ({navigation}) {
  const [dataSource, setDataSource] = useState([]);
  const [disableArrived, setDisableArrived] = useState('');
  const [preparedCount, setPreparedCount] = useState(0);  // 用來記錄現在已準備食材數量

  const favoritsCountFromStore = useMappedState(state => state.favoritsCount);
  const prepareIdList = useMappedState(state => state.prepareIdList);

  const disPatch = useDispatch();

  // 讀取儲存資料
  const loadStorageData = useCallback(async () => {
    const gotData = await StorageHelper.getJsonArraySetting('favorites');
    if (!gotData) return;
    // const dataLength = gotData.length;
    // console.log(`取得的資料量: ${dataLength}`)
    // console.log(`實際的資料量: ${favoritsCountFromStore}`)
    // 這邊取得的 redux 跟 render 的資料不一樣 todo: 研究 redux map 資料觸發時機
    const gotPreparedCount = gotData.map((item) => item.prepared === true).length;
    setPreparedCount(gotPreparedCount);
    setDataSource(gotData);
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
      await disPatch(changeFavoritesCount(favoritsCountFromStore - 1));
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
        setPreparedCount(preparedCount - 1);
        const newItem = item;
        newItem.prepared = false;
        await StorageHelper.patchJsonArraySetting('favorites', item);
        console.log('移除待煮成功');
      } catch(error) {
        console.log('移除待煮清單失敗', error);
      }
    } else {
      try {
        await StorageHelper.setJsonArraySetting('prepared', item);
        await disPatch(addToPrepareCookingList(item.id));
        setPreparedCount(preparedCount + 1);
        const newItem = item;
        newItem.prepared = true;
        await StorageHelper.patchJsonArraySetting('favorites', item);
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
      <View>
        <View style={styles.mainView}>
          <TouchableOpacity onPress={() => preparedCookingListHandler(item)}>
            <Ionicons name={ item.prepared === true ? 'ios-checkbox-outline' : 'ios-stop-outline' } size={25} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text ellipsizeMode='tail' numberOfLines={3} style={{ color: 'black', fontSize: 15, marginTop: 8 }}>
              { item.id + item.food_type }
            </Text>
            <Text ellipsizeMode='tail' numberOfLines={3} style={{ marginTop: 8, fontSize: 13, marginBottom: 8 }}>
              { item.name }{ item.en_name && ` (${item.en_name})` }
            </Text>
          </View>
          <TouchableOpacity onPress={() => removeFromFavorites(item)}>
            <Ionicons name={'ios-trash-outline'} size={25} />
          </TouchableOpacity>
        </View>
        <View style={styles.seperator}/>
      </View>
    </TouchableOpacity>
  )

  // 每次進來都要先重設收藏數量
  useEffect(() => {
    const refreshFavorites = navigation.addListener('focus', () => {
      setDisableArrived('');
      loadStorageData();
    });
    return refreshFavorites;
  }, [loadStorageData]);

  // 當數量有變更的時候渲染資料
  useEffect(() => {
    loadStorageData();
    console.log('執行了 favoritsCount effect');
  }, [favoritsCountFromStore, preparedCount])

  // 首次近來讀取資料
  useEffect(() => {
    loadStorageData();
  }, []);

  return (
    <View>
      <Text>preparedCount: {preparedCount}</Text>
      <TouchableOpacity>
        <Button title='點我更新' onPress={ () => loadStorageData() }></Button>
      </TouchableOpacity>
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