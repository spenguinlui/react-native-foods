export const ADD_TO_PREPARECOOKING_LIST = 'ADD_TO_PREPARECOOKING_LIST';
export const REMOVE_FROM_PREPARECOOKING_LIST = 'REMOVE_FROM_PREPARECOOKING_LIST';
export const REMOVE_ALL_PREPARECOOKING_LIST = 'REMOVE_ALL_PREPARECOOKING_LIST';
export const CHANGE_INSTRUCTION_PAGE = 'CHANGE_INSTRUCTION_PAGE';

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

export function removeAllPrepareCookingList() {
  return {
    type: REMOVE_ALL_PREPARECOOKING_LIST,
    payload: { prepareItem: '' }
  }
}

export function changeInstructionPage(index) {
  return {
    type: CHANGE_INSTRUCTION_PAGE,
    payload: { page: index }
  }
}