export const LOADING           = 'LOADING'
export const CHARACTERS_LOADED = 'CHARACTERS_LOADED'
export const CHARACTER_LOADED  = 'CHARACTER_LOADED'

import fetch from 'isomorphic-fetch'
import MD5 from 'crypto-js/md5'

import { push, goBack } from 'react-router-redux'

////////////////////////////////////////////////////////////////////////////////
export function loading() {
  return {
    type: LOADING,
  }
}

export function loadedCharacters(characters) {
  return {
    type: CHARACTERS_LOADED,
    characters,
  }
}

export function loadedCharacter(character) {
  return {
    type: CHARACTER_LOADED,
    character,
  }
}
////////////////////////////////////////////////////////////////////////////////
function fetchCharacters(url) {
  return dispatch => {
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(loadedCharacters(json)))
  }
}

const charactersUrl = 'http://gateway.marvel.com:80/v1/public/characters'
export function fetchAllCharacters(init) {
  return (dispatch, getState) => {
    if (!init) dispatch(goBack())
    dispatch(loading())
    dispatch(fetchCharacters(getFetchUrl(charactersUrl)))
  }
}

function fetchOne(url) {
  return dispatch => {
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(loadedCharacter(json)))
  }
}

const characterUrl = 'http://gateway.marvel.com:80/v1/public/characters/'
export function fetchOneCharacter(id) {
  return (dispatch, getState) => {
    dispatch(push(`/hero/${id}`))
    dispatch(loading())
    dispatch(fetchOne(getFetchUrl(characterUrl + id)))
  }
}
////////////////////////////////////////////////////////////////////////////////
const ts = Math.floor(Date.now() / 1000)

const getFetchUrl = (queryUrl) => {

  const API_PUBL = '298bab46381a6daaaee19aa5c8cafea5'
  const API_PRIV = 'b0223681fced28de0fe97e6b9cd091dd36a5b71d'

  const hash = MD5(ts + API_PRIV + API_PUBL).toString()

  const full = queryUrl + '?' +
                 '&ts=' + ts +
                 '&apikey=' + API_PUBL +
                 '&hash=' + hash
  return full
}
////////////////////////////////////////////////////////////////////////////////
export const marvelActions = {
  fetchAll: fetchAllCharacters,
  fetchOne: fetchOneCharacter,
  getApiUrl: getFetchUrl,
}
