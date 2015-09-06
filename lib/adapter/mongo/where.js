var request = require('./request')

module.exports = function where(query) {
  return this.open().then(db => {
    return request(db.collection(this.tableName).find(query), 'toArray')
  })
}
