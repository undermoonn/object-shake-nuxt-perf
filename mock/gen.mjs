import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// name it, nested-object or nested-object-array
const filename = undefined

// true of false
const enableArray = undefined

if (typeof filename === 'undefined' || typeof enableArray === 'undefined') {
  throw Error('filename & enableArray required')
}

fs.writeFileSync(
  path.resolve(dirname, `${filename}.json`),
  JSON.stringify(fakeObject({ counts: 6, deep: 6, enableArray }), null, 2)
)

// ------------------------------------------------------------

function randomInt(length) {
  return Math.floor(Math.random() * length)
}

function fakeString(length = 5) {
  let res = ''
  for (let i = 0; i < length; i++) {
    res = res + String.fromCharCode('a'.charCodeAt(0) + randomInt(24))
  }
  return res
}

function randomBoolean() {
  return randomInt(10) >= 5
}

function fakeObject({ counts, deep, enableArray }) {
  if (typeof counts !== 'number' || typeof deep !== 'number') {
    throw Error('`counts` & `deep` should be number')
  }
  const obj = {}
  for (let i = 0; i < counts; i++) {
    let value

    if (enableArray && randomBoolean()) {
      value = []
      for (let arrI = 0; arrI < counts; arrI++) {
        value.push(fakeObject({ counts, deep: 1 }))
      }
    } else {
      obj[fakeString(5)] =
        deep > 1 ? fakeObject({ counts, deep: deep - 1, enableArray }) : fakeString(randomInt(100))
    }

    obj[fakeString(5)] = value
  }
  return obj
}
