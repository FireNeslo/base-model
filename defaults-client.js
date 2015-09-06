import {Memory, Indexed, Http} from './lib/adapter'

export default Model => ({
  primaryKey: 'id',
  adapters: [
    new Memory(Model, 'base-model'),
    new Indexed(Model, 'base-model'),
    new Http(Model, 'http://localhost:3000')
  ]
})
