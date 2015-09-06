import Adapter from '../adapter'
import find from './find'
import open from './open'
import close from './close'
import where from './where'
import create from './create'
import update from './update'
import destroy from './destroy'

export default class MongoDB extends Adapter {}

Object.assign(MongoDB.prototype, {
  find, open, close, where, create, update, destroy
})
