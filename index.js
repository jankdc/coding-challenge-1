const fs = require('fs')
const readline = require('readline')

const {
  parsePosition,
  parseDimensions,
  parseInstructions
} = require('./lib/input')

const {
  Simulator
} = require('./lib/simulator')

function main () {
  const filename = process.argv[2]

  const fileStream = fs.createReadStream(filename)
  const lineStream = readline.createInterface({ input: fileStream })

  let index = 0
  let shipPosition

  const simulator = new Simulator()

  lineStream.on('line', line => {
    if (line.length === 0) {
      return
    }

    if (index === 0) {
      simulator.setDimensions(parseDimensions(line))
    } else if (index % 2 === 1) {
      shipPosition = parsePosition(line)
    } else {
      simulator.run(shipPosition, parseInstructions(line))
    }

    index += 1
  })

  lineStream.on('close', () => {
    simulator.log()
  })
}

main()
