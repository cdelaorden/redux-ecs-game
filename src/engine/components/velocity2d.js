import { Record } from 'immutable'

export default const Velocity2D = Record({
  vx: 0,
  vy: 0,
  ang: 0
})

export function createVelocity2D(vx, vy, ang){
  return new Velocity2D({ vx, vy, ang })
}