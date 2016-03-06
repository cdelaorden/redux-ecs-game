const VEL_2D = 'velocity2D'
const POS = 'position'
const velX = [VEL_2D, 'vx']
const velY = [VEL_2D, 'vy']
const posX = [POS, 'x']
const posY = [POS, 'y']
const g = 0.2
//Movement System
function update(movable, dt){
  console.log('Movement system moving stuff')
  const { vx, vy } = movable.get(VEL_2D)
  const { x, y } = movable.get(POS)

  return movable.withMutations(m => {
    return m
      .updateIn(velY, vy => vy + g)
      .updateIn(posX, x => x + m.getIn(velX))
      .updateIn(posY, y => y + m.getIn(velY))
  })
}


const MovementSystem = {
  update,
  priority: 1,
  families: ['movable']
}

export default MovementSystem