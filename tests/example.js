const { step, action } = require('prescript')
const newman = require('newman')

const collection = require('./sample-collection.json')

const cases = collection.item.map(item => ({
  info: collection.info,
  item: [item]
}))

cases.forEach(c => {
  step(c.item[0].name, () => {
    action(async state => {
      await new Promise((resolve, reject) => {
        newman.run(
          {
            collection: c,
            reporters: 'cli',
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
})
