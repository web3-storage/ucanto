import * as UCAN from '@ipld/dag-ucan'
import * as API from '@ucanto/interface'
import * as Link from './link.js'

/**
 * @deprecated
 * Import `isLink` from module directly
 */
export const isLink =
  /** @type {(value:API.Proof) => value is API.LinkedProof} */
  (Link.isLink)

/**
 *
 * @param {API.Proof} proof
 * @return {proof is API.Delegation}
 */
export const isDelegation = (proof) => !Link.isLink(proof)

/**
 * Represents UCAN chain view over the set of DAG UCAN nodes. You can think of
 * this as UCAN interface of the CAR.
 *
 * @template {[API.Capability, ...API.Capability[]]} C
 * @implements {API.Delegation<C>}
 * @extends {DelegationView<C>}
 */
export class Delegation {
  /**
   * @param {API.Block<C>} root
   * @param {Map<string, API.Block>} [blocks]
   */
  constructor(root, blocks = new Map()) {
    this.root = root
    this.blocks = blocks

    Object.defineProperties(this, {
      blocks: {
        enumerable: false,
      },
    })
  }

  get version() {
    return this.data.version
  }
  get signature() {
    return this.data.signature
  }
  get cid() {
    return this.root.cid
  }
  get asCID() {
    return this.cid
  }
  get bytes() {
    return this.root.bytes
  }
  get data() {
    const data = decode(this.root)
    Object.defineProperties(this, { data: { value: data, enumerable: false } })
    return data
  }
  export() {
    return exportDAG(this.root, this.blocks)
  }

  /**
   * @type {API.Proof[]}
   */
  get proofs() {
    return proofs(this)
  }

  /**
   * @type {API.Identity}
   */
  get issuer() {
    return this.data.issuer
  }

  /**
   * @type {API.Identity}
   */
  get audience() {
    return this.data.audience
  }

  /**
   * @returns {C}
   */
  get capabilities() {
    return /** @type {C} */ (this.data.capabilities)
  }

  /**
   * @returns {number}
   */
  get expiration() {
    return this.data.expiration
  }

  /**
   * @returns {undefined|number}
   */
  get notBefore() {
    return this.data.notBefore
  }

  /**
   * @returns {undefined|string}
   */

  get nonce() {
    return this.data.nonce
  }

  /**
   * @returns {API.Fact[]}
   */
  get facts() {
    return this.data.facts
  }

  /**
   * Iterate over the proofs
   *
   * @returns {IterableIterator<API.Delegation>}
   */
  *iterate() {
    return it(this)
  }
}

/**
 * @param {API.Delegation} delegation
 * @returns {IterableIterator<API.Delegation>}
 */
const it = function* (delegation) {
  for (const proof of delegation.proofs) {
    if (isDelegation(proof)) {
      yield* it(proof)
      yield proof
    }
  }
}

const decodeCache = new WeakMap()
/**
 * @template {[API.Capability, ...API.Capability[]]} C
 * @param {API.Block<C>} block
 * @returns {UCAN.View<C[number]>}
 */
const decode = ({ bytes }) => {
  const data = decodeCache.get(bytes)
  if (!data) {
    const data = UCAN.decode(bytes)
    decodeCache.set(bytes, data)
    return data
  }
  return data
}

/**
 * Creates a new signed token with a given `options.issuer`. If expiration is
 * not set it defaults to 30 seconds from now. Returns UCAN in primary - IPLD
 * representation.
 *
 * @template {number} A
 * @template {[API.Capability, ...API.Capability[]]} C
 * @param {API.DelegationOptions<C, A>} data
 * @param {API.EncodeOptions} [options]
 * @returns {Promise<API.Delegation<C>>}
 */

export const delegate = async (
  { issuer, audience, proofs = [], ...input },
  options
) => {
  const links = []
  const blocks = new Map()
  for (const proof of proofs) {
    if (!isDelegation(proof)) {
      links.push(proof)
    } else {
      links.push(proof.cid)
      for (const block of proof.export()) {
        blocks.set(block.cid.toString(), block)
      }
    }
  }

  const data = await UCAN.issue({
    ...input,
    issuer,
    audience,
    proofs: links,
  })
  const { cid, bytes } = await UCAN.write(data, options)
  decodeCache.set(cid, data)

  /** @type {API.Delegation<C>} */
  const delegation = new Delegation({ cid, bytes }, blocks)
  Object.defineProperties(delegation, { proofs: { value: proofs } })

  return delegation
}

/**
 * @template {[API.Capability, ...API.Capability[]]} C
 * @param {API.Block<C>} root
 * @param {Map<string, API.Block>} blocks
 * @returns {IterableIterator<API.Block>}
 */

const exportDAG = function* (root, blocks) {
  for (const link of decode(root).proofs) {
    // Check if block is included in this delegation
    const root = blocks.get(link.toString())
    if (root) {
      yield* exportDAG(root, blocks)
    }
  }

  yield root
}

/**
 * @template {[API.Capability, ...API.Capability[]]} C
 * @param {Iterable<API.Block & { data?: UCAN.UCAN }>} dag
 * @returns {API.Delegation<C>}
 */
export const importDAG = (dag) => {
  /** @type {Array<[string, API.Block]>} */
  let entries = []
  for (const block of dag) {
    entries.push([block.cid.toString(), block])
  }

  const last = entries.pop()
  if (!last) {
    throw new RangeError('Empty DAG can not be turned into a dalagetion')
  } else {
    const [, root] = last

    return new Delegation(/** @type {API.Block<C>} */ (root), new Map(entries))
  }
}

/**
 * @template {[API.Capability, ...API.Capability[]]} C
 * @param {object} dag
 * @param {API.Block<C>} dag.root
 * @param {Map<string, API.Block>} [dag.blocks]
 * @returns {API.Delegation<C>}
 */
export const create = ({ root, blocks }) => new Delegation(root, blocks)

/**
 * @param {API.Delegation} delegation
 */
const proofs = (delegation) => {
  /** @type {API.Proof[]} */
  const proofs = []
  const { root, blocks } = delegation
  // Iterate over proof links and materialize Delegation views.
  for (const link of decode(root).proofs) {
    // Check if linked proof is included in our blocks if so create delegation
    // view otherwise use a link
    const root = blocks.get(link.toString())
    proofs.push(root ? create({ root, blocks }) : link)
  }

  // we cache result of this computation as this property may get accessed
  // more than once.
  Object.defineProperty(delegation, 'proofs', { value: proofs })
  return proofs
}

export { exportDAG as export, importDAG as import, Delegation as View }
