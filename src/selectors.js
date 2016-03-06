//selectors
import { createSelector } from 'reselect'

const spheres = state => state.components.get('sphereBody')
const positions = state => state.components.get('position')
const tags = state => state.components.get('tag')
const isPaused = state => state.game.get('isPaused')

export const balls = createSelector(
  tags,
  spheres,
  positions,
  (tags,sphereComps, posComps) => {
    let ballIds = tags.filter(t => t.tag === 'ball').keySeq().toArray()
    return ballIds.map(id => {
      //get individual components and merge them
      let body = sphereComps.get(id),
          position = posComps.get(id)

      return { body, position }
    })
  }
)

export const appState = createSelector(
  isPaused,
  balls,
  (isPaused, balls) => ({ isPaused, balls })
)