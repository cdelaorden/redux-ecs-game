import { Map } from 'immutable'
export default function createSystem(name, config){
  /** Config example
  {
    process: Function
    selector: Function (optional)
    priority: Number,
    families: Array<String>

  }
  **/

  const defaults = {
    process: (x, dt) => x,
    selector: null,
    priority: 1,
    families: []
  }

  const options = Object.assign({}, defaults, config)

  return new Map(options)
}
