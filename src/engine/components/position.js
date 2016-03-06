import createComponent from './create'

export default function createPosition(x = 0, y = 0){
  return createComponent('Position', { x, y })
}