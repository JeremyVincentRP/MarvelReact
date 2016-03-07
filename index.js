import React from 'react'
import ReactDOM from 'react-dom'

import thunkMiddleware from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducers/MarvelReducer.js'
import {marvelActions} from './actions/actions.js'

import App from './containers/App.js'

////////////////////////////////////////////////////////////////////////////////
// Store creation

const store = createStore(
  reducer,
  applyMiddleware(
    thunkMiddleware
  )
)

store.dispatch(marvelActions.fetchAll('http://gateway.marvel.com:80/v1/public/characters'))

////////////////////////////////////////////////////////////////////////////////
// Render App

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)

////////////////////////////////////////////////////////////////////////////////
