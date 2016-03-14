import React,{PropTypes} from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {detailCharacterSelector} from '../selectors/marvelSelector.js'
import {marvelActions} from '../actions/actions.js'

////////////////////////////////////////////////////////////////////////////////
export const MarvelDetail = ({loading, character, dispatch, ...props}) => {

  if (loading) return <div>... Loading Character</div>

  const char = character.results[0]

  const handleReturn = () => {
    dispatch(marvelActions.fetchAll())
  }

  const createItem = (obj, i) =>
    <li key={i}>{obj.name}</li>

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
      <a href="#" onClick={handleReturn}>retour</a>
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

export default connect(detailCharacterSelector)(MarvelDetail)
