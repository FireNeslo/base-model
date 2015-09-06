import changes from "./changes"

export default [...changes, {
  persist(value) {
    return (this.__value__ = Object.assign(this, value).toJSON()), this
  },
  destroy() {
    var destroys = adapter => adapter.destroy(this.id)
    return Promise.all(this.config.adapters.map(destroys))
      .then(update => this.persist({isDestroyed: true}))
  },
  update() {
    if(!this.isChanged()) return this
    var updates = adapter => adapter.update(this.id, this.changed())
    return Promise.all(this.config.adapters.map(updates))
      .then(update => Object.assign(this, ...update))
      .then(update => this.persist())
  },
  save() {
    if(this.isPersisted) return this.update()
    var creates = adapter => adapter.create(this)
    return Promise.all(this.config.adapters.map(creates))
      .then(create => Object.assign(this, ...create))
      .then(create => this.persist())
  }
}]
