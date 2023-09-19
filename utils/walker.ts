export function walker(obj: Record<string | number, unknown>, reachRate: number = 1) {
  const keys = shuffle(Object.keys(obj))

  keys.slice(0, Math.floor(keys.length * reachRate)).forEach((key) => {
    const value = obj[key]
    if (typeof value === 'object') {
      walker(value as Record<string | number, unknown>, reachRate)
    }
  })
}

function shuffle<T extends unknown>(arr: T[]) {
  let n = arr.length,
    random
  while (0 != n) {
    random = (Math.random() * n--) >>> 0
    ;[arr[n], arr[random]] = [arr[random], arr[n]]
  }
  return arr
}
