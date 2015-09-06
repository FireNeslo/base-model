var request = require('./request')

module.exports = function update(id) {
  return this.open().then(db => {
    return request(db.collection(this.tableName), 'remove', [{
      [this.primaryKey]: id}
    ])
  })
}
