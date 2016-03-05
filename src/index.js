import ReactDOM from 'react-dom'
import React from 'react'
import App from './containers/app'
import appReducer from './reducers'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(appReducer)

console.log(store.getState())

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'))