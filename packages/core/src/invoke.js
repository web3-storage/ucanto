import * as API from '@ucanto/interface'
import * as DID from '@ipld/dag-ucan/did'
import * as Invocation from './invocation.js'
import * as Delegation from './delegation.js'
import * as Signature from '@ipld/dag-ucan/signature'
import * as DAG from './dag.js'
import * as CBOR from './cbor.js'
import { sha256 } from 'multiformats/hashes/sha2'

/**
 * Represents an Invocation builder that can be used to construct an invocation
 * that allows us to defer signing and encoding as needed.
 *
 * @template {API.InstructionModel} Run
 * @template {API.SigAlg} SigAlg
 * @template {API.Link<API.ReceiptModel>|API.Receipt} Receipt
 */
class InvocationBuilder {
  /**
   * @param {object} options
   * @param {API.Signer<API.DID, SigAlg>} options.issuer
   * @param {Run} options.run
   * @param {API.Meta} [options.meta]
   * @param {API.Proof[]} [options.proofs]
   * @param {Receipt} [options.cause]
   */
  constructor({ issuer, run, cause, meta = {}, proofs = [] }) {
    this.issuer = issuer
    this.run = run
    this.cause = cause || null
    this.meta = meta
    this.proofs = proofs
  }
  async buildIPLDView({ hasher = sha256, codec = CBOR } = {}) {
    const { meta, proofs, run, issuer, cause } = this
    const store = DAG.createStore()

    const instruction = await codec.write(run)
    DAG.addInto(instruction, store)

    const prf = []
    // copy blocks from proofs into the store
    for (const proof of proofs) {
      DAG.addEveryInto(DAG.iterate(proof), store)
      prf.push(proof.link())
    }

    // copy blocks from the receipt into the store
    DAG.addEveryInto(DAG.iterate(cause), store)

    /** @type {API.TaskModel} */
    const task = {
      run: instruction.cid,
      meta,
      prf,
      ...(cause ? { cause: cause.link() } : {}),
    }

    const { cid } = await codec.write(task)
    const auth = await codec.write(await authorize({ issuer, scope: [cid] }))
    DAG.addInto(auth, store)

    const invocation = { task, auth: auth.cid }
    /** @type {API.Block<API.InvocationModel>} */
    const root = await codec.write(invocation)
    DAG.addInto(root, store)

    return new Invocation({
      root: { ...root, data: invocation },
      store,
    })
  }
}

class Invocation {
  /**
   * @param {object} input
   * @param {Required<API.Block<API.InvocationModel>>} input.root
   * @param {DAG.BlockStore} input.store
   */
  constructor({ root, store }) {
    this.root = root
    this.store = store
  }
  get task() {
    return this.root.data.task
  }
  get auth() {
    const { cid, bytes } = DAG.get(this.root.data.auth, this.store)
    const data = CBOR.decode(bytes)
    return new Auth({ root: { cid, bytes, data }, store: this.store })
  }
}

/**
 * @template {API.InstructionModel} Run
 * @implements {API.Task<Run>}
 */
export class Task {
  /**
   * @param {object} input
   * @param {API.TaskModel<Run>} input.data
   * @param {DAG.BlockStore} input.store
   */
  constructor({ data, store }) {
    this.data = data
    this.store = store
  }

  get run() {
    return this.data.run
  }
  get meta() {
    return this.data.meta
  }
  get prf() {
    return this.data.prf
  }

  get proofs() {
    if (this._proofs) {
      return this._proofs
    } else {
      /** @type {API.Proof[]} */
      const proofs = []
      const { store } = this
      // Iterate over proof links and materialize Delegation views.
      for (const link of this.prf) {
        const proof = Delegation.view({ root: link, blocks: store }, link)
        proofs.push(proof)
      }

      // we cache result of this computation as this property may get accessed
      // more than once.
      this._proofs = proofs
      return proofs
    }
  }

  get instruction() {
    /** @type {API.Block<Run>|null} */
    const block = DAG.get(this.run, this.store, null)
    if (block === null) {
      return this.run
    } else {
      return new Instruction({
        root: {
          ...block,
          data: CBOR.decode(block.bytes),
        },
        store: this.store,
      })
    }
  }
}

/**
 * @template {API.Ability} Op
 * @template {API.Resource} URI
 * @template {Record<string, unknown>} Input
 * @implements {API.Instruction<Op, URI, Input>}
 */
export class Instruction {
  /**
   * @param {object} input
   * @param {Required<API.Block<API.InstructionModel<Op, URI, Input>>>} input.root
   * @param {DAG.BlockStore} input.store
   */
  constructor({ root, store }) {
    this.root = root
    this.store = store
  }
  link() {
    return this.root.cid
  }

  *iterateIPLDBlocks() {
    yield this.root
  }
  /**
   * @type {Op}
   */
  get op() {
    return this.root.data.op
  }
  get rsc() {
    return this.root.data.rsc
  }
  /**
   * @type {Input}
   */
  get input() {
    return this.root.data.input
  }
  get nnc() {
    return this.root.data.nnc
  }

  get nonce() {
    return this.root.data.nnc
  }
}

class Auth {
  /**
   * @param {object} input
   * @param {Required<API.Block<API.AuthorizationModel>>} input.root
   * @param {DAG.BlockStore} input.store
   */
  constructor({ root, store }) {
    this.root = root
    this.store = store
  }
  get scope() {
    return this.root.data.scope
  }
  get s() {
    return this.root.data.s
  }
}

/**
 * @template {API.SigAlg} SigAlg
 * @param {object} options
 * @param {API.Signer<API.DID, SigAlg>} options.issuer
 * @param {API.Link[]} options.scope
 * @returns {Promise<API.AuthorizationModel<SigAlg>>}
 */
const authorize = async ({ issuer, ...source }) => {
  const scope = source.scope.sort((a, b) =>
    a.toString().localeCompare(b.toString())
  )

  return {
    scope,
    s: await issuer.sign(CBOR.encode(scope)),
  }
}
