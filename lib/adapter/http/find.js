var fetch = require('./request')

module.exports = function find(id) {
  return fetch(`${this.namespace}/${this.tableName}/${id}${this.postfix}`)
}
