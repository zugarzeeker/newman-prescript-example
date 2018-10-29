const { step, action } = require('prescript')
const newman = require('newman')

const testCollectionItem = item => {
  step(item.name, () => {
    action(async state => {
      const collection = {
        item: [item]
      }
      await new Promise((resolve, reject) => {
        newman.run(
          {
            collection,
            // reporters: 'cli',
            environment: state.environment || {},
            globals: state.globals || {}
          },
          function(err, summary) {
            if (err) {
              console.log(err)
              reject(err)
              return
            }
            if (summary.run.failures.length > 0) {
              console.log(summary.run.failures)
              reject(new Error('FAIL'))
              return
            }
            state.environment = summary.environment
            state.globals = summary.globals
            resolve()
          }
        )
      })
    })
  })
}

const testCollectionItems = collectionItems => {
  collectionItems.forEach(testCollectionItem)
}

const formatCollectionItemsToCollections = collection => {
  const collections = collection.item.map(item => ({
    info: collection.info,
    item: [item]
  }))
  return collections
}

const testCollection = collection => {
  console.log(collection.info.name)
  step(collection.info.name, () => {
    const items = collection.item
    testCollectionItems(items)
  })
}

const testCollections = collections => {
  collections.forEach(testCollection)
}

const mergeCollections = (collections, { customCollectionName, filename } = {}) => {
  const newCollection = {
    info: {
      ...collections[0].info,
      name:
        (filename &&
          filename
            .split('/')
            .pop()
            .replace(/.js$/, '')) ||
        customCollectionName ||
        collections[0].info.name
    },
    item: []
  }
  collections.map(collection => {
    newCollection.item = [...newCollection.item, ...collection.item]
  })
  return newCollection
}

const reportSummary = () => {}
const clearState = () => {}

exports.mergeCollections = mergeCollections
exports.formatCollectionItemsToCollections = formatCollectionItemsToCollections
exports.testCollectionItems = testCollectionItems
exports.testCollectionItem = testCollectionItem
exports.testCollection = testCollection
exports.testCollections = testCollections
exports.reportSummary = reportSummary
exports.clearState = clearState
