import ReactDOM from 'react-dom'
import React from 'react'
import createGameStore from './create_store'

import App from './containers/app'
import { Provider } from 'react-redux'


const store = createGameStore()

window.debugGameState = function(){
  const state = store.getState()
  console.log('GAME STATE')
  Object.keys(state).forEach(k => {
    if(state.hasOwnProperty(k) && typeof state[k] === 'object' && typeof state[k].toJS === 'function')
      console.log(k, state[k].toJS())
    else
      console.log(k, state[k])
  })
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'))