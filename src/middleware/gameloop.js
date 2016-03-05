import { GAME_UPDATE, GAME_START, GAME_PAUSE, GAME_END } from '../actions/types'

const gameMiddleware = store => next => action => {
  // if(action.type !== GAME_UPDATE){
  //   return next(action)
  // }

  // console.log('Game update')
  next(action)
}

export default gameMiddleware