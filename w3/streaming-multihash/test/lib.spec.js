import { test, assert } from './test.js'

import * as sha256 from '../src/sha256.js'
import * as sha512 from '../src/sha512.js'
import { sha256 as msha256, sha512 as msha512 } from 'multiformats/hashes/sha2'
const utf8 = new TextEncoder()

test('sha256', async () => {
  const bytes = utf8.encode('hello world! I hope it will by sunny today.')
  const hash = sha256.create()
  let offset = 0
  while (offset < bytes.length) {
    hash.write(bytes.slice(offset, offset + 10))
    offset += 10
  }
  const digest = await hash.close()

  assert.deepEqual(digest, await msha256.digest(bytes))
})

test('sha256.digestStream', async () => {
  const bytes = utf8.encode('hello world! I hope it will by sunny today.')
  assert.deepEqual(
    await sha256.digestStream(iterate(bytes)),
    await msha256.digest(bytes)
  )

  assert.deepEqual(
    await sha256.digestStream(asyncInterate(bytes)),
    await msha256.digest(bytes)
  )
})

test('sha512', async () => {
  const bytes = utf8.encode('hello world! I hope it will by sunny today.')
  const hash = sha512.create()
  let offset = 0
  while (offset < bytes.length) {
    hash.write(bytes.slice(offset, offset + 10))
    offset += 10
  }
  const digest = await hash.close()

  assert.deepEqual(digest, await msha512.digest(bytes))
})

test('sha256.digestStream', async () => {
  const bytes = utf8.encode('hello world! I hope it will by sunny today.')
  assert.deepEqual(
    await sha512.digestStream(iterate(bytes)),
    await msha512.digest(bytes)
  )

  assert.deepEqual(
    await sha512.digestStream(asyncInterate(bytes)),
    await msha512.digest(bytes)
  )
})

/**
 * @param {Uint8Array} bytes
 */
function* iterate(bytes, byteOffset = 0) {
  while (byteOffset < bytes.length) {
    yield bytes.slice(byteOffset, byteOffset + 10)
    byteOffset += 10
  }
}

/**
 * @param {Uint8Array} bytes
 */
async function* asyncInterate(bytes, byteOffset = 0) {
  for (const chunk of iterate(bytes, byteOffset)) {
    yield chunk
  }
}
