import { CHANGE_FAVORITES_COUNT, ADD_TO_PREPARECOOKING_LIST, REMOVE_FROM_PREPARECOOKING_LIST, REMOVE_ALL_PREPARECOOKING_LIST } from './action'

const initialState = {
  favoritsCount: 0,
  prepareCookingList: []
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FAVORITES_COUNT:
      return {
        ...state,
        favoritsCount: action.payload.favoritsCount
      }
    case ADD_TO_PREPARECOOKING_LIST:
      let addedList = state.prepareCookingList;
      addedList.push(action.payload.prepareItem);
      return {
        ...state,
        prepareCookingList: addedList
      }
    case REMOVE_FROM_PREPARECOOKING_LIST:
      let removedList = state.prepareCookingList;
      removedList = removedList.filter((item) => item.id !== action.payload.prepareItem.id);
      return {
        ...state,
        prepareCookingList: removedList
      }
    case REMOVE_ALL_PREPARECOOKING_LIST:
      return {
        ...state,
        prepareCookingList: []
      }
    default:
      return state
  }
}