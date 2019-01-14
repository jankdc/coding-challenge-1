const {
  moveShipForward,
  rotateShipClockwise,
  rotateShipAntiClockwise
} = require('./ship')

const {
  hashPosition
} = require('./hash')

class Simulator {
  constructor () {
    this.dimensions = { w: 50, h: 50 }
    this.losts = new Set()
    this.ships = []
  }

  setDimensions (dimensions) {
    this.dimensions = dimensions
  }

  run (initialPosition, instructions) {
    let position = Object.assign({}, initialPosition)

    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i]

      let newPosition

      if (instruction === 'F') {
        if (this.losts.has(hashPosition(position))) {
          continue
        }

        newPosition = moveShipForward(position)
      }

      if (instruction === 'R') {
        newPosition = rotateShipClockwise(position)
      }

      if (instruction === 'L') {
        newPosition = rotateShipAntiClockwise(position)
      }

      const { x, y } = newPosition
      const { w, h } = this.dimensions

      const isOutOfBounds = x < 0 || x > w || y < 0 || y > h
      if (isOutOfBounds) {
        this.losts.add(hashPosition(position))
        break
      }

      position = newPosition
    }

    this.ships.push(position)
  }
}

module.exports = { Simulator }
