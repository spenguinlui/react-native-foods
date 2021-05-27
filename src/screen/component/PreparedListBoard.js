import React from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SECONDARY_COLOR, MAX_PREPARED_COUNT } from '../../setting'

import * as StorageHelper from '../../helper/StorageHelper';

const PreparedListBoard = ({list, setListCountIsChange}) => {
  const decreaseItemCount = async (index) => {
    let newList = list;
    if (!newList[index].count) newList[index].count = 1;
    if (newList[index].count <= 0) return;  // 不可以低於 0
    newList[index].count -= 1;
    await StorageHelper.patchJsonArraySetting('prepared', newList[index]);
    setListCountIsChange(true);
  }
  const increaseItemCount = async (index) => {
    let newList = list;
    if (!newList[index].count) newList[index].count = 1;
    if (newList[index].count >= MAX_PREPARED_COUNT) return;  // 標個最高使用量
    newList[index].count += 1;
    await StorageHelper.patchJsonArraySetting('prepared', newList[index])
    setListCountIsChange(true);
  }

  return (
    <View style={ styles.board }>
      <Text style={ styles.title }>現有食材</Text>
      { list.map((item, index) => {
        return (
          <View style={ styles.listBlock } key={ index }>
            <View style={ styles.listLeftBlock }>
              <View><Text style={ styles.listText }>{index + 1} </Text></View>
              <View><Text style={ styles.listText }>{item.name}</Text></View>
            </View>
            <View style={ styles.listRightBlock }>
              <TouchableOpacity onPress={ () => decreaseItemCount(index) }>
                <Text style={ styles.listText }> − </Text>
              </TouchableOpacity>
              <View><Text style={ [styles.listText, styles.listCount] }> { item.count || 1 } 份</Text></View>
              <TouchableOpacity onPress={ () => increaseItemCount(index) }>
                <Text style={ styles.listText }> ＋ </Text>
              </TouchableOpacity>
            </View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  board: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: SECONDARY_COLOR,
    textAlign: 'center'
  },
  listBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  listLeftBlock: {
    display: 'flex',
    flexDirection: 'row'
  },
  listRightBlock: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 30
  },
  listText: {
    lineHeight: 24,
    fontSize: 18,
    color: '#333333'
  },
  listCount: {
    width: 50
  }
})

export default PreparedListBoard;