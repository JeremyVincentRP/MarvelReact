import React from 'react'
import ReactDOM from 'react-dom'

import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import MarvelReducer from './reducers/MarvelReducer.js'
import {marvelActions} from './actions/actions.js'

import App from './containers/App.js'

import MarvelList from './components/list.js'
import MarvelDetail from './components/detail.js'

import { routerMiddleware, routerReducer } from 'react-router-redux'
import { browserHistory } from 'react-router'

////////////////////////////////////////////////////////////////////////////////

const history = routerMiddleware(browserHistory)

////////////////////////////////////////////////////////////////////////////////
// Store creation

const store = createStore(
  combineReducers({
    MarvelReducer,
    routing: routerReducer,
  }),
  applyMiddleware(
    thunk,
    history
  )
)

store.dispatch(marvelActions.fetchAll('init'))

////////////////////////////////////////////////////////////////////////////////
// Render App

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)

////////////////////////////////////////////////////////////////////////////////
