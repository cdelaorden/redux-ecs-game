import createComponent from './create'

/**
 * Returns a new SphereBody component
 * @param radius      {Number}  Radius of the sphere. Default = 1
 * @param color       {String}  Color of the sphere. Default is red
 * @param strokeColor {String}  Color of the stroke. Default is black
 * @param strokeWidth {Number}  Stroke width in pixels.
 * @returns Map
 */
export default function createSphereBody(radius = 1, color = '#ff0000', strokeColor = '#000000', strokeWidth: 1){
  return createComponent('SphereBody', { radius, color, strokeColor, strokeWidth })
}