import { ADD_TO_PREPARECOOKING_LIST, REMOVE_FROM_PREPARECOOKING_LIST, REMOVE_ALL_PREPARECOOKING_LIST } from './action'

const initialState = {
  prepareIdList: []
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
    default:
      return state
  }
}