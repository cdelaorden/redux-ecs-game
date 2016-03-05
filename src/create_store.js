import thunk from 'redux-thunk'
import gameLoop from './middleware/gameloop'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/index'

export default function createGameStore(){
  return createStore(
    rootReducer,
    applyMiddleware(thunk, gameLoop)
  )
}