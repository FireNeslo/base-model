import Query from "../query"
import {fetch, where} from "../utils/search"

export default [{
  find(id) {
    return fetch(this, id)
  },
  where(query) {
    return Query.create(query => where(this, query)).where(query)
  }
}]
