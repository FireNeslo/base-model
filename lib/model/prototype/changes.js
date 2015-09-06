import diff from "../../utils/diff"
import serialize from "./serialize"

export default [...serialize, {
  changed() {
    var previous = this.__value__
    var current = this.__value__ = this.toJSON()
    return diff(previous, current)
  },
  isChanged(property) {
    if(property) {
      return this.__value__[property] !== this[property]
    }
    return Object.keys(this.changed()).length > 0
  },
  get isPersisted() {
    return !this.isChanged('id')
  }
}]
