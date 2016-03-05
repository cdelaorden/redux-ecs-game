import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'



class Plotter extends Component {
  render(){
    const { x, y, width, height, xLabel, yLabel } = this.props
    return (
      <g id="plotter">
        { this._renderGrid(width, height) }
        { this._renderAxis(width, height, xLabel, yLabel) }
        <g id="graph">
        { this._plot(width, height) }
        </g>
      </g>
    )
  }

  _renderGrid(width, height){
    const gridSize = 20
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
      lines.push(<line key={'gh' + i} x1={0} y1={i*gridSize} x2={width} y2={i*gridSize} style={ lineStyle } />)
    }
    return lines
  }

  _renderAxis(width, height, xLabel = 'x', yLabel = 'y'){
    const axisStyle = {
      stroke: '#666',
      strokeWidth: '1px'
    }
    let axis = []
    //vertical axis and label
    axis.push(<line key='ay' x1={width/2} y={0} x2={width/2} y2={height} style={axisStyle} />)
    axis.push(<text key='ly' x={ width / 2 + 5 } y={ 20 } style={ axisStyle }>{yLabel.toUpperCase()}</text>)
    //horizontal axis and label
    axis.push(<line key='ax' x1={0} y1={height/2} x2={width} y2={height/2} style={axisStyle} />)
    axis.push(<text key='lx' x={ 10 } y={ height / 2  - 10} style={ axisStyle }>{xLabel.toUpperCase()}</text>)
    //origin
    axis.push(<circle key='O' r='3' cx={ width/2} cy={height/2} style={axisStyle} />)
    return axis
  }

  _plot(width, height){
    const func = (x) => x*x,
          start = -100,
          end = 100,
          step = 1

    const plotStyle = {
      fill: '#f00'
    }

    let points = [],
        prev = null

    for(let i=start; i < end; i=i+step){
      let x = i + width/2,
          y = -func(i) + height/2
      if(!prev){
        prev = {x: 0, y: 0}
      }
      //points.push(<circle key={`pt${points.length}`} r={1} cx={x + width/2} cy={-y + height/2}  style={ plotStyle }/>)
      points.push(<line key={'l' + i} x1={prev.x} y1={prev.y} x2={x} y2={y} style={plotStyle} />)
      //}
      prev = { x, y }
    }

    return points

  }
}

function mapStateToProps(state, ownProps){
  return {  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(Plotter)