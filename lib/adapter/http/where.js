var fetch = require('./request')

module.exports = function find(query) {
  var path = `${this.namespace}/${this.tableName}${this.postfix}`
  var search = query ? `?query=${JSON.stringify(query)}` : ''

  return fetch(path + search).then(data => {
    if(Array.isArray(data)) return data
    return Object.keys(data || {}).map(id => {
      return data[id][this.primaryKey] = id, data[id]
    })
  })
}
