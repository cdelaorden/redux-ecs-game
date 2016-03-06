import { Map } from 'immutable'

export default function createFamily(
  name /* String */,
  components /* Array<String> */)
{
  //TODO: inject the family in the engine state somehow
  if(!Array.isArray(components) || name.length === 0){
    throw new Error('createFamily expects a name and an array of component names')
  }

  return Map({ name, components })

}