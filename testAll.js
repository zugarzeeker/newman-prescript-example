const glob = require('glob')
const chalk = require('chalk')
let failures = 0

for (const file of glob.sync('tests/**/*.js*')) {
  try {
    const childProcess = require('child_process')
    childProcess.execFileSync('./node_modules/prescript/bin/prescript', ['./test.js', '--', `./${file}`])
    console.log(chalk.bgGreen.bold(' OK '), file)
  } catch (e) {
    if (e.status === 2) {
      console.log(chalk.bgCyan.bold(' .. '), file)
    } else {
      console.log(chalk.bgRed.bold(' NG '), file)
      if (e.output) console.log(e.output.join(''))
      failures += 1
    }
  }
}

if (failures) {
  process.exitCode = 1
}
