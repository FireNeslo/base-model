import pluralize from "pluralize"
import {camelCase} from "lodash"


export default class Adapter {
  constructor(model, config={}) {
    if(typeof config === 'string') {
      config = {namespace: config}
    }
    this.model = model
    this.config = config
  }
  get tableName() {
    return pluralize(camelCase(this.model.className))
  }
  get primaryKey() {
    return this.model.config.primaryKey
  }
  get namespace() {
    return this.config.namespace
  }
  static using(model, config) {
    return new this(model, config)
  }
  sync(Database, config) {
    var adapter = new Database(this.model, config)
    if(!this.model.config.adapters) this.model.config.adapters = []
    this.model.config.adapters.push(this.downstream = adapter)
    return Object.assign(adapter, {upstream: this})
  }
}
