import createComponent from './create'

export default function createVelocity2D(vx = 0, vy = 0, ang = 0){
  return createComponent('Velocity2D', { vx, vy, ang })
}