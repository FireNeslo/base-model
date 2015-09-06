var request = require('./request')

module.exports = function find(id) {
  return this.open().then(db => {
    return request(db.collection(this.tableName), 'findOne', [{
      [this.primaryKey]: id
    }])
  })
}
