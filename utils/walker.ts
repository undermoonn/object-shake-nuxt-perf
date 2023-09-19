export function walker(obj: object, reachRate: number = 0.8) {
  const keys = Object.keys(obj)

  // TODO: random
  keys.slice(0, Math.floor(keys.length * reachRate)).forEach((key) => {
    const value = obj[key]
    if (typeof value === 'object') {
      walker(value, reachRate)
    }
  })
}
