var parse = require('minimongo/src/selector').compileDocumentSelector

module.exports = function destroy(id) {
  return this.traverse(parse({[this.primaryKey]: id}), 'delete');
}
