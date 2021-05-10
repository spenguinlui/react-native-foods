import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, FlatList } from 'react-native';
import jsonData from '../json/food_data.json'

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
  const [ingredientType, setIngredientType] = useState('seafoods')

  const getPageData = (num) => {
    const renderData = [];
    for (let i = 0; i < num * 10; i++) { renderData.push(jsonData[ingredientType][i]); }
    return renderData
  }

  const getNextDataPage = () => {
    let newPageNumber = pageNumber;
    setPageNumber(newPageNumber + 1);
  }

  const renderIngredient = (item) => {
    return (
      <TouchableOpacity>
        <View>
          <View style={styles.mainView}>
            <View style={{ flex: 1 }}>
              <Text ellipsizeMode='tail' numberOfLines={3} style={{ color: 'black', fontSize: 15, marginTop: 8 }}>
                { item.id + item.food_type }
              </Text>
              <Text ellipsizeMode='tail' numberOfLines={3} style={{ marginTop: 8, fontSize: 13, marginBottom: 8 }}>
                { item.name }
              </Text>
            </View>
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
    const renderData = getPageData(pageNumber);
    setDataSource(renderData);
    setIsLoading(false);
  }, [pageNumber, ingredientType])

  return (
    <View>
      <Text>我是食材清單</Text>
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
      <TouchableOpacity>
        <Button title='前往食材細節' onPress={() => props.navigation.push('IngredientDetail')} />
      </TouchableOpacity>
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