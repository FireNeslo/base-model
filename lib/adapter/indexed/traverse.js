var request = require('./request')

module.exports = function traverse(query, data) {
  return this.open().then(db => {
    var transaction = db.transaction([this.tableName], 'readwrite')
    var collection = transaction.objectStore(this.tableName)
    var cursor = collection.openCursor(IDBKeyRange.lowerBound(0))
    var results = []

    return request(this, cursor, {
      oncomplete(e, {onsuccess}) {
        onsuccess(results)
      },
      onsuccess(result, {onsuccess}) {
        if(!result) return onsuccess(results)
        if(!query(result.value)) return result.continue();
        if(data==='delete') result.delete(result.value._id);
        else if(data) result.update(Object.assign(result.value, data))
        results.push(result.value);
        result.continue();
      }
    })
  })
  .then(data => {
    return this.close(), data
  })
}
