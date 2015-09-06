### In development (contributions are welcome :D)

### usage

```js
import Model from "base-model"

// override defaults
Model.configure({
  primaryKey: '_id'
})
// hopefully I will create a mixin version as well for coffee-script and es5
export class Thing extends Model {}

Thing.create({name: "thingy"}).then(value => {
  console.log("yay I`m saved: ", value.id)
})

```

### api (in flux)

#### Model#configure(options) => this
main point of entry if you want to configure the model
```js
/* defaults */
Model.configure({
  primaryKey: "id"
})
```

#### Model#create(object) => Promise(Model)
create a new instance of the model
```js
Model.create({name: "thingy"}).then(model => {
  console.log('created:', model.idea) // > "cie8v0vuc00003c592wyxj706"
})
```
#### Model#find(id) => Promise(Model)
find an instance of the model
```js
Model.find("cie8v0vuc00003c592wyxj706").then(model => {
  console.log('found:', model.id) // > "cie8v0vuc00003c592wyxj706"
})

Model.find("does_not_exist").then(model => {
  console.log('found:', model) // > null
})
```
#### Model#where(query) => Query([...Model])
search for models
```js
/* works like a promise constructs mongo queries */
Model.where({name: "thingy"}).where('id').exists(true).then(models => {
  console.log('found:', models) // > [Model(name: "thingy")]
})
```

#### Model::update(object) => Promise(Model)
updates the model with the given values
```js
var thingy = yield Model.find("cie8v0vuc00003c592wyxj706")
var stuff = yield thingy.update({name: "stuff"})
```

#### Model::save() =>  Promise(Model)
updates or creates the model
```js
var thingy = new Model({name: "thingy"})

thingy.save()
  .then(thingy => {
    /* thingy was created */
    thingy.awesome = true
    return thingy.save()
  })
  .then(thingy => {
    /* thingy was updated */
    console.log(thingy.awesome) // > true
  })
```
#### Model::destroy() =>  Promise(Model)
deletes the model
```js
thingy.destroy().then(model => {
  // model is destroyed
})
```
