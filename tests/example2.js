const { getSampleGetCollection, getSamplePostCollection } = require('../lib/cases')
const { mergeCollections } = require('../lib/newman')

module.exports = mergeCollections([getSampleGetCollection(), getSamplePostCollection()], module)
