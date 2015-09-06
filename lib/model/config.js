var defaults = require('../../defaults')

export default [{
  configure(config) {
    return (this._defaults = Object.assign(this._defaults || {}, config)), this
  },
  get config() {
    return this._config || (
      this._config = Object.assign(defaults(this), this._defaults)
    )
  },
  get collection() {
    return this.config.collection
  },
  get className() {
    return this.config.className || (this.config.className = this.name)
  },
  set className(name) {
    this.config.className = name
  }
}]
