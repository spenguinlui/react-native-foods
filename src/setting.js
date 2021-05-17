// 預設食材類型
export const DEFAULT_FOOD_TYPE = 'seafoods';

// 預設每頁資料量
export const DATA_COUNT_PER_PAGE = 10;

// 食材類型中英文置換列表
// use: () => FoodConvertList[title]() || FoodConvertList['default']()
export const FoodConvertList = {
  'fruit': () => '水果類',
  'prepared_and_other': () => '加工調理食品及其他類',
  'meat': () => '肉類',
  'legume': () => '豆類',
  'milk': () => '乳品類',
  'fat': () => '油脂類',
  'nut': () => '堅果類',
  'egg': () => '蛋類',
  'seafoods': () => '魚貝類',
  'mushroom': () => '菇類',
  'drink': () => '飲料類',
  'grains': () => '穀物類',
  'vegetable': () => '蔬菜類',
  'seasoning': () => '調味料及香辛料類',
  'starch': () => '澱粉類',
  'pastry': () => '糕餅點心類',
  'sugar': () => '糖類',
  'alga': () => '藻類',
  'default': () => '未定義類型'
}