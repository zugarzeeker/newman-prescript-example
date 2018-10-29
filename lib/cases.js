const { testCollection } = require('./newman')

const CASES = {
  SAMPLE_GET: require('./collections/sample-get.json'),
  SAMPLE_POST: require('./collections/sample-post.json')
}

module.exports.CASES = CASES

module.exports.getSampleGetCollection = () => CASES.SAMPLE_GET
module.exports.getSamplePostCollection = () => CASES.SAMPLE_POST
