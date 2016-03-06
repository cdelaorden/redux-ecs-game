import createFamily from './create'

export default function createRenderable(){
  return createFamily('Renderable', [
    'Position',
    'SphereBody'
  ])
}