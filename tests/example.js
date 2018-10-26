const { testCollection } = require('../lib/newman')
const collection = require('./sample-collection.json')

testCollection(collection)
