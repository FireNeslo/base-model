export default  [{
  get config() {
    return this.constructor.config
  },
  get collection() {
    return this.config.collection
  }
}]
