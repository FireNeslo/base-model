import Adapter from "./adapter"
import {compileDocumentSelector} from "minimongo/src/selector"
import {filter} from "lodash"


export default class MemoryDB extends Adapter {
  constructor(model, config) {
    super(model, config)
    this.cache = {}
  }
  find(id) {
    return Promise.resolve(this.cache[id])
  }
  where(query) {
    return Promise.resolve(filter(this.cache, compileDocumentSelector(query)))
  }
  create(model) {
    return Promise.resolve(this.cache[model.id] = model)
  }
  update(id, change) {
    if(!this.cache[id]) return this.find(id)
    if(Object.keys(change).length) return this.find(id)
    return Promise.resolve(Object.assign(this.cache[id], change))
  }
  destroy(id) {
    return Promise.resolve(delete this.cache[id])
  }
}
