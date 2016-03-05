import { fromJS } from 'immutable'
import { GAME_UPDATE } from '../actions/types'
const g = 0.2

const defaultState = fromJS({
  radius: 50,
  color: '#336699',
  x: 600,
  y: 100,
  vx: 2,
  vy: 0
})

//silly ball reducer
export default function ball(state = defaultState, action){
  //console.log('Ball reducer', action)
  switch(action.type){
    case GAME_UPDATE:
      return moveBall(state, action)
    default:
      return state
  }
}

function moveBall(ball, { dt }){
  //console.log('moveBall', dt)
  return ball.withMutations(b => {
    b.update('vy', vy => vy + g)
    b.update('x', x => x + b.get('vx'))
    b.update('y', y => y + b.get('vy'))

    //hit
    if(b.get('y')+b.get('radius') >= 600){
      let newY = 600 - b.get('radius')
      b.set('y', newY)
      b.update('vy', vy => vy * -0.8)
      b.update('vx', vx => vx * 0.9)
    }
    //side bounds
    if(b.get('x') > 1200){
      b.set('x', -b.get('radius'))
    }

    return b
  })
}