import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as StorageHelper from '../helper/StorageHelper';
import jsonData from '../json/food_data.json';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { changeFavoritesCount } from '../redux/action';

const HeaderList = (props) => {
  const headerArray = Object.keys(jsonData)

  const changeIngredientType = (title) => {
    props.setIngredientType(title);
    props.setPageNumber(1);
  }

  return (
    <View style={styles.mainView}>
      { headerArray.map((title) => {
        return (
          <TouchableOpacity key={title} onPress={ () => changeIngredientType(title) }>
            <View>
              <Text>{title}</Text>
            </View>
          </TouchableOpacity>
        )
      }) }
    </View>
  )
}

export default function IngredientScreen (props) {
  const [dataSource, setDataSource] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ingredientType, setIngredientType] = useState('seafoods');
  const favoritsCountFromStore = useMappedState(state => state.favoritsCount)
  const disPatch = useDispatch()

  const getPageData = (num) => {
    const renderData = [];
    for (let i = 0; i < num * 10; i++) { renderData.push(jsonData[ingredientType][i]); }
    return renderData
  }

  const getNextDataPage = () => {
    let newPageNumber = pageNumber;
    setPageNumber(newPageNumber + 1);
  }

  const goIngredientDetail = (item) => {
    props.navigation.push('IngredientDetail', { passProps: item });
  }

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
  }

  const renderIngredient = (item) => {
    return (
      <TouchableOpacity onPress={ () => goIngredientDetail(item) }>
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
  }

  const refeshData = () => {
    setIsLoading(true);
    setPageNumber(1);
  }

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
        keyExtractor={item => item.id}
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