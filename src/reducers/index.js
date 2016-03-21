import { combineReducers } from 'redux'
import game from '../engine/reducers/game'
import hero from './hero'
import solidBodies from './solid_bodies'

const appReducer = combineReducers({
  game,
  hero,
  solidBodies
})

export default appReducer