import { fromJS } from 'immutable'
import { combineReducers } from 'redux'

const initialState = fromJS({
  grid: {
    color: '#ccc',
    vlines: 10,
    xlines: 10
  },
  axis: {
    xorigin: 600,
    yorigin: 1200
  }
})

function grid(state)


export default combineReducers({
  grid,
  axis,
  graph
}, initialState)