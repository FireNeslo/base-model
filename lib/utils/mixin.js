export default (target, ...sources) => {
  var mixins = []

  for(var source of sources) {
    if(mixins.indexOf(source) > -1) continue
    for(var property of Object.getOwnPropertyNames(source)) {
      Object.defineProperty(target, property,
        Object.getOwnPropertyDescriptor(source, property))
    }
    mixins.push(source)
  }
  return target
}
