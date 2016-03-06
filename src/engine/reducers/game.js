//Game state reducer
import { fromJS } from 'immutable'
import { GAME_START, GAME_PAUSE, GAME_END, ENTITY_CREATE } from '../action_types'

const defaultState = fromJS({
  isPaused: true,
  isGameOver: false,
  t0: 0,
  loopRequest: -1,
  nextId: 1
})

export default function gameState(state = defaultState, action){
  switch(action.type){
    case GAME_PAUSE:
      return state.set('isPaused', action.isPaused)

    case GAME_START:
      console.log('Game reducer, game start!')
      const { startTime, reqId } = action
      return state.withMutations(s => {
        return s
          .set('isPaused', false)
          .set('t0', startTime)
          .set('loopRequest', reqId)
      })

    case GAME_END:
      return state.set('isGameOver', true)

    case ENTITY_CREATE:
      return state.update('nextId', x => x+1)

    default:
      return state

  }
}