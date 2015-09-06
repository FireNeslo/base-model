export default function diff(current, value, changes = {}) {
  for(var key of Object.keys(value)) {
    if(value[key] !== current[key]) {
      changes[key] = value[key]
    }
  }
  return changes
}
