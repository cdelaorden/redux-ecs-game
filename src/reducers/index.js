import { combineReducers } from 'redux'
import game from './game'
import ball from './ball1'

const appReducer = combineReducers({
  game,
  ball
})

export default appReducer