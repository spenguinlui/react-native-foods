export const CHANGE_FAVORITES_COUNT = 'CHANGE_FAVORITES_COUNT'

export function changeFavoritesCount(num) {
  return {
    // 類型
    type: CHANGE_FAVORITES_COUNT,
    // 動作
    // 將接收到的 參數 num 值 傳入 store 中的 favoritsCount
    payload: { favoritsCount: num }
  }
}