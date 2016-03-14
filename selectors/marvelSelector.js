import { createSelector } from 'reselect'

const characters = state => state.MarvelReducer.characters.data
const character = state => state.MarvelReducer.character && state.MarvelReducer.character.data
const loading = state => state.MarvelReducer.loading

const state = state => state

export const allCharactersSelector = createSelector(
  characters,
  loading,
  (characters, loading) => ({
    characters,
    loading,
  })
)

export const detailCharacterSelector = createSelector(
  character,
  loading,
  (character, loading) => ({
    character,
    loading
  })
)

export default allCharactersSelector
