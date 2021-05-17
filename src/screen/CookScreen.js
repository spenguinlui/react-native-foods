import React from 'react';
import { StyleSheet, Text, View, Alert, TouchableOpacity, Button } from 'react-native';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { addToPrepareCookingList, removeFromPrepareCookingList } from '../redux/action';

// 確定是否烹煮 Alert
const IsCookAlert = () =>
  Alert.alert(
    "將會清空目前已選定食材...",
    "",
    [
      {text: "確定", onPress: () => console.log('進入烹煮'), style: "cancel"},
      {text: "再想想", onPress: () => console.log("先不煮")}
    ]
  )

export default function CookScreen ({navigation}) {
  const prepareCookingList = useMappedState(state => state.prepareCookingList);
  const disPatch = useDispatch();

  return (
    <View style={styles.container}>
      <Text>目前食材列表:</Text>
      { prepareCookingList.map((item) => (
        <Text>{item.name}</Text>
      ))}
      <Button title="烹煮" onPress={IsCookAlert}></Button>
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
});
