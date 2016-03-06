import babelPolyfill from 'babel-polyfill'
import ReactDOM from 'react-dom'
import React from 'react'
import createGameStore from './create_store'

import App from './containers/app'
import { Provider } from 'react-redux'

const store = createGameStore()

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'))

if(__DEV__){
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
}


console.log(store)
