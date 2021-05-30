import React from 'react';

// 導覽套件
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { MAIN_COLOR, BACKGROUND_COLOR } from './setting';

// 元件
import HomeScreen from './screen/HomeScreen';
import InstructionScreen from './screen/InstructionScreen';

import IngredientScreen from './screen/IngredientScreen';
import IngredientDetail from './screen/IngredientDetail';

import FavoriteScreen from './screen/FavoriteScreen';
import CookScreen from './screen/CookScreen';

import RecipeScreen from './screen/RecipeScreen';
import RecipeDetail from './screen/RecipeDetail';

// 建構導覽物件
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// 首頁 / icon -> 已收藏食材數量、以打造食譜數量 screen: 操作說明
function HomeStack () {
  return (
    <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerStyle: { backgroundColor: BACKGROUND_COLOR, shadowOpacity: 0 },
          headerTitle: '',
          headerBackTitle: '上一頁',
          headerTintColor: MAIN_COLOR,
          headerTransparent: true
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
        screenOptions={({route}) => (
          {
            headerStyle: { backgroundColor: BACKGROUND_COLOR, shadowOpacity: 0 },
            headerTitle: route.name === 'IngredientDetail' ? '' : '食材清單',
            headerBackTitle: '上一頁',
            headerTintColor: MAIN_COLOR,
            headerTransparent: route.name === 'IngredientDetail'
          }
        )}
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
        screenOptions={({route}) => (
          {
            headerStyle: { backgroundColor: BACKGROUND_COLOR, shadowOpacity: 0 },
            headerTitle: route.name === 'IngredientDetail' ? '' : '食材收藏櫃',
            headerBackTitle: '上一頁',
            headerTintColor: MAIN_COLOR,
            headerTransparent: route.name === 'IngredientDetail'
          }
        )}
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
        screenOptions={({route}) => (
          {
            headerStyle: { backgroundColor: BACKGROUND_COLOR, shadowOpacity: 0 },
            headerTitle: route.name === 'RecipeDetail' ? '' : '我的食譜',
            headerBackTitle: '上一頁',
            headerTintColor: MAIN_COLOR,
            headerTransparent: route.name === 'RecipeDetail'
          }
        )}
      >
      <Stack.Screen name="Recipe" component={ RecipeScreen } />
      <Stack.Screen name="RecipeDetail" component={ RecipeDetail } />
    </Stack.Navigator>
  )
}

const Router = () => (
  <NavigationContainer>
    <Tab.Navigator
      initialRouteName='首頁'
      screenOptions={ ({route}) => ({
        tabBarIcon: ({color, focused}) => {
          let iconName = '';
          switch (route.name) {
            case '首頁':
              iconName = focused ? 'ios-home' : 'ios-home-outline';
              break;
            case '食材':
              iconName = focused ? 'ios-fast-food' : 'ios-fast-food-outline';
              break;
            case '食材收藏':
              iconName = focused ? 'ios-heart' : 'ios-heart-outline';
              break;
            case '料理':
              iconName = focused ? 'ios-restaurant' : 'ios-restaurant-outline';
              break;
            case '食譜':
              iconName = focused ? 'ios-book' : 'ios-book-outline';
              break;
            default:
              iconName = focused ? 'ios-list' : 'ios-list-outline'
          }
          return (
            <Ionicons name={ iconName } size={ 25 } color={ focused ? MAIN_COLOR : 'gray' } />
          )
        }
      }) }
      tabBarOptions={ {
        activeTintColor: MAIN_COLOR,
        inactiveTintColor: 'gray'
      } }
    >
      <Tab.Screen name="首頁" component={ HomeStack } />
      <Tab.Screen name="食材" component={ IngredientStack } />
      <Tab.Screen name="料理" component={ CookScreen } />
      <Tab.Screen name="食材收藏" component={ FavoriteStack } />
      <Tab.Screen name="食譜" component={ RecipeStack } />
    </Tab.Navigator>
  </NavigationContainer>
)

export default Router;