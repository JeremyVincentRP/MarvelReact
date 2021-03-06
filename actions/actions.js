export const LOAD_CHARACTERS   = 'LOAD_CHARACTERS'
export const CHARACTERS_LOADED = 'CHARACTERS_LOADED'
export const CHARACTER_LOADED  = 'CHARACTER_LOADED'

import fetch from 'isomorphic-fetch'
import MD5 from 'crypto-js/md5'

export function loadingCharacters() {
  return {
    type: LOAD_CHARACTERS,
  }
}

export function loadedCharacters(list) {
  return {
    type: CHARACTERS_LOADED,
    characters: list,
    view: 'list',
  }
}

export function loadedCharacter(character) {
  return {
    type: CHARACTER_LOADED,
    character,
    view: 'detail',
  }
}

function fetchCharacters(url) {
  return dispatch => {
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(loadedCharacters(json)))
  }
}

function fetchOne(url) {
  return dispatch => {
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(loadedCharacter(json)))
  }
}

export function fetchAllCharacters(url) {
  return (dispatch, getState) => {
    dispatch(loadingCharacters())
    dispatch(fetchCharacters(getFetchUrl(url)))
  }
}

export function fetchOneCharacter(url) {
  return (dispatch, getState) => {
    dispatch(loadingCharacters())
    dispatch(fetchOne(getFetchUrl(url)))
  }
}

const getFetchUrl = (queryUrl) => {
  const getTimestamp = () => { return Math.floor(Date.now() / 1000) }

  const API_PUBL = '298bab46381a6daaaee19aa5c8cafea5'
  const API_PRIV = 'b0223681fced28de0fe97e6b9cd091dd36a5b71d'

  const ts = getTimestamp()
  const hash = MD5(ts + API_PRIV + API_PUBL).toString()

  const full = queryUrl + '?' +
                 '&ts=' + ts +
                 '&apikey=' + API_PUBL +
                 '&hash=' + hash
  return full
}

export const marvelActions = {
  fetchAll: fetchAllCharacters,
  fetchOne: fetchOneCharacter,
  getApiUrl: getFetchUrl,
}
