import { Record } from 'immutable'

export const SphereBody = Record({
  radius: 1,
  color: '#ff0000',
  strokeColor: '#000000',
  strokeWidth: 1,
  visible: true
})

export function createSphereBody(radius = 1, color = '#f00', strokeColor = '#000', strokeWidth = 1, visible = true){
  //return new SphereBody({
  return {
    radius,
    color,
    strokeColor,
    strokeWidth,
    visible
  }
}

export default SphereBody