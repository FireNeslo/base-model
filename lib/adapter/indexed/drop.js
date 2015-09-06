var request = require('./request')

module.exports = function (model) {
  return request(this, indexedDB.deleteDatabase(this.tableName), {
    onblocked(event, {onerror}) {
      onerror(event)
    }
  })
}
