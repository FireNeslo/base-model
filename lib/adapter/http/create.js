var fetch = require('./request')

module.exports = function create(data) {
  var path = `${this.namespace}/${this.tableName}${this.postfix}`
  var opts = { method: 'post', body: JSON.stringify(data) }
  return fetch(path, opts).then(model => {
    if(typeof model !== 'object') {
      model = {[this.primaryKey]: model}
    }
    return Object.assign(data, model)
  })
}
