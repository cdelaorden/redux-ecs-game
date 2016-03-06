//TODO: get this from engine state
const HEIGHT = 600
const WIDTH = 1200

function update(entity, dt){
  let v = entity.get('Velocity2D'),
      p = entity.get('Position'),
      b = entity.get('SphereBody'),
      bottom = p.x + b.radius,
      top = p.y,
      right = p.x + b.radius,
      left = p.x,
      height = HEIGHT,
      width = WIDTH

  return entity.withMutations(e => {
    //floor / ceiling hit
    if(bottom >= HEIGHT || top <= 0){
      //change velocity
      e.updateIn(['Velocity2D', 'vy'], vy => vy * -0.9)
      e.updateIn(['Velocity2D', 'vx'], vx => vx * 0.9)
    }
    //side walls hit
    if(right >= WIDTH || left <= 0){
      e.updateIn(['Velocity2D', 'vy', vy => vy * -0.9])
      e.updateIn(['Velocity2D', 'vx', vx => vx * -0.9])
    }
    return e
  })
}

const BallCollisionSystem = {
  update,
  priority: 0,
  families: ['movable', 'renderable']
}

export default BallCollisionSystem