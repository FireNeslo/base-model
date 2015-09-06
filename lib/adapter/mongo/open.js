var MongoClient = require('mongodb').MongoClient
var request = require('./request')

module.exports = function open() {
  return this.connection || (this.connection =
    request(MongoClient, 'connect', [this.namespace]))
}
