import { Map, List, Record, fromJS } from 'immutable'

const Entity = Record({
  id: 0,
  components: Map()
})

function verifySystemDefinition(ss){
  return ss.reduce((acc, s) => {
    if(typeof s.name !== 'string'){
      console.error('Name is required')
      return false
    }
    if(typeof s.update !== 'function'){
      console.error('update() should be a function')
      return false
    }
    if(!Array.isArray(s.comps)){
      s.comps = []
    }
    return acc
  }, true)
}

export function createEngine(systems = []){
  let _nextId = 1,
      _systems = systems,
      _entities = Map(),
      _isRunning = false,
      _rAF = 0

      if(!verifySystemDefinition(_systems)){
        throw new Error('Invalid system definition')
      }

  function update(time){
    _systems.forEach(s => {
      _entities = s.update(_entities, time)
    })
  }

  function createEntity(components = Map()){
    let e = new Entity({ id: _nextId++, components})
    _entities = _entities.set(e.id, e)
    return e
  }

  function getEntities(withComps = []){
    return withComps.length > 0 ?
      _entities.filter(e => withComps.every(c => e.components.has(c))) :
      _entities
  }

  function start(){
    _isRunning = true
    _rAF = requestAnimationFrame(update)
  }

  function stop(){
    _isRunning = false
    cancelAnimationFrame(_rAF)
  }

  function pause(){
    stop()
  }

  return {
    start,
    stop,
    pause,
    createEntity,
    getEntities,
    isRunning: () => _isRunning
  }
}