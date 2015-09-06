import Mongo from './lib/adapter/mongo'

export default Model => ({
  primaryKey: 'id',
  adapters: [
    new Mongo(Model, 'mongodb://localhost:27017/demo')
  ]
})
