import { GAME_UPDATE, GAME_START, GAME_PAUSE, GAME_END } from '../action_types'
import { Set, Map } from 'immutable'

const gameMiddleware = store => next => action => {
  if(action.type !== GAME_UPDATE){
    return next(action)
  }

  let state = store.getState()
  //iterate systems
  const systems = state.systems || []
  systems.forEach((s,k) => {
    console.log('System', k, s.toJS())
    let requiredComps = getMergedFamilyComps(state, s.get('families'))
    //now get the components themselves
    let systemComps = getSystemComponents(state, requiredComps)

  })

  //each system should


  next(action)
}


//O(n) (n = system.families.length) lookup for a set of components needed
function getMergedFamilyComps(state, familyNames){
  return familyNames.reduce((compSet, family) => {
    let fComps = getComponentsForFamily(state, family)
    console.log(fComps.toJS())
    return compSet.union(fComps)
  }, Set())
}

//O(1) lookup for component names for a given family
function getComponentsForFamily(state, familyName){
  return state.families.get(familyName).get('comps')
}

function getSystemComponents(state, requiredComps){
  return requiredComps.reduce((acc, compName) => {
    console.log('getSystemComps', compName)
  })
}


export default gameMiddleware