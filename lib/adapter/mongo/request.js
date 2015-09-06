module.exports = function (object, method, args=[]) {
  return new Promise((resolve, reject)=> {
    object[method].apply(object, args.concat([(error, data) => {
      return error ? reject(error) : resolve(data)
    }]))
  })
}
