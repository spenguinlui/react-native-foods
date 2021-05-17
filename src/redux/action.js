export const CHANGE_FAVORITES_COUNT = 'CHANGE_FAVORITES_COUNT';
export const ADD_TO_PREPARECOOKING_LIST = 'ADD_TO_PREPARECOOKING_LIST';
export const REMOVE_FROM_PREPARECOOKING_LIST = 'REMOVE_FROM_PREPARECOOKING_LIST';

export function changeFavoritesCount(num) {
  return {
    // 類型
    type: CHANGE_FAVORITES_COUNT,
    // 動作
    // 將接收到的 參數 num 值 傳入 store 中的 favoritsCount
    payload: { favoritsCount: num }
  }
}
export function addToPrepareCookingList(item) {
  return {
    type: ADD_TO_PREPARECOOKING_LIST,
    payload: { prepareItem: item }
  }
}
export function removeFromPrepareCookingList(item) {
  return {
    type: REMOVE_FROM_PREPARECOOKING_LIST,
    payload: { prepareItem: item }
  }
}