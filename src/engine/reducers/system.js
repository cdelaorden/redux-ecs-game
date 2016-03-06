import { Map, fromJS } from 'immutable'
import { SYSTEM_CREATE } from '../action_types'

const defaultState = Map()

export default function SystemReducer(state = defaultState, action){
  switch(action.type){
    case SYSTEM_CREATE:
      return createSystem(state, action)
    default:
      return state
  }
}

function createSystem(state, { name, data }){
  return state.set(name, fromJS(data))
}