import { createSelector } from 'reselect'

const characters = state => state.characters.data
const state = state => state

const allCharacters = createSelector(
  characters,
  state,
  (characters, state) => ({
    ...state,
    characters,
  })
)

export default allCharacters
