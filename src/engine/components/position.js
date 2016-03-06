import { Record } from 'immutable'

export const Position = Record({
  x: 0,
  y: 0
})

export function createPosition(x, y){
  return new Position({x, y})
}

export default Position