// @ts-ignore

import * as API from '@ucanto/interface'
import * as DID from '@ipld/dag-ucan/did'
import * as Invocation from './invocation.js'
import * as Delegation from './delegation.js'
import * as Signature from '@ipld/dag-ucan/signature'
import * as DAG from './dag.js'
import * as CBOR from './cbor.js'
import * as Schema from './schema.js'
import { sha256 } from 'multiformats/hashes/sha2'
import { parseLink } from './lib.js'

const instruction = Schema.struct({
  rsc: Schema.string(),
  op: Schema.string(),
  input: Schema.dictionary({
    key: Schema.string(),
    value: Schema.unknown(),
  }),
  nnc: Schema.string(),
})

const effects = Schema.struct({
  fork: instruction.link().array(),
  join: instruction.link().optional(),
})

const receipt = Schema.struct({
  /**
   * @type {API.Reader<API.Link>}
   */
  get ran() {
    return invocation.link()
  },
  out: Schema.variant({
    ok: Schema.unknown(),
    error: Schema.unknown(),
  }),
  fx: effects,
})

const task = Schema.struct({
  run: instruction.link(),
  meta: Schema.dictionary({
    key: Schema.string(),
    value: Schema.unknown(),
  }),
  prf: Schema.unknown().link().array(),

  cause: receipt.link().optional(),
})

const auth = Schema.struct({
  scope: Schema.unknown().link().array(),
  s: Schema.unknown(),
})

const invocation = Schema.struct({
  task,
  auth: auth.link(),
})

const view = invocation.toIPLDView({
  link: parseLink('bakfaa'),
  store: new Map(),
})

const auth1 = auth.toIPLDBuilder({
  scope: [parseLink('bakfaa')],
  s: new Uint8Array(),
})

const demo = async () => {
  invocation.toIPLDBuilder({
    auth: (await auth1.buildIPLDView()).link(),
    task: await task
      .toIPLDBuilder({
        run: parseLink('bakfaa'),
        meta: {},
        prf: [parseLink('bakfaa')],
      })
      .buildIPLDView(),
  })
}
