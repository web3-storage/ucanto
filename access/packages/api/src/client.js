// eslint-disable-next-line no-unused-vars
import * as Types from '@ucanto/interface'
import { HTTPError } from './utils/errors.js'
import * as UCAN from '@ipld/dag-ucan'
import { Delegation, isDelegation, isLink } from '@ucanto/core'
import { UTF8 } from '@ucanto/transport'

const HEADERS = Object.freeze({
  'content-type': 'application/json',
})

/**
 *
 * @implements {Types.RequestDecoder}
 * @implements {Types.ResponseEncoder}
 */
export class BaseRequestTransport {
  /**
   * @template {Types.Tuple<Types.IssuedInvocation>} I
   * @param {Types.HTTPRequest<I>} request
   */
  async decode({ body, headers }) {
    const bearer = headers.authorization || ''
    if (!bearer.toLowerCase().startsWith('bearer ')) {
      HTTPError.throw('bearer missing.', 400)
    }

    const jwt = bearer.slice(7)
    const invocations = []
    try {
      const data = UCAN.parse(/** @type {UCAN.JWT<any>} */ (jwt))
      const root = await UCAN.write(data)

      invocations.push(Delegation.create({ root }))
      return /** @type {Types.InferInvocations<I>} */ (invocations)
    } catch (error) {
      HTTPError.throw(/** @type {Error} */ (error).message, 400)
    }
  }

  /**
   *
   * @template I
   * @param {I} result
   * @returns {Types.HTTPResponse<I>}
   */
  encode(result) {
    return {
      headers: HEADERS,
      body: UTF8.encode(JSON.stringify(result)),
    }
  }
}

/** @type {import('./ucanto/types.js').ClientCodec} */
export const client = {
  async encode(invocations, options) {
    const headers = {}
    const chain = await Delegation.delegate(invocations[0])

    // TODO iterate over proofs and send them too
    // for (const ucan of chain.iterate()) {
    //   //
    // }
    headers.authorization = `bearer ${UCAN.format(chain.data)}`
  },

  decode(response) {},
}
