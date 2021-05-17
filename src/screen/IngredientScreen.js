import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as StorageHelper from '../helper/StorageHelper';
import jsonData from '../json/food_data.json';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { changeFavoritesCount } from '../redux/action';

const DEFAULT_FOOD_TYPE = 'seafoods'

// 食物圖片元件
const IconImage = (title, activeIcon) => {
  switch (title) {
    case 'fruit':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/fruit.png')}/>);
    case 'prepared_and_other':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/prepared_and_other.png')}/>);
    case 'meat':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/meat.png')}/>);
    case 'legume':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/legume.png')}/>);
    case 'milk':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/milk.png')}/>);
    case 'fat':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/fat.png')}/>);
    case 'nut':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/nut.png')}/>);
    case 'egg':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/egg.png')}/>);
    case 'seafoods':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/seafoods.png')}/>);
    case 'mushroom':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/mushroom.png')}/>);
    case 'drink':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/drink.png')}/>);
    case 'grains':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/grains.png')}/>);
    case 'vegetable':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/vegetable.png')}/>);
    case 'seasoning':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/seasoning.png')}/>);
    case 'starch':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/starch.png')}/>);
    case 'pastry':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/pastry.png')}/>);
    case 'sugar':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/sugar.png')}/>);
    case 'alga':
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/alga.png')}/>);
    default:
      return (<Image style={title === activeIcon ? styles.activeImage : styles.image} source={require('../images/undefined.png')}/>);
  }
}

// 食物中英文置換
const foodTypeToZhTw = (title) => {
  switch (title) {
    case 'fruit':
      return '水果類';
    case 'prepared_and_other':
      return '加工調理食品及其他類'
    case 'meat':
      return '肉類';
    case 'legume':
      return '豆類';
    case 'milk':
      return '乳品類';
    case 'fat':
      return '油脂類';
    case 'nut':
      return '堅果類';
    case 'egg':
      return '蛋類';
    case 'seafoods':
      return '魚貝類';
    case 'mushroom':
      return '菇類';
    case 'drink':
      return '飲料類';
    case 'grains':
      return '穀物類';
    case 'vegetable':
      return '蔬菜類';
    case 'seasoning':
      return '調味料及香辛料類';
    case 'starch':
      return '澱粉類';
    case 'pastry':
      return '糕餅點心類';
    case 'sugar':
      return '糖類';
    case 'alga':
      return '藻類';
    default:
      return '未定義類型';
  }
}

const HeaderList = (props) => {
  const headerArray = Object.keys(jsonData)
  const [activeIcon, setActiveIcon] = useState(DEFAULT_FOOD_TYPE);

  const changeIngredientType = (title) => {
    props.setIngredientType(title);
    props.setPageNumber(1);
    setActiveIcon(title);
  }

  return (
    <View>
      <ScrollView
        style={styles.header}
        horizontal={true}
      >
      { headerArray.map((title) => {
        if (title === 'undefined') return;  // 按下去會掛掉 todo: 待修正
        return (
          <TouchableOpacity key={title} onPress={ () => changeIngredientType(title) }>
            <View>
              { IconImage(title, activeIcon) }
            </View>
          </TouchableOpacity>
        )
      }) }
      </ScrollView>
      <View>
        <Text>現在食材類型是: { foodTypeToZhTw(activeIcon) }</Text>
      </View>
    </View>
  )
}

export default function IngredientScreen ({navigation}) {
  const [dataSource, setDataSource] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [disableArrived, setDisableArrived] = useState('');
  const [ingredientType, setIngredientType] = useState(DEFAULT_FOOD_TYPE);
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
    setDisableArrived(item.id)
    navigation.push('IngredientDetail', { passProps: item, key: item.id });
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
  }

  const refeshData = () => {
    setIsLoading(true);
    setPageNumber(1);
  }

  // 每次進來都要先重設
  useEffect(() => {
    const resetDisabledButton = navigation.addListener('focus', (e) => {
      setDisableArrived('');
    });
    return resetDisabledButton;
  }, [navigation]);

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