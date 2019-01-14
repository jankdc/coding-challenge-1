function hashPosition (position) {
  return `${position.x} ${position.y} ${position.orientation}`
}

module.exports = { hashPosition }
