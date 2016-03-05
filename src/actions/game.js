//Game loop actions
import { GAME_UPDATE, GAME_START, GAME_PAUSE, GAME_END } from './types'

//Ugly state
let requestId = null

export function startGame(){
  return (dispatch, getState) => {
    requestId = loop(dispatch)
    dispatch({
      type: GAME_START,
      dt: Date.now(),
      reqId: requestId
    })
  }
}

export function updateGame(dispatch, dt) {
  dispatch({
    type: GAME_UPDATE,
    dt
  })
  requestId = loop(dispatch)
}

export function pauseGame (isPaused) {
  return (dispatch, getState) => {
    if(isPaused){
      window.cancelAnimationFrame(requestId)
    }
    console.log('pausing game', isPaused)
    dispatch({
      type: GAME_PAUSE,
      isPaused
    })
    if(!isPaused){
      dispatch(startGame())
    }
  }
}

export function endGame () {
  return {
    type: GAME_END
  }
}

function loop(dispatch){
  return window.requestAnimationFrame(updateGame.bind(null, dispatch))
}