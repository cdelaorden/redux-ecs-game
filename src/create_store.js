import thunk from 'redux-thunk'
import { createEngine } from './engine/index'
import gameLoop from './engine/middleware/gameloop'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './reducers/index'

export default function createGameStore(){
  return createStore(
    rootReducer,
    compose(
      createEngine(),
      applyMiddleware(thunk, gameLoop)
    )
  )
}