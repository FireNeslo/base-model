var MongoClient = require('mongodb').MongoClient

module.exports = function close() {
  return this.open(),then(db => db.close())
}
