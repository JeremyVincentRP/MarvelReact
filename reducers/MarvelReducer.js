import {
  LOADING,
  CHARACTERS_LOADED,
  CHARACTER_LOADED,
} from '../actions/actions'

// Initial state
const initialState = {
  characters: [],
  loading: false,
}
//////////////////////

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
      }
    case CHARACTERS_LOADED:
      return {
        ...state,
        characters: action.characters,
        loading: false,
      }
    case CHARACTER_LOADED:
      return {
        ...state,
        character: action.character,
        loading: false,
      }
    default:
      return state
  }
}
