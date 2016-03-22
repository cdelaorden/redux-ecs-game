import { Map, List, Record, fromJS } from 'immutable'

const Entity = Record({
  id: 0,
  components: Map()
})

class GameEntity extends Entity {
  getComponents(){
    return this.components
  }
  addComponent(name, c){
    if(!Map.isMap(c)){
      throw new Error('addComponent expects a Map or Record')
    }
    return this.setIn(['components', name], c)
  }
  updateComponent(name, func){
    return this.updateIn(['components', name], func)
  }
}

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
      _lastTime = 0,
      _rAF = 0

      if(!verifySystemDefinition(_systems)){
        throw new Error('Invalid system definition')
      }

  function update(time){
    if(_lastTime === 0)
      _lastTime = time

    //_lastTime = time - _lastTime
    let dt = time - _lastTime
    _systems.forEach(s => {
      _entities = s.update(_entities, dt)
    })
    _rAF = requestAnimationFrame(update)
  }

  function createEntity(components = Map()){
    let e = new Entity({ id: _nextId++, components})
    _entities = _entities.set(e.id, e)
    return e
  }

  function addComponent(id, name, c){
    if(!id || !name || !c){
      throw new Error('addComponent - id, name and component definition are required')
    }
    _entities = _entities.update(id, (entity) => {
      return entity.setIn(['components', name], c)
    })
    return _entities.get(id)
  }

  function getEntities(withComps = []){
    return withComps.length > 0 ?
      _entities.filter(e => withComps.every(c => e.components.has(c))) :
      _entities
  }

  function start(){
    _isRunning = true
    //_lastTime = Date.now()
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
    addComponent,
    getEntities,
    isRunning: () => _isRunning
  }
}