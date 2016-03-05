import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'



class Plotter extends Component {
  render(){
    const { x, y, width, height } = this.props
    return (
      <g id="plotter">
        { this._renderGrid(width, height) }
        { this._renderAxis(width, height) }
      </g>
    )
  }

  _renderGrid(width, height){
    const gridSize = 10
    const lineStyle = {
      stroke: '#ccc',
      strokeWidth: '1px'
    }
    let lines = []
    //vertical lines
    for(let i=0; i < width/gridSize; i++){
      lines.push(<line key={'gv' + i} x1={i*gridSize} y1={0} x2={i*gridSize} y2={height} style={ lineStyle } />)
    }
    //horizontal lines
    for(let i=0; i < height/gridSize; i++){
      lines.push(<line key={'gh' + i}x1={0} y1={i*gridSize} x2={width} y2={i*gridSize} style={ lineStyle } />)
    }
    return lines
  }

  _renderAxis(width, height){
    return null
  }
}

function mapStateToProps(state, ownProps){
  return {  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Plotter)