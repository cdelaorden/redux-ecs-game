import React, { Component } from 'react'
import Ball from '../components/ball'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startGame, pauseGame, endGame } from '../actions/game'

class App extends Component {
  render(){
    return (
      <svg height="600" width="1200">
        <Ball cx={600} cy={300} r={20} />
      </svg>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    isPaused: state.game.get('isPaused'),
    isGameOver: state.game.get('isGameOver')
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    startGame,
    endGame,
    pauseGame
  }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(App)