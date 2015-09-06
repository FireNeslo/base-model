var fetch = require('./request')

module.exports = function destroy(id) {
  var path = `${this.namespace}/${this.tableName}/${id}${this.postfix}`
  return fetch(path, { method: 'delete' })
}
