import { fromJS } from 'immutable'
import { GAME_UPDATE } from '../actions/types'
const g = 0.2

const initialState = fromJS({
  position: { x: 100, y: 300},
  speed: { vx: 0, vy: 0.3},
  size: { w: 48, h: 56 },
  state: 'ST_RIGHT'
})

export default function heroReducer(state = initialState, action){
  switch(action.type){
  case GAME_UPDATE:
    return updateHero(state, action)

  default:
    return state
  }
}

function updateHero(hero, { dt }){
  return hero.withMutations(h => {
    const x = h.getIn(['position', 'x']),
          y = h.get(['position', 'y']),
          vx = h.getIn(['speed', 'vx']),
          vy = h.getIn(['speed', 'vy'])

    return updatePos(h, vx, vy, dt)
  })
}

function updatePos(h, vx, vy, dt){
  return h.updateIn(['position', 'x'], x => x + vx*dt)
          .updateIn(['position', 'y'], y => y + vy*dt)
}
