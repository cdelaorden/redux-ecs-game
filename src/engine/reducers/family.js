import { Map, fromJS } from 'immutable'
import { FAMILY_CREATE } from '../action_types'

const defaultState = Map()
export default function FamilyReducer(state = defaultState, action){
  switch(action.type){
    case FAMILY_CREATE:
      return createFamily(state, action)
    default:
      return state
  }
}

function createFamily(state, { name, data }){
  return state.set(name, fromJS(data))
}