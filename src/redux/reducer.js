import { 
  ADD_TO_PREPARECOOKING_LIST,
  REMOVE_FROM_PREPARECOOKING_LIST,
  REMOVE_ALL_PREPARECOOKING_LIST,
  CHANGE_INSTRUCTION_PAGE
} from './action'

// 初始化 redux state
const initialState = {
  prepareIdList: [],   // 存放準備中食材 ID  -- 食材、收藏、料理頁面都會用到
  instructionPage: 0   // 說明頁面的輪播頁次  -- 首頁說明頁會用到
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_PREPARECOOKING_LIST:
      let addedList = state.prepareIdList;
      addedList.push(action.payload.prepareItem);
      return {
        ...state,
        prepareIdList: addedList
      }
    case REMOVE_FROM_PREPARECOOKING_LIST:
      let removedList = state.prepareIdList;
      removedList = removedList.filter((item) => item !== action.payload.prepareItem);
      return {
        ...state,
        prepareIdList: removedList
      }
    case REMOVE_ALL_PREPARECOOKING_LIST:
      return {
        ...state,
        prepareIdList: []
      }
    case CHANGE_INSTRUCTION_PAGE:
      return {
        ...state,
        instructionPage: action.payload.page
      }
    default:
      return state
  }
}