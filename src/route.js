import React from 'react';

// 導覽套件
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// 元件
import HomeScreen from './screen/HomeScreen'
import InstructionScreen from './screen/InstructionScreen'

import IngredientScreen from './screen/IngredientScreen'
import IngredientDetail from './screen/IngredientDetail'

import FavoriteScreen from './screen/FavoriteScreen'
import CookScreen from './screen/CookScreen'

import RecipeScreen from './screen/RecipeScreen'
import RecipeDetail from './screen/RecipeDetail'

// 建構導覽物件
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 首頁 / icon -> 已收藏食材數量、以打造食譜數量 screen: 操作說明
function HomeStack () {
  return (
    <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerStyle: { backgroundColor: 'tomato' },
          headerBackTitle: '上一頁',
          headerTintColor: 'white'
        }}
      >
      <Stack.Screen name="Home" component={ HomeScreen } />
      <Stack.Screen name="Instruction" component={ InstructionScreen } />
    </Stack.Navigator>
  )
}

// 食材全部清單 screen: 食材細節
function IngredientStack () {
  return (
    <Stack.Navigator
        initialRouteName='Ingredient'
        screenOptions={{
          headerStyle: { backgroundColor: 'tomato' },
          headerBackTitle: '上一頁',
          headerTintColor: 'white'
        }}
      >
      <Stack.Screen name="Ingredient" component={ IngredientScreen } />
      <Stack.Screen name="IngredientDetail" component={ IngredientDetail } />
    </Stack.Navigator>
  )
}

// 珍藏配方 screen: 食材細節
function FavoriteStack () {
  return (
    <Stack.Navigator
        initialRouteName='Favorite'
        screenOptions={{
          headerStyle: { backgroundColor: 'tomato' },
          headerBackTitle: '上一頁',
          headerTintColor: 'white'
        }}
      >
      <Stack.Screen name="Favorite" component={ FavoriteScreen } />
      <Stack.Screen name="IngredientDetail" component={ IngredientDetail } />
    </Stack.Navigator>
  )
}

// 從珍藏選定食材，開始合成(烹煮) -> action完成料理 -> btn加入食譜
// CookScreen

// 已建立食譜清單 screen: 食譜細節
function RecipeStack () {
  return (
    <Stack.Navigator
        initialRouteName='Recipe'
        screenOptions={ {
          headerStyle: { backgroundColor: 'tomato' },
          headerBackTitle: '上一頁',
          headerTintColor: 'white'
        } }
      >
      <Stack.Screen name="Recipe" component={ RecipeScreen } />
      <Stack.Screen name="RecipeDetail" component={ RecipeDetail } />
    </Stack.Navigator>
  )
}

const Router = () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={ () => ({
        tabBarIcon: () => ( <Ionicons name={'ios-list'} size={25} /> )
      }) }
      tabBarOptions={ {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray'
      } }
    >
      <Tab.Screen name="Home" component={ HomeStack } />
      <Tab.Screen name="Ingredient" component={ IngredientStack } />
      <Tab.Screen name="Favorite" component={ FavoriteStack } />
      <Tab.Screen name="Cook" component={ CookScreen } />
      <Tab.Screen name="Recipe" component={ RecipeStack } />
    </Tab.Navigator>
  </NavigationContainer>
)

export default Router;