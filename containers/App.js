import React,{PropTypes} from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import charactersSelector from '../selectors/marvelSelector.js'
import {marvelActions} from '../actions/actions.js'

import './App.less'

////////////////////////////////////////////////////////////////////////////////
const MarvelList = ({data, onDetail, ...props}) => {
  const createLink = (elem, i) => {
    return (
      <a className="link" key={i} href={elem.url}>{elem.type}</a>
    )
  }

  const createCard = (char) => {
    return (
      <div className="item" key={char.id}>
        <a href="#" onClick={onDetail.bind(null, char.id)}>
          <img src={marvelActions.getApiUrl(char.thumbnail.path + '.' + char.thumbnail.extension)} />
        </a>
        <div>
          {char.id}
          <div>{char.name}</div>
          {char.urls.map(createLink)}
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      {data.map(createCard)}
    </div>
  )
}
////////////////////////////////////////////////////////////////////////////////
const MarvelDetail = ({char, onReturn, ...props}) => {
  const createItem = (obj, i) => {
    return (
      <li key={i}>{obj.name}</li>
    )
  }

  const generateList = (label, obj) => {
    return (
      <div>
        <h4>{label}</h4>
        <ul>
          {obj.items.map(createItem)}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <a href="#" onClick={onReturn}>retour</a>
      <div className="detail">
        <img src={marvelActions.getApiUrl(char.thumbnail.path + '.' + char.thumbnail.extension)} />
        <div>{char.name}</div>
        <div>{char.description}</div>
        {generateList('comics', char.comics)}
        {generateList('series', char.series)}
        {generateList('stories', char.stories)}
        {generateList('events', char.events)}
      </div>
    </div>
  )
}
////////////////////////////////////////////////////////////////////////////////
class App extends React.Component {

  handleDetail = (id) => {
    this.props.actions.fetchOne('http://gateway.marvel.com:80/v1/public/characters/' + id)
  }
  handleReturn = () => {
    this.props.actions.fetchAll('http://gateway.marvel.com:80/v1/public/characters')
  }

  render () {
    if (!this.props.characters) return <div>Loading Characters</div>

    return (
      <div>
        {this.props.view === 'list'
          ? <MarvelList data={this.props.characters.results} onDetail={this.handleDetail} />
          : <MarvelDetail char={this.props.character.data.results[0]} onReturn={this.handleReturn} />
        }
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(marvelActions, dispatch)
  }
}

export default connect(charactersSelector, mapDispatchToProps)(App)
