require('babel/register')
require('./app').listen(3000, function() {
  console.log('listening on port 3000')
})
