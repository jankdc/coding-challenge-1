const rotationMap = ['N', 'E', 'S', 'W']

function moveShipForward (position) {
  const { x, y, orientation } = position

  switch (orientation) {
    case 'E':
      return Object.assign({}, position, {
        x: x + 1
      })
    case 'W':
      return Object.assign({}, position, {
        x: x - 1
      })
    case 'N':
      return Object.assign({}, position, {
        y: y +  1
      })
    case 'S':
      return Object.assign({}, position, {
        y: y - 1
      })
    default:
      return position
  }
}

function rotateShipClockwise (position) {
  const { orientation } = position

  const index = rotationMap.indexOf(orientation)

  return Object.assign({}, position, {
    orientation: rotationMap[(index + 1) % rotationMap.length]
  })
}

function rotateShipAntiClockwise (position) {
  const { orientation } = position

  const index = rotationMap.indexOf(orientation)

  return Object.assign({}, position, {
    orientation: rotationMap[index === 0 ? rotationMap.length - 1 : index - 1]
  })
}

module.exports = { moveShipForward, rotateShipClockwise, rotateShipAntiClockwise }
