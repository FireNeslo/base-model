var request = require('./request')

module.exports = function update(id, data) {
  return this.open().then(db => {
    return request(db.collection(this.tableName), 'update', [{
      [this.primaryKey]: id}, data])
    })
}
