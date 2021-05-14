import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStringSetting = key => AsyncStorage.getItem(key)
export const setStringSetting = (key, value) => AsyncStorage.setItem(key, value)

export const getJsonArraySetting = key => AsyncStorage.getItem(key).then(JSON.parse)
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
}
export const removeJsonArraySetting = (key, value) => {
  AsyncStorage.getItem(key)
    .then(JSON.parse)
    .then(data => data.filter(current => current.id !== value.id))
    .then(filteredData => AsyncStorage.setItem(key, JSON.stringify(filteredData)))
    .then(console.log('step1 改好了'))
}