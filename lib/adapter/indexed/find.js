var request = require('./request')

module.exports = function(id) {
  return this.open().then(db => {
    var transaction = db.transaction([this.tableName]);
    var collection = transaction.objectStore(this.tableName);
    return request(this, collection.get(id))
  })
}
