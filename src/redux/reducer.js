import { CHANGE_FAVORITES_COUNT } from './action'

const initialState = {
  favoritsCount: 0
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_FAVORITES_COUNT:
      return {
        ...state,
        favoritsCount: action.payload.favoritsCount
      }
    default:
      return state
  }
}