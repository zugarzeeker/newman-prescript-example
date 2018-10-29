const { mergeCollections } = require('../lib/newman')
const collection = require('./sample-collection.json')

module.exports = mergeCollections([collection], module)
