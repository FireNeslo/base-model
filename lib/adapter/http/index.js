var request = require('./request')
var Adapter = require('../adapter')

export default class HttpDB extends Adapter {
  get namespace() {
    return super.namespace || location.href
  }
  get postfix() {
    return this.config.postfix || this.model.config.postfix || ''
  }
}

Object.assign(HttpDB.prototype, {
  find: require('./find'),
  where: require('./where'),
  create: require('./create'),
  update: require('./update'),
  destroy: require('./destroy')
})
