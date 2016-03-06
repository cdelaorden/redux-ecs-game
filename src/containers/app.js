import React, { Component } from 'react'
import Ball from '../components/ball'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createBall } from '../actions/game'
import { startGame, pauseGame } from '../engine/actions'
import { appState } from '../selectors'

const stageStyle = {
  backgroundColor: '#fff',
  border: '1px solid #333',
  // borderRadius: '15px'
}

class App extends Component {
  constructor(props){
    super(props)
    this.handlePauseGame = this.handlePauseGame.bind(this)
  }
  componentDidMount(){
    //this.props.startGame()
  }
  handlePauseGame(e){
    const { isPaused } = this.props
    this.props.pauseGame(!isPaused)
  }
  render(){
    const { balls } = this.props
    return (
      <svg style={ stageStyle } height="600" width="1200" onClick={ this.handlePauseGame } >
        { this._renderBalls(balls) }
      </svg>
    )
  }

  _renderBalls(balls){
    return balls.map((b, i) => {
      return (<Ball key={i} cx={ b.position.x} cy={ b.position.y } r={b.body.radius} color={ b.body.color} />)
    })
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    startGame,
    pauseGame
  }, dispatch)
}


export default connect(appState, mapDispatchToProps)(App)