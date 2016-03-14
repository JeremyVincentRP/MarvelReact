import React,{PropTypes} from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import charactersSelector from '../selectors/marvelSelector.js'
import {marvelActions} from '../actions/actions.js'

import './App.less'

import MarvelList from '../components/list.js'
import MarvelDetail from '../components/detail.js'

import { Router, Route, IndexRoute, browserHistory } from 'react-router'

////////////////////////////////////////////////////////////////////////////////
export default class App extends React.Component {
  render () {
    return (
      <Router history={browserHistory}>
        <Route path="/">
          <IndexRoute component={MarvelList} />
          <Route path="hero/:id" component={MarvelDetail} />
        </Route>
      </Router>
    )
  }
}
