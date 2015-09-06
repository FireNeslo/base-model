function wrap(options, deferred) {
  Object.keys(options||{}).forEach(option => {
    if(typeof options[option] !== 'function') return
    var handler = options[option]
    options[option] = function callback(event) {
      return handler(event.target.result, deferred)
    }
  })
  return options
}

module.exports = function (model, request, options) {
  return new Promise((resolve, onerror) => {
    var deferred = {onsuccess, onerror}
    function onsuccess(event) {
      resolve(event.target ? event.target.result : event)
    }
    Object.assign(request, deferred, wrap(options, deferred))
  })
}
