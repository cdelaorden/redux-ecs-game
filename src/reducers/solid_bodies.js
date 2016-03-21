import { fromJS, List } from 'immutable'

const initialState = fromJS([
  //floor
  {
    id: 1,
    position: { x: 0, y: 718 },
    size: { w: 1200, h: 50, mass: 100000 },
  },
  //platform
  {
    id: 2,
    position: { x: 370, y: 663 },
    size: { w: 150, h: 56 }
  },
  //platform
  {
    id: 3,
    position: { x: 520, y: 607 },
    size: { w: 150, h: 112 }
  },
  //platform
  {
    id: 4,
    position: { x: 753, y: 548 },
    size: { w: 271, h: 40 }
  }
])

export default function solidBodies(state = initialState, action){
  switch(action.type){
    default:
      return state
  }
}