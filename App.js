import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// 導覽套件
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// 建構導覽物件
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStack} /> {/* 首頁 / icon -> 已收藏食材數量、以打造食譜數量 */}
        <Tab.Screen name="Ingredient" component={IngredientStack} /> {/* 食材全部清單 screen: 食材細節 */}
        <Tab.Screen name="Profile" component={ProfileStack} /> {/* 珍藏配方 */}
        <Tab.Screen name="Cook" component={RecipeStack} /> {/* 選定食材，開始合成(烹煮) screen: 完成料理 -> 加入食譜 */}
        <Tab.Screen name="Recipe" component={RecipeStack} /> {/* 已建立食譜清單   */}
      </Tab.Navigator>
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
