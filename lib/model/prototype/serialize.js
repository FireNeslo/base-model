import identity from "./identity"

export default [...identity, {
  toJSON() {
    var json = Object.assign({[this.config.primaryKey]: this.id}, this)
    if(this.config.primaryKey == 'id') delete json._id
    delete json.__value__
    return json
  }
}]
