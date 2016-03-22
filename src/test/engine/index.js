import jsdom from 'mocha-jsdom'
import raf from 'raf'
import { createEngine } from '../../engine'
import { Map, fromJS } from 'immutable'
import assert from 'assert'

describe('Engine', () => {
  jsdom()
  raf.polyfill()

  it('createEngine returns a a game engine with start, pause, stop, isRunning, createEntity, getEntities methods', () => {
    let engine = createEngine([])
    assert.equal('function', typeof engine.start)
    assert.equal('function', typeof engine.pause)
    assert.equal('function', typeof engine.stop)
    assert.equal('function', typeof engine.isRunning)
    assert.equal('function', typeof engine.createEntity)
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
          entity = engine.createEntity(comps)

    let ents = engine.getEntities(['size'])
    assert.equal(1, ents.count())
    let emptyEnts = engine.getEntities(['fake'])
    assert.equal(0, emptyEnts.count())
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

  it('during loop, systems should be called with list of entities matching its comps and its results stored', (done) => {
    const systems = [{
      name: 'gravity',
      update: function(entities, dt){
        assert.equal(1, entities.count())
        assert.equal('number', typeof dt)
        return entities.map(e => {
          return e.setIn(['components', 'foo', 'bar'], 2)
        })
      }
    }]
    const engine = createEngine(systems),
          ent = engine.createEntity(fromJS({ foo: { bar: 1 }}))

    engine.start()
    setTimeout(() => {
      let ents = engine.getEntities()
      assert.equal(2, ents.first().components.getIn(['foo', 'bar']))
      done()
      engine.stop()
    }, 16)
  })
})

