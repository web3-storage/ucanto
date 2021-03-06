import { test, assert } from './test.js'
import * as HTTP from '../src/http.js'
import * as UTF8 from '../src/utf8.js'

import { CAR, JWT, CBOR } from '../src/lib.js'
test('encode / decode', async () => {
  const channel = HTTP.open({
    url: new URL('about:blank'),
    fetch: async (url, init) => {
      assert.equal(url.toString(), 'about:blank')
      assert.equal(init?.method, 'POST')
      return {
        ok: true,
        arrayBuffer: () => UTF8.encode('pong').buffer,
        headers: new Map([['content-type', 'text/plain']]),
      }
    },
  })

  const response = await channel.request({
    headers: { 'content-type': 'text/plain' },
    body: UTF8.encode('ping'),
  })

  assert.deepEqual(response, {
    headers: { 'content-type': 'text/plain' },
    body: UTF8.encode('pong'),
  })
})

if (!globalThis.fetch) {
  test('requires fetch in node', () => {
    assert.throws(
      () => HTTP.open({ url: new URL('https://ucan.xyz') }),
      /Try passing in a \`fetch\`/
    )
  })
}

test('faild request', async () => {
  const channel = HTTP.open({
    url: new URL('https://ucan.xyz/'),
    fetch: async (url, init) => {
      return {
        ok: false,
        status: 404,
        statusText: 'Not Found',
        url,
        arrayBuffer: () => UTF8.encode('pong').buffer,
        headers: new Map([['content-type', 'text/plain']]),
      }
    },
  })

  try {
    await channel.request({
      headers: { 'content-type': 'text/plain' },
      body: UTF8.encode('ping'),
    })
    assert.fail('expected to throw')
  } catch (reason) {
    const error = /** @type {any} */ (reason)
    assert.match(String(error), /HTTPError/)
    assert.equal(error.name, 'HTTPError')
    assert.equal(error.status, 404)
    assert.equal(error.statusText, 'Not Found')
    assert.equal(error.url, 'https://ucan.xyz/')
  }
})
