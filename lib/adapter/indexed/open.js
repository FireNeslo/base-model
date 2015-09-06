var request = require('./request')

module.exports = function open() {
  var tableName = this.tableName
  var primaryKey = this.primaryKey
  return (this.connection =
    request(this, indexedDB.open(this.namespace || 'ng-base', 2),{
    onupgradeneeded(db) {
      db.deleteObjectStore(tableName)
      db.createObjectStore(tableName, {
        keyPath: primaryKey,
        autoIncrement: false
      })
    }
  }))
}
