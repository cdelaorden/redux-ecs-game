import { Record } from 'immutable'

export const Vector = new Record({
  x: 0,
  y: 0,
  z: 0
})

export function createVector2D(x, y){
  return new Vector({ x, y })
}

export default {
  Vector,
  createVector2D
}