import cuid from 'cuid'
import config from './config'

export default [...config, {
  get id() {
    var primaryKey = this.config.primaryKey === 'id' ?
      '_id' : this.config.primaryKey
    return this[primaryKey] || (this[primaryKey] = cuid())
  },
  set id(id) {
    if(this.config.primaryKey === 'id') this._id = id
    else this[this.config.primaryKey] = id
  }
}]
