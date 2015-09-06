import mixin from '../utils/mixin'
import config from './config'
import search from './search'
import persistance from './persistance'
import prototype from './prototype'

class Model {
  constructor(model) {
    this.__value__ = {}
    Object.assign(this, model)
  }
}

mixin(Model, ...search, ...config, ...persistance)
mixin(Model.prototype, ...prototype)

export default Model
