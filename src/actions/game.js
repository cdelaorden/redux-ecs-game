//Game loop actions
import { GAME_UPDATE, GAME_START, GAME_PAUSE, GAME_END } from './types'

export function startGame(){
  return {
    type: GAME_START,
    dt: Date.getTime()
  }
}

export function updateGame(dt) {
  return {
    type: GAME_UPDATE,
    dt
  }
}

export function pauseGame (isPaused) {
  return {
    type: GAME_PAUSE,
    isPaused
  }
}

export function endGame () {
  return {
    type: GAME_END
  }
}