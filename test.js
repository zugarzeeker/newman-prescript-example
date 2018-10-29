const { testCollection } = require('./lib/newman')
const argv = require('minimist')(process.argv.slice(2))
const filepath = argv._.pop()
const collection = require(filepath)

testCollection(collection)
