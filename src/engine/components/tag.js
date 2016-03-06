import { Record } from 'immutable'
export const Tag = Record({
  tag: 'tag'
})

export function createTag(name){
  return new Tag(name)
}

export default Tag