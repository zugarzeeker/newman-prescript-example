const argv = require('minimist')(process.argv.slice(2))
const cp = require('child_process')
const fs = require('fs')
const filepath = argv._[0]
const collection = require(filepath)

cp.execSync('mkdir -p build', { stdio: 'inherit' })

fs.writeFileSync(
  `build/${filepath
    .split('/')
    .pop()
    .replace(/\.js$/, '')}.json`,
  JSON.stringify(collection, null, 2),
  'utf8'
)
