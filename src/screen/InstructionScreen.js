import React from 'react';
import { useEffect } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import { useMappedState, useDispatch } from 'redux-react-hook';
import { changeInstructionPage } from '../redux/action';

import { BACKGROUND_COLOR } from '../setting';
import Swiper from 'react-native-swiper'

const msgArray = [
  'Step 1: 在食材清單挑選喜歡的食材，加入「 收藏 」或是列入「 準備 」食材。',
  'Step 2: 將食材列入「 準備 」食材中。',
  'Step 3: 選擇要加入食材的數量，便可開始合成料理。',
  'Step 4: 完成後為自己的料理取名就可以保留了！',
  'Step 5: 完成後便可以在食譜中找到之前的料理。'
]

const MsgText = () => {
  const instructionPage = useMappedState(state => state.instructionPage);

  // todo: Cannot update a component from inside the function body of a different component
  return (
    <View style={ swiper.msgBlock }>
      <Text style={ swiper.msgText }>{ msgArray[instructionPage] }</Text>
    </View>
  )
}

export default function InstructionScreen ({navigation}) {
  const disPatch = useDispatch();

  useEffect(() => {
    const resetPage = navigation.addListener('focus', () => disPatch(changeInstructionPage(0)));
    return resetPage;
  }, [navigation]);
  
  return (
    <View style={ swiper.container }>
      <View style={ swiper.wrpaperContainer }>
        <Swiper
          style={ swiper.wrapper }
          removeClippedSubviews={ true }
          bounces={true}
          onIndexChanged={ index => disPatch(changeInstructionPage(index)) }
          paginationStyle={ { position: 'absolute', top: 420 } }
        >
          <Image resizeMode="stretch" source={require('../images/step01.png')} style={ swiper.bannerImg } />
          <Image resizeMode="stretch" source={require('../images/step03.png')} style={ swiper.bannerImg } />
          <Image resizeMode="stretch" source={require('../images/step04.png')} style={ swiper.bannerImg } />
          <Image resizeMode="stretch" source={require('../images/step05.png')} style={ swiper.bannerImg } />
          <Image resizeMode="stretch" source={require('../images/step06.png')} style={ swiper.bannerImg } />
        </Swiper>
      </View>
      <MsgText/>
    </View>
  )
}

const swiper = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrpaperContainer: {
    width: 200 + 4,
    height: 400 + 4,
    borderWidth: 2,
    borderColor: '#aaaaaa',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrpaper: {
    width: '100%',
    height: '100%',
  },
  bannerImg: {
    width: '100%',
    height: '100%',
  },
  msgBlock: {
    marginTop: 40,
    marginHorizontal: 80
  },
  msgText: {
    lineHeight: 16,
    color: '#333333'
  }
});