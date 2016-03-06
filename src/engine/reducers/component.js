import { Map, fromJS } from 'immutable'
import { COMPONENT_CREATE, ENTITY_CREATE } from '../action_types'

const defaultState = Map()
export default function ComponentReducer(state = defaultState, action){
  switch(action.type){
    case COMPONENT_CREATE:
      return createComponent(state, action)
    case ENTITY_CREATE:
      return saveEntityComponents(state, action)
    default:
      return state
  }
}

//creates an empty dictionary for a specific component name
function createComponent(state, { name }){
  return state.set(name, Map())
}

function saveEntityComponents(state, action){
  console.log('Component reducer save entity comps', action)
  return state.withMutations(s => {
    Object.keys(action.comps).forEach(compName => {
      if(!s.has(compName)){
        throw new Error('Component ' + compName + ' has not been defined in the engine')
      }
      let compData = action.comps[compName]
      s.setIn([compName, action.id], compData)
    })

    return s
  })
}