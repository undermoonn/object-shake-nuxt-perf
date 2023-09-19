import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

// name it, such as nested-object nested-object-array nested-object-array-string
const filename = ''

if (!filename) {
  throw Error('filename required')
}

fs.writeFileSync(
  path.resolve(dirname, `${filename}.json`),
  JSON.stringify(fakeObject({ counts: 6, deep: 6 }), null, 2)
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

function fakeObject({ counts, deep }) {
  if (typeof counts !== 'number' || typeof deep !== 'number') {
    throw Error('`counts` & `deep` should be number')
  }
  const obj = {}
  for (let i = 0; i < counts; i++) {
    // TODO: more value types
    obj[fakeString(5)] =
      deep > 1 ? fakeObject({ counts, deep: deep - 1 }) : fakeString(randomInt(100))
  }
  return obj
}
