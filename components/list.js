import React,{PropTypes} from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {allCharactersSelector} from '../selectors/marvelSelector.js'
import {marvelActions} from '../actions/actions.js'

////////////////////////////////////////////////////////////////////////////////
export const MarvelList = ({loading, characters, dispatch, ...props}) => {

  if (loading) return <div>... Loading Characters</div>

  const charactersTab = characters.results

  const handleDetail = (id, e) => {
    e.preventDefault()
    dispatch(marvelActions.fetchOne(id))
  }

  const createCard = (char) => {
    const createLink = (elem, i) =>
      <a className="link" key={i} href={elem.url}>{elem.type}</a>
    return (
      <div className="item" key={char.id}>
        <a href="#"
          onClick={handleDetail.bind(null, char.id)}>
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
      {charactersTab.map(createCard)}
    </div>
  )
}

export default connect(allCharactersSelector)(MarvelList)
