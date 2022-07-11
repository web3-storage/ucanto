import * as API from './type.js'
import * as Digest from 'multiformats/hashes/digest'

/**
 * @template {string} Name
 * @template {number} Code
 * @param {object} options
 * @param {Name} options.name
 * @param {Code} options.code
 * @param {{create: () => API.RawHasher}} options.hasher
 */

export const derive = ({ name, code, hasher }) => {
  /**
   * @returns {API.StreamingHasher<Code>}
   */
  const create = () => new StreamingHasher(code, hasher.create())

  /**
   * @param {API.AwaitIterable<Uint8Array>} stream
   */
  const digestStream = async (stream) => {
    const hash = hasher.create()
    for await (const chunk of stream) {
      hash.update(chunk)
    }
    return Digest.create(code, hash.digest())
  }

  return { name, code, create, digestStream }
}

/**
 * @template {number} Code
 * @implements {API.StreamingHasher<Code>}
 */
class StreamingHasher {
  /**
   * @param {Code} code
   * @param {API.RawHasher} hasher
   */
  constructor(code, hasher) {
    this.code = code
    this.hasher = hasher
  }
  /**
   * @param {Uint8Array} bytes
   */
  write(bytes) {
    this.hasher.update(bytes)
    return this
  }
  close() {
    return Digest.create(this.code, this.hasher.digest())
  }
}
