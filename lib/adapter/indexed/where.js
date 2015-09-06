var parse = require('minimongo/src/selector').compileDocumentSelector


module.exports = function where(query) {
  return this.traverse(parse(query));
}
