//Game state reducer
import { fromJS } from 'immutable'
const defaultState = fromJS({
  isPaused: false,
  isGameOver: false
})
export default function gameState(state = defaultState, action){
  return state
}