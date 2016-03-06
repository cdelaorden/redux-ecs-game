import { bindActionCreators, applyMiddleware } from 'redux'
import * as actionCreators from './actions'

/**
 * This a Redux store enhancer
 * It receives the previous createStore func and injects some game engine stuff the store returned
 */
export function createEngine(...middlewares){
  /**

  ** Engine state **
  lastId = 0

  ** System **
  interface System
  {
    name: String            Ex: 'Kinetics',
    process: Function       Ex: function(entities, dt){ entitites.map(x => moveEntity(x, dt)) }
    selector: Function      Ex: function(gameState) { gameState.components.Position (:List) }
    priority: Number        Ex: 1,2 or constant: INPUT, PRE_UPDATE, UPDATE, PRE_RENDER
    families: Array<String> Ex: ['Movable']
  }

  state.engine.systems = Immutable.List<System>()

  ** Components **
  state.engine.components = Immutable.Map<int,Map>()

  components[K] = {
    entityId: { Kdata1: value, Kdata2: value, ... },
    entityId: { ... },
    ...
  }

  - Which entities has component X?
  components[X].keys()

   - What has entity K for component X?
  components[X][K]

  - Give me all Position components - don't care about the entity Id
  components.get('Position').values()

  - Updating every Position -> just map over the Map keys
  components.get('Position').map((entityId, data) => { ... })

  - A need different components in a single service
  components.get('Enemy'), components.get('Hero')

  ** Families **
  Families define a concrete set of components and the intersection between Systems and Components
  In DB analogy, they are the relation tables between System <- N:M -> Components like

  System <--- 1:N ----> Family <---- 1:N ----> Component

  This way the system can require 10 components by specifying only 2 families

  interface Family
  {
    name: String              Ex: 'Movable', 'Renderable'
    components: Array<String> Ex: ['Position', 'Velocity'], ['Position', 'Sprite']
  }


  //add custom reducers from config

  //create store with our middleware, the app reducer

  //attach store.getState and store.dispatch here in case it's needed

  */

  return (createStore) => (reducer, initialState, enhancer) => {
    let store = createStore(reducer, initialState, applyMiddleware(...middlewares))
    let engineActions = bindActionCreators(actionCreators, store.dispatch)

    return Object.assign(store, { engine: engineActions })
  }
}

