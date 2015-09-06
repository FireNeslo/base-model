import Adapter from '../adapter'
import open from './open'
import find from './find'
import where from './where'
import close from './close'
import create from './create'
import update from './update'
import destroy from './destroy'
import traverse from './traverse'

export default class IndexedDB extends Adapter {
  get namespace() {
    return this.config.namespace || this.model.config.namespace
  }
}

Object.assign(IndexedDB.prototype, {
  open,find,where,close,create,update,destroy,traverse
})
