export default [{
  new(model) {
    return new this(model)
  },
  create(model) {
    return this.new(model).save()
  }
}]
