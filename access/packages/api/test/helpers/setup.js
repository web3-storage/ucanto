import * as UCAN from '@ipld/dag-ucan'
import { SigningAuthority } from '@ucanto/authority'
import * as Client from '@ucanto/client'
import * as CAR from '@ucanto/transport/car'
import * as CBOR from '@ucanto/transport/cbor'
import * as HTTP from '@ucanto/transport/http'
import anyTest from 'ava'
import { Miniflare } from 'miniflare'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

dotenv.config({
  path: path.join(__dirname, '..', '..', '..', '..', '.env'),
})
/**
 * @typedef {import("ava").TestFn<{mf: mf}>} TestFn
 */

// eslint-disable-next-line unicorn/prefer-export-from
export const test = /** @type {TestFn} */ (anyTest)

export const bindings = {
  ENV: 'test',
  DEBUG: 'false',
  PRIVATE_KEY: process.env.PRIVATE_KEY || '',
  POSTMARK_TOKEN: process.env.POSTMARK_TOKEN || '',
  SENTRY_DSN: process.env.SENTRY_DSN || '',
}

export const mf = new Miniflare({
  packagePath: true,
  wranglerConfigPath: true,
  sourceMap: true,
  bindings,
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
    fetch: mf.dispatchFetch.bind(mf),
    method: 'POST',
  })
}

/**
 * @typedef {ReturnType<import('../../src/ucanto/service')['service']> } Service
 *
 *
 * @returns {Client.ConnectionView<Service>}
 */
export function connection() {
  return Client.connect({
    encoder: CAR,
    decoder: CBOR,
    channel: channel(),
  })
}
