import thunk from 'redux-thunk'
import { createEngine } from './engine/index'
import systems from './engine/systems/index'
import families from './engine/families/index'
import components from './engine/components/index'
import gameLoop from './engine/middleware/gameloop'
import gameReducer from './engine/reducers/index'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/index'

function createGameStore(){
  return createStore(
    gameReducer,
    createEngine(thunk, gameLoop)
  )
}

const gameStore = createGameStore()

gameStore.createComponents(components)
gameStore.createFamilies(families)
gameStore.createSystems(systems)

export default gameStore