import Family from './family'

export function createMovable(){
  return new Family({
    name: 'Movable',
    comps: ['Position', 'SphereBody']
  })
}

