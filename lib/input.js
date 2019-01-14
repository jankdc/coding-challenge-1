const instructionRegex = /^[LRF]+$/
function parseInstructions (str) {
  if (!instructionRegex.test(str)) {
    throw new ParseError(`bad instructions: ${str}`)
  }

  if (str.length > 100) {
    throw new ParseError(`max instructions: ${str}`)
  }

  return Array.from(str)
}

const dimensionsRegex = /^([0-9]|[1-9][0-9]+) ([0-9]|[1-9][0-9]+)$/
function parseDimensions (str) {
  if (!dimensionsRegex.test(str)) {
    throw new ParseError(`bad dimensions: ${str}`)
  }

  const [ wStr, hStr ] = str.split(' ')

  const dimensions = {
    h: parseInt(hStr, 10),
    w: parseInt(wStr, 10)
  }

  if (dimensions.w > 50) {
    throw new ParseError(`max width: ${str}`)
  }

  if (dimensions.h > 50) {
    throw new ParseError(`max height: ${str}`)
  }

  return dimensions
}

const positionRegex = /^([0-9]|[1-9][0-9]+) ([0-9]|[1-9][0-9]+) [NSEW]$/
function parsePosition (str) {
  if (!positionRegex.test(str)) {
    throw new ParseError(`bad position: ${str}`)
  }

  const [ xStr, yStr, orientation ] = str.split(' ')

  const position = {
    x: parseInt(xStr, 10),
    y: parseInt(yStr, 10),
    orientation
  }

  if (position.x > 50) {
    throw new ParseError(`max x coordinate: ${str}`)
  }

  if (position.y > 50) {
    throw new ParseError(`max y coordinate: ${str}`)
  }

  return position
}

class ParseError extends Error {
  constructor () {
    super(...arguments)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ParseError)
    }
  }
}

module.exports = {
  ParseError,
  parsePosition,
  parseDimensions,
  parseInstructions
}
