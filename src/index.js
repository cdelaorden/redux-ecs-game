import babelPolyfill from 'babel-polyfill'
import ReactDOM from 'react-dom'
import React from 'react'
import gameStore from './create_store'

import App from './containers/app'
import { Provider } from 'react-redux'
import { createSphereBody } from './engine/components/sphere_body'

console.log(gameStore)

//Create the ball
gameStore.engine.createEntity('ball', {
  'position': { x: 600, y: 20 },
  'velocity2D': { vx: 3, vy: 0 },
  'sphereBody': createSphereBody(20),
  'tag': { tag: 'ball' }
})

if(__DEV__){
  window.debugGameState = function(){
    const state = gameStore.getState()
    console.log('GAME STATE')
    Object.keys(state).forEach(k => {
      if(state.hasOwnProperty(k) && typeof state[k] === 'object' && typeof state[k].toJS === 'function')
        console.log(k, state[k].toJS())
      else
        console.log(k, state[k])
    })
  }
}


window.debugGameState()


ReactDOM.render(<Provider store={gameStore}><App /></Provider>, document.getElementById('app'))