module.exports = function close() {
  if(!this.connection) return Promise.reject();
  return this.connection.then(db => {
    return db.close()
  })
}
