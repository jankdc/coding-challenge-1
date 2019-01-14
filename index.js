const fs = require('fs')
const readline = require('readline')

function main () {
  const filename = process.argv[2]

  const fileStream = fs.createReadStream(filename)
  const lineStream = readline.createInterface({ input: fileStream })

  lineStream.on('line', line => {
    console.log(line)
  })
}

main()
