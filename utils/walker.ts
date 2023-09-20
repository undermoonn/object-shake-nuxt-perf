export function walker(obj: Record<string | number, unknown>, reachRate: number = 1) {
  const keys = Object.keys(obj)

  keys.slice(0, Math.floor(keys.length * reachRate)).forEach((key) => {
    const value = obj[key]
    if (typeof value === 'object') {
      walker(value as Record<string | number, unknown>, reachRate)
    }
  })
}
