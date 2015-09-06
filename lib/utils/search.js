import {find} from "lodash"

function instance(Model, model) {
  return model instanceof Model ? model : new Model(model).persist()
}

function collection(Model, models) {
  return models.map(model => instance(Model, model))
}

function upsert(adapters, model, index) {
  var pending = adapters.slice(0, index).map(adapter => {
    return adapter.create(model)
  })
  return Promise.all(pending)
}

export function where(Model, query) {
  var index = 0
  var primaryKey = Model.config.primaryKey
  var adapters = Model.config.adapters
  return adapters[index].where(query)
    .then(function next(array=[]) {
      var pending = Promise.resolve()
      var models = collection(Model, array)
      if(adapters[index+1]) {
        pending = adapters[index+=1].where(query).then(array => {
          return next(array).then(append => {
            var pending = append.map((model) => {
              var item = find(models, {id:model.id})
              if(!item) return upsert(adapters, model, index).then(saved => {
                return models.push(model), model
              })
              return item.update(model)
            })
            return Promise.all(pending)
          })
        })
      }
      return pending.then(done => models)
    })
}

export function fetch(Model, id) {
  var index = 0, adapters = Model.config.adapters

  return adapters[index].find(id)
    .then(function next(model) {
      if(!model && adapters[index+1]) {
        model = instance(Model, model)
        return adapters[index =+ 1].find(id).then(function (model) {
          if(model = next(model)) {
            return upsert(adapters, model, index)
          }
          return model
        })
      }
      return model
    })
}
