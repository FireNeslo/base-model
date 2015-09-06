var request = require('./request')

module.exports = function create (data) {
  return this.open().then(db => {
    var transaction = db.transaction([this.tableName], 'readwrite')
    var collection  = transaction.objectStore(this.tableName)
    function insert(data) {
      return request(this, collection.put(data.toJSON()))
    }
    return Array.isArray(data) ? Promise.all(data.map(insert)) : insert(data);
  })
  .then(id => {
    return this.close(), data
  })
}
