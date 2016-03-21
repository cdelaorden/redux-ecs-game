import React, { Component } from 'react'
import Hero from '../sprites/hero'
import Floor from '../sprites/floor'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { createBall } from '../actions/game'
import { startGame, pauseGame } from '../engine/actions'
import { appState } from '../selectors'
import { Map } from 'immutable'

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
  renderPlatforms(platforms){
    return platforms.map(p => <Floor key={p.get('id')} position={p.get('position')} size={p.get('size')} />)

  }
  render(){
    const { hero, platforms } = this.props
    return (
      <svg style={ stageStyle } height="768" width="1024" onClick={ this.handlePauseGame } >
        { this.renderPlatforms(platforms) }
        <Hero position={hero.get('position')} heroState={hero.get('state')} />
      </svg>
    )
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    startGame,
    pauseGame
  }, dispatch)
}


export default connect(appState, mapDispatchToProps)(App)