var fetch = require('./request')

module.exports = function update(id, data) {
  var path = `${this.namespace}/${this.tableName}/${id}${this.postfix}`
  return fetch(path, { method: 'put', body: JSON.stringify(data) })
    .then(model=> Object.assign(data, model))
}
