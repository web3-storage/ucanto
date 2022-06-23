import { Miniflare } from 'miniflare'
import anyTest from 'ava'
import { SigningAuthority } from '@ucanto/authority'
import * as UCAN from '@ipld/dag-ucan'
import * as HTTP from '@ucanto/transport/http'
import * as Client from '@ucanto/client'
import { client } from '../../src/client.js'

/**
 * @typedef {import("ava").TestFn<{mf: mf}>} TestFn
 */

// eslint-disable-next-line unicorn/prefer-export-from
export const test = /** @type {TestFn} */ (anyTest)

export const bindings = {
  PRIVATE_KEY:
    'MgCbk99i7qW552YrG6ioSXEzqGbYTBDpTkLjOoTN0ZK0+N+0Bww4KEBX+SQR2c91VAj/KeXR1pQU36k1yoIBqTsmT+D8=',
}

export const mf = new Miniflare({
  packagePath: true,
  wranglerConfigPath: true,
  sourceMap: true,
  bindings,
  // log: new Log(LogLevel.DEBUG),
})

export const serviceAuthority = SigningAuthority.parse(bindings.PRIVATE_KEY)

/**
 * @param {UCAN.UCAN<UCAN.Capability<UCAN.Ability, `${string}:${string}`>>} ucan
 */
export async function send(ucan) {
  return mf.dispatchFetch('http://localhost:8787', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UCAN.format(ucan)}`,
    },
  })
}

export function channel() {
  return HTTP.open({
    url: new URL('http://localhost:8787'),
    fetch: mf.dispatchFetch,
    method: 'POST',
  })
}

/**
 * @typedef {import('../../src/index.js').Service } Service
 *
 *
 * @returns {Client.Connection<Service>}
 */
export function connection() {
  return Client.connect({
    encoder: client,
    decoder: client,
    channel: channel(),
  })
}
