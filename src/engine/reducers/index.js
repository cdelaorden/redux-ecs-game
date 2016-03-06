import { combineReducers } from 'redux'
import game from './game'
import components from './component'
import systems from './system'
import families from './family'

export default combineReducers({
  game,
  components,
  systems,
  families
})