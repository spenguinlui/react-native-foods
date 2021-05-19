import { CHANGE_FAVORITES_COUNT, ADD_TO_PREPARECOOKING_LIST, REMOVE_FROM_PREPARECOOKING_LIST, REMOVE_ALL_PREPARECOOKING_LIST } from './action'

const initialState = {
  favoritsCount: 0,
  prepareIdList: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FAVORITES_COUNT:
      return {
        ...state,
        favoritsCount: action.payload.favoritsCount
      }
    case ADD_TO_PREPARECOOKING_LIST:
      let addedList = state.prepareIdList;
      addedList.push(action.payload.prepareItem);
      return {
        ...state,
        prepareIdList: addedList
      }
    case REMOVE_FROM_PREPARECOOKING_LIST:
      let removedList = state.prepareIdList;
      removedList = removedList.filter((item) => item.id !== action.payload.prepareItem.id);
      return {
        ...state,
        prepareIdList: removedList
      }
    case REMOVE_ALL_PREPARECOOKING_LIST:
      return {
        ...state,
        prepareIdList: []
      }
    default:
      return state
  }
}