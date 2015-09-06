var request = require('./request')

module.exports = function create(data) {
  return this.open()
    .then(db => request(db.collection(this.tableName),'insert',[data.toJSON()]))
    .then(data => data.insertedIds[0] )
}
