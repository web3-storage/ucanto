import * as API from '@ucanto/interface'
import * as UTF8 from './utf8.js'
import { Delegation, isLink, UCAN } from '@ucanto/core'

const HEADER_PREFIX = 'x-auth-'

const HEADERS = Object.freeze({
  'content-type': 'application/json',
})

/**
 * Encodes invocation batch into an HTTPRequest.
 *
 * @template {API.Tuple<API.IssuedInvocation>} I
 * @param {I} batch
 * @returns {Promise<API.HTTPRequest<I>>}
 */
export const encode = async (batch) => {
  /** @type {Record<string, string>} */
  const headers = { ...HEADERS }
  /** @type {string[]} */
  const body = []
  for (const invocation of batch) {
    const delegation = await Delegation.delegate(invocation)

    body.push(`${delegation.cid}`)
    for (const proof of iterate(delegation)) {
      headers[`${HEADER_PREFIX}${proof.cid}`] = UCAN.format(proof.data)
    }
    headers[`${HEADER_PREFIX}${delegation.cid}`] = UCAN.format(delegation.data)
  }

  return {
    headers,
    body: UTF8.encode(JSON.stringify(body)),
  }
}

/**
 * @param {API.Delegation} delegation
 * @return {IterableIterator<API.Delegation>}
 */
const iterate = function* (delegation) {
  for (const proof of delegation.proofs) {
    if (!Delegation.isLink(proof)) {
      yield* iterate(proof)
      yield proof
    }
  }
}

/**
 * Decodes HTTPRequest to an invocation batch.
 *
 * @template {API.Tuple<API.IssuedInvocation>} I
 * @param {API.HTTPRequest<I>} request
 * @returns {Promise<API.InferInvocations<I>>}
 */
export const decode = async ({ headers, body }) => {
  const contentType = headers['content-type'] || headers['Content-Type']
  if (contentType !== 'application/json') {
    throw TypeError(
      `Only 'content-type: application/json' is supported, instead got '${contentType}'`
    )
  }
  /** @type {API.Block[]} */
  const invocations = []
  const blocks = new Map()
  for (const [name, value] of Object.entries(headers)) {
    if (name.startsWith(HEADER_PREFIX)) {
      const key = name.slice(HEADER_PREFIX.length)
      const data = UCAN.parse(/** @type {UCAN.JWT<any>} */ (value))
      const { cid, bytes } = await UCAN.write(data)

      if (cid.toString() != key) {
        throw TypeError(
          `Invalid request, proof with key ${key} has mismatching cid ${cid}`
        )
      }
      blocks.set(cid.toString(), { cid, bytes })
    }
  }

  for (const cid of JSON.parse(UTF8.decode(body))) {
    const root = blocks.get(cid.toString())
    if (!root) {
      throw TypeError(
        `Invalid request proof of invocation ${cid} is not provided`
      )
    } else {
      invocations.push(Delegation.create({ root, blocks }))
      blocks.delete(cid.toString())
    }
  }

  return /** @type {API.InferInvocations<I>} */ (invocations)
}
