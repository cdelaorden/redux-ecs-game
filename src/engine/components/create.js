import { fromJS } from 'immutable'

export default function createComponent(name /* String */, data /* Object */){
  //TODO - inject the component name in the state somehow
  //in the meantime, return an immutable Map
  if(typeof data !== 'object' || Object.keys(data).length === 0)
    throw new Error('createComponent expects an object with component default data')
  return fromJS(data)
}