import { Record } from 'immutable'

export default const SphereBody = Record({
  radius: 1,
  color: '#ff0000',
  strokeColor: '#000000',
  strokeWidth: 1,
  visible: true
})

export function createSphereBody(radius, color, strokeColor, strokeWidth, visible){
  return new SphereBody({
    radius,
    color,
    strokeColor,
    strokeWidth,
    visible
  })
}