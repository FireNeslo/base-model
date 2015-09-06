module.exports = function ajaxGetAsync(url, options={}) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.addEventListener("error", reject);
    xhr.addEventListener("load", function(event) {
      if(event.target.status.toString().indexOf('2') === 0) {
        resolve(JSON.parse(event.target.response))
      } else {
        reject(JSON.parse(event.target.response))
      }
    });
    xhr.open(options.method || (options.data ? 'post': 'get'), url);
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.setRequestHeader('Accept', 'application/json')
    for(var header in (options.headers || {})) {
      if(typeof options.headers[header] === 'string') {
        request.setRequestHeader("header", options.headers[header]);
      }
    }
    xhr.send(options.body || null);
  })
  .catch(error => {
    console.error(error.stack || error)
    throw error 
  })
}
