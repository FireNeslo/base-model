import {EventEmitter} from "events"
import {clone, merge, isArray, isString} from "lodash"

var COMPUTE = ["$mod", "$regex", "$text", "$where","$elemMatch", "$meta", "$"]
var COMPARE = ["$eq", "$gt", "$gte", "$lt", "$lte", "$ne", "$in", "$nin"]
var SPATIAL = ["$geoWithin", "$geoIntersects", "$near", "$nearSphere"]
var COLLECT = ["$all", "$elemMatch", "$size", "$slice", "$exists", "$type"]
var LOGICAL = ["$or", "$and", "$not", "$nor"]

var REGULAR = COMPARE.concat(SPATIAL).concat(COLLECT)
var SPECIAL = LOGICAL.concat(COMPUTE)

export default class Query extends EventEmitter {
  static create(execute) {
    return new Query({execute})
  }
  constructor({context, parent, execute}, query={}) {
    super()
    this.query = query
    this.context = context
    this.execute = execute
  }
  $append(query) {
    query = merge(clone(this.query, true), query, (a, b) => {
      if(isArray(a)) return a.concat(b)
    })
    return new Query(this, query)
  }
  where(query, value) {
    if(value) {
      return this.$append({[query]: value})
    }
    return isString(query) ? (this.context=query, this) : this.$append(query)
  }
  or(query) {
    var condition = new Query(this).where(query)
    condition.parent = condition
    return this.$append({$or: [condition]})
  }
  then(cb, eb, pb) {
    return this.execute(this.query).then(cb, eb, pb)
  }
  catch(eb) {
    return this.then(null, eb)
  }
}

REGULAR.forEach(operator => {
  Query.prototype[operator.slice(1)] = function compare(value) {
    return this.$append({[this.context]: {[operator]: value}})
  }
})
