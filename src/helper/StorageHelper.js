import AsyncStorage from '@react-native-async-storage/async-storage';

//-- 取得/變更 一般純文字
export const getStringSetting = key => AsyncStorage.getItem(key);
export const setStringSetting = (key, value) => AsyncStorage.setItem(key, value);

//-- 當要存入資料為 陣列 塞 JSON 時
// 取得
export const getJsonArraySetting = key => AsyncStorage.getItem(key).then(JSON.parse);

// 加入
export const setJsonArraySetting = (key, value) => {
  AsyncStorage.getItem(key)
    .then((result) => {
      if (result !== null) {
        const push_array = JSON.parse(result).concat([value]);
        AsyncStorage.setItem(key, JSON.stringify(push_array));
      } else {
        AsyncStorage.setItem(key, JSON.stringify([value]));
      }
    })
};

// 移除
export const removeJsonArraySetting = (key, value) => {
  AsyncStorage.getItem(key)
    .then(JSON.parse)
    .then(data => data.filter((current) => {
      if(current.id) return current.id !== value.id;
      if(current.name) return current.name !== value.name;
    } ))
    .then(filteredData => AsyncStorage.setItem(key, JSON.stringify(filteredData)))
};

// 更改特定筆
export const patchJsonArraySetting = (key, value) => {
  AsyncStorage.getItem(key)
    .then(JSON.parse)
    .then((data) => data.map((current) => (current.id === value.id ? value : current)))
    .then(patchedData => AsyncStorage.setItem(key, JSON.stringify(patchedData)))
};

// 清空
export const resetJsonArraySetting = key => AsyncStorage.setItem(key, JSON.stringify([]));