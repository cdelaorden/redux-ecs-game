import React, { Component } from 'react'
import Ball from '../components/ball'
import Plotter from './plotter'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startGame, pauseGame, endGame } from '../actions/game'


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
    const { x, y, radius, color } = this.props.ball
    return (
      <svg style={ stageStyle } height="600" width="1200" onClick={ this.handlePauseGame } >
        <Plotter x={0} y={0} height={600} width={1200} />
      </svg>
    )
  }
}

function mapStateToProps(state, ownProps){
  return {
    isPaused: state.game.get('isPaused'),
    isGameOver: state.game.get('isGameOver'),
    ball: state.ball.toJS()
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