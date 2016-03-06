import Family from './family'

export function createRenderable(){
  return new Family({
    name: 'Renderable',
    comps: ['Position', 'SphereBody']
  })
}

const Renderable = {
  name: 'renderable',
  comps: ['position', 'sphereBody', 'tag']
}

export default Renderable