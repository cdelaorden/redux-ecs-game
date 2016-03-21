//selectors
import { createSelector } from 'reselect'

const spheres = state => state.components.get('sphereBody')
const positions = state => state.components.get('position')
const tags = state => state.components.get('tag')
const isPaused = state => state.game.get('isPaused')

const hero = state => state.hero
const platforms = state => state.solidBodies

export const appState = createSelector(
  isPaused,
  hero,
  platforms,
  (isPaused, hero, platforms ) => ({ isPaused, hero, platforms })
)