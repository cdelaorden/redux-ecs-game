import jsdom from 'mocha-jsdom'
import raf from 'raf'
import { createEngine } from '../../engine'
import { Map, fromJS, Record } from 'immutable'
import assert from 'assert'

describe('Engine', () => {
  jsdom()
  raf.polyfill()

  const HealthComponent = Record({
    value: 100
  })


  it('createEngine returns a a game engine with functions', () => {
    let engine = createEngine([])
    assert.equal('function', typeof engine.start)
    assert.equal('function', typeof engine.pause)
    assert.equal('function', typeof engine.stop)
    assert.equal('function', typeof engine.isRunning)
    assert.equal('function', typeof engine.createEntity)
    assert.equal('function', typeof engine.addComponent)
    assert.equal('function', typeof engine.getEntities)
  })

  it('createEntity returns a new Entity record with id and empty component map', () => {
    let engine = createEngine(),
        entity1 = engine.createEntity(),
        entity2 = engine.createEntity()

    assert.equal(1, entity1.id)
    assert.equal(0, entity1.components.count())
    assert.equal(2, entity2.id)
    assert.equal(0, entity2.components.count())
  })

  it('createEntity accepts optional components', () => {
    let comps = fromJS({
      comp1: { foo: 1 },
      comp2: { bar: 2 }
    })

    let engine = createEngine(),
        entity = engine.createEntity(comps)

    assert.equal(1, entity.id)
    assert.equal(2, entity.components.count())
    assert.equal(1, entity.components.get('comp1').get('foo'))
  })

  it('addComponent adds a component to an entity (and returns the entity)', () => {
    let engine = createEngine(),
        e = engine.createEntity(),
        id = e.id

    e = engine.addComponent(id, 'health', new HealthComponent())
    assert.equal(1, e.components.count())
    assert.equal(100, e.components.get('health').value)
  })

  it('getEntities returns existing entities', () => {
    const engine = createEngine(),
          comps = fromJS({
            size: { width: 100 }
          }),
          entity = engine.createEntity(comps)

    const ents = engine.getEntities()
    assert.equal(1, ents.count())
    assert.equal(1, ents.first().id)
    assert.equal(100, ents.first().components.getIn(['size', 'width']))
  })

  it('getEntities accepts an optional list of must-have components to filter', () => {
    const engine = createEngine(),
          comps = fromJS({
            size: { width: 100 }
          }),
          entity = engine.createEntity(comps),
          ent2 = engine.createEntity(fromJS({ foobar: { foo: 1}}))

    //1 with size
    assert.equal(1, engine.getEntities(['size']).count())
    //1 with foobar
    assert.equal(1, engine.getEntities(['foobar']).count())
    //None has foobaz
    assert.equal(0, engine.getEntities(['foobaz']).count())
  })

  it('start should begin rAF', () => {
    const engine = createEngine()
    engine.start()
    assert.equal(engine.isRunning(), true)
    engine.stop()
  })

  it('stop() should stop rAF', () => {
    const engine = createEngine()
    engine.start()
    engine.stop()
    assert.equal(engine.isRunning(), false)
  })

  it('during loop, systems should be called with the list of entities and passed time, and its results stored', (done) => {
    let updates = 0
    const systems = [{
      name: 'gravity',
      update: function(entities, dt){
        updates++
        assert.equal(1, entities.count())
        assert.equal('number', typeof dt)
        return entities.map(e => {
          return e.setIn(['components', 'foo', 'bar'], updates)
        })
      }
    }]
    const engine = createEngine(systems),
          ent = engine.createEntity(fromJS({ foo: { bar: 1 }}))

    engine.start()
    setTimeout(() => {
      engine.stop()
      let ents = engine.getEntities()
      assert.equal(updates, ents.first().components.getIn(['foo', 'bar']))
      assert(updates > 0, 'Update() loops')
      done()
    }, 65)
  })
})

