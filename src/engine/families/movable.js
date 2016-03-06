import Family from './family'

export function createMovable(){
  return new Family({
    name: 'Movable',
    comps: ['Position', 'Velocity2D']
  })
}

const Movable = {
  name: 'movable',
  comps: ['position', 'velocity2D']
}

export default Movable