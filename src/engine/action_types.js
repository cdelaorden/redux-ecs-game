//Game loop control
export const GAME_UPDATE = '@GAME_UPDATE'
export const GAME_START = '@GAME_START'
export const GAME_PAUSE = '@GAME_PAUSE'
export const GAME_END = '@GAME_END'

/** COMPONENTS **/
//a new component type is created
export const COMPONENT_CREATE = '@GAME/COMPONENTS/CREATE'
// a new component instance is added to an entity
export const COMPONENT_ADD = '@GAME/COMPONENTS/ADD'
//an existing component instance is removed from an entity
export const COMPONENT_REMOVE = '@GAME/COMPONENTS/REMOVE'

/** SYSTEMS **/
export const SYSTEM_CREATE = '@GAME/SYSTEMS/CREATE'
export const SYSTEM_REMOVE = '@GAME/SYSTEMS/REMOVE'
export const SYSTEM_PAUSE = '@GAME/SYSTEMS/PAUSE'
export const SYSTEM_UNPAUSE = '@GAME/SYSTEMS/UNPAUSE'

/** FAMILIES **/
export const FAMILY_CREATE = '@GAME/FAMILIES/CREATE'
export const FAMILY_REMOVE = '@GAME/FAMILIES/REMOVE'

