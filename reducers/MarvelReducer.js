import {
  LOAD_CHARACTERS,
  CHARACTERS_LOADED,
  CHARACTER_LOADED,
} from '../actions/actions'

// Initial state
const initialState = {
  characters: [],
  loading: false,
  view: 'list'
}
//////////////////////

export default function reducer (state = initialState, action) {
  switch(action.type) {
    case LOAD_CHARACTERS:
      return {
        ...state,
        loading: true,
      }
    case CHARACTERS_LOADED:
      return {
        ...state,
        characters: action.characters,
        loading: false,
        view: action.view,
      }
    case CHARACTER_LOADED:
      return {
        ...state,
        character: action.character,
        view: action.view,
      }
    default:
      return state
  }
}
