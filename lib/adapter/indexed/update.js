var parse = require('minimongo/src/selector').compileDocumentSelector

module.exports = function update(id, data) {
  return this.traverse(parse({[this.primaryKey]: id}), data);
}
