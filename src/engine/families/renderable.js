import Family from './family'

export default function createRenderable(){
  return new Family({
    name: 'Renderable',
    comps: [ 'Position', 'SphereBody' ]
  })
}