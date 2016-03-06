//Game loop actions
import { GAME_UPDATE, GAME_START, GAME_PAUSE, GAME_END } from './action_types'
import { COMPONENT_CREATE, COMPONENT_ADD, COMPONENT_REMOVE } from './action_types'
import { FAMILY_CREATE, SYSTEM_CREATE, ENTITY_CREATE } from './action_types'
/** GAME STATE ACTIONS **/
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
  console.log('updateGame', dt)
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

/** COMPONENT API ACTIONS **/
export function createComponent(name){
  //TODO - the same as engine/components/create. should be here or there??
  //Probably here if its side effect is for the component type to be stored
  return {
    type: COMPONENT_CREATE,
    name
  }
}

export function createEntity(tag, comps){
  return (dispatch, getState) => {
    const id = getState().game.get('nextId')
    const action = {
      type: ENTITY_CREATE,
      id,
      tag,
      comps
    }
    dispatch(action)
  }
}

export function createFamily(name, data){
  return {
    type: FAMILY_CREATE,
    name,
    data
  }
}

export function createSystem(name, data){
  return {
    type: SYSTEM_CREATE,
    name,
    data
  }
}


