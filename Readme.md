# ucanto

(u)canto is a library for [UCAN][] based [RPC][] that provides:

1. A declarative system for defining capabilities (roughly equivalet of HTTP
   routes in REST).
1. A system for binding [capability][] handles (a.k.a providers) to form services with built-in routing.
1. UCAN validation system.
1. Runtime for executing UCAN capability [invocations][].
1. A pluggable transport layer.
1. Clien supporting batched invocations and full type inference.

> the name ucanto is a word play on UCAN and canto (one of the major divisions of a long poem)

## Quick sample

To get a taste of the libary we will build up a "filesystem" service, in which:

1. Top level paths are [did:key][] identifiers, here on referred as (user) drives.
1. Drives are owned by users holding a private key corresponding to the [did:key][] of the drive.
1. Drive owners could mutate filesystem with-in their drives path and delegate that ability to others.

### Capabilities

The very first thing we want to do is define set of capabilities our service will provide. Each (cap)[ability][] MUST:

1. Have a `can` field denoting an _action_ it can perform.
2. Have a `with` URI denoting _resource_ it can perform that action on.
3. Be comparable to other capabilities _(with set semantics, as in does capability `a` includes capability `b` ?)_

Lets define `file/link` capability, where resources are identified via `file:` URLs and MAY contain `link` to be mapped to a given path.

```ts
import { capability, URI, Link, Failure } from "@ucanto/server"

const Add = capability({
  can: "file/link",
  with: URI.match({ protocol: "file:" }),
  caveats: { link: Link },
  derives: (claimed, delegated) =>
    // Can be derived if claimed capability path is contained in the delegated
    // capability path.
    claimed.uri.href.startsWith(ensureTrailingDelimiter(delegated.uri.href)) ||
    new Failure(`Notebook ${claimed.uri} is not included in ${delegaed.uri}`),
})

const ensureTrailingDelimiter = uri => (uri.endsWith("/") ? uri : `${uri}/`)
```

> Please note that library gurantees that both `claimed` and `delegated` capabilty will have `{can: "file/link", with: string, uri: URL, caveats: { link?: CID }}`
> type inferred from the definition.
>
> We will explore more complicated case later where capability may be derived from a different capability or even a set.

### Services

Now that we have a `file/link` capability we can define a service providing it:

```ts
import { provide, Failure, MalformedCapability } from "@ucanto/server"

const service = (context: { store: Map<string, string> }) => {
  const add = provide(Add, ({ capability, invocation }) => {
    store.set(capability.uri.href, capability.caveats.link)
    return {
      with: capability.with,
      link: capability.caveats.link,
    }
  })

  return { file: { add } }
}
```

Used `provide` building block will take care of associating a handler to the a
given capability and performing necessary UCAN validation steps when `add` is
invoked.

### Transport

The library provides a pluggable transport architecture so you can expose a service in various content encodings. To do so you have to provide:

1.  `decoder` that will take `{ headers: Record<string, string>, body: Uint8Array }` object and decode it into `{ invocations: Invocation[] }`.
2.  `encoder` that will take `unknown[]` (corresponding to values returned by handlers) and encode it into `{ headers: Record<string, string>, body: Uint8Array }`.

> Note that the actual encoder / decoder types are more complicated as they capture capability types, the number of invocations, and corresponding return types. This allows them to provide good type inference. But ignoring those details, that is what they are in a nutshell.

Library comes with several transport layer codecs you can pick from, but you can also bring one yourself. Below we will take invocations encoded in [CAR][] format and produce responses encoded in [DAG-CBOR][] format:

```ts
import * as Server from "@ucanto/server"
import * as CAR from "@ucanto/transport/car"
import * as CBOR from "@ucanto/transport/cbor"
import { SigningAuthority } from "@ucanto/authority"
import * as HTTP from "node:http"
import * as Buffer from "node:buffer"

export const server = (context { store = new Map() } : { store: Map<string, string> }) =>
  Server.create({
    id: await SigningAuthority.derive(process.env.SERVICE_SECRET),
    service: service(context),
    decoder: CAR,
    encoder: CBOR,

    // We tell server that capability can be self-issued by a drive owner
    canIssue: (capability, issuer) => {
      if (capability.uri.protocol === "file:") {
        const [did] = capability.uri.pathname.split("/")
        return did === issuer
      }
      return false
    },
  })
```

> Please note that server does not do HTTP as bindings may differ across runtimes, so it is up to you to plug one in.

In nodejs we could expose our service as follows:

```ts
export const listen = ({ port = 8080, context = new Map() }) => {
  const fileServer = server(context)

  HTTP.createServer(async (request, response) => {
    const chunks = []
    for await (const chunk of request) {
      chunks.push(chunk)
    }

    const { headers, body } = await fileServer.request({
      headers: request.headers,
      body: Buffer.concat(chunks),
    })

    response.writeHead(200, headers)
    response.write(body)
    response.end()
  }).listen(port)
}
```

## Client

Client can be used to issue and execute UCAN invocations. Here is an example of
invoking `file/link` capability we've defined earlier

```ts
import * as Client from "@ucanto/client"
import { SigningAuthority, Authority } from "@ucanto/authority"
import { CID } from "multiformats"

// Service will have a well known DID
const service = Authority.parse(process.env.SERVICE_ID)
// Client keypair
const issuer = SigningAuthority.parse(process.env.MY_KEPAIR)

const demo1 = async connection => {
  const me = await Client.invoke({
    issuer: alice,
    audience: service,
    capability: {
      can: "file/link",
      with: `file://${issuer.did()}/me/about`,
      link: CID.parse(process.env.ME_CID),
    },
  })

  const result = await me.execute(connection)
  if (result.error) {
    console.error("oops", result)
  } else {
    console.log("file got linked", result.link.toString())
  }
}
```

> Note that the client will get full type inference on when `connection` captures a type of the service on the other side of the wire.

### Connection

Just like the server, the client has a pluggable transport layer which you provide when you create a connection. We could create an in-process connection with our service simply by providing service as a channel:

```ts
const connection = Client.connect({
  encoder: Transport.CAR, // encode as CAR because server decods from car
  decoder: Transport.CBOR, // decode as CBOR because server encodes as CBOR
  channel: server(), // simply pass the server
})
```

In practice you probably would want client/server communication to happen across the wire, or at least across processes. You can bring your own transport channel, or choose an existing one. For example:

```ts
import * as HTTP from "@ucanto/transport/http"
import * as CAR from "@ucanto/transport/car"
import * as CBOR from "@ucanto/transport/cbor"

const connection = Client.connect({
  encoder: Transport.CAR, // encode as CAR because server decodes from car
  decoder: Transport.CBOR, // decode as CBOR because server encodes as CBOR
  /** @type {Transport.Channel<ReturnType<typeof service>>} */
  channel: Transport.HTTP.open({ url: new URL(process.env.SERVICE_URL) }),
})
```

> Note: That in the seconnd example you need to provide a type annotations, so that client can infer what capabilities can be invoked and what the return types it will correspond to.

### Batching & Proof chains

The library supports batch invocations and takes care of all the nitty gritty details when it comes to UCAN delegation chains, specifically taking chains apart to encode as blocks in CAR and putting them back together into a chain on the other side. All you need to do is provide a delegation in the proofs:

```ts
import { SigningAuthority, Authority } from "@ucanto/authority"
import * as Client from "@ucanto/client"
import { CID } from "multiformats"

const service = Authority.parse(process.env.SERVICE_DID)
const alice = SigningAuthority.parse(process.env.ALICE_KEYPAIR)
const bob = SigningAuthority.parse(process.env.BOB_KEYPAIR)

const demo2 = async connection => {
  // Alice delegates capability to mutate FS under bob's namespace
  const proof = await Client.delegate({
    issuer: alice,
    audience: bob.authority,
    capabilities: [
      {
        can: "file/link",
        with: `file://${alice.did()}/friends/${bob.did()}/`,
      },
    ],
  })

  const aboutBob = Client.invoke({
    issuer: bob,
    audience: service,
    capability: {
      can: "file/link",
      with: `file://${alice.did()}/friends/${bob.did()}/about`,
      link: CID.parse(process.env.BOB_CID),
    },
  })

  const aboutMallory = Client.invoke({
    issuer: bob,
    audience: service,
    capability: {
      can: "file/link",
      with: `file://${alice.did()}/friends/${MALLORY_DID}/about`,
      link: CID.parse(process.env.MALLORY_CID),
    },
  })

  const [bobResult, malloryResult] = connection.execute([
    aboutBob,
    aboutMallory,
  ])

  if (bobResult.error) {
    console.error("oops", r1)
  } else {
    console.log("about bob is linked", r1)
  }

  if (malloryResult.error) {
    console.log("oops", r2)
  } else {
    console.log("about mallory is linked", r2)
  }
}
```

> In the example above first invocation will succeed, but second will not becasue has not been granted capability to mutate other namespace. Also note that both invocations are send in a single request.

[ucan]: https://github.com/ucan-wg/spec/
[rpc]: https://en.wikipedia.org/wiki/Remote_procedure_call
[capability]: https://github.com/ucan-wg/spec/#23-capability
[invocations]: https://github.com/ucan-wg/spec/#28-invocation
[ability]: https://github.com/ucan-wg/spec/#3242-ability
[type union]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
[car]: https://ipld.io/specs/transport/car/carv1/
[dag-cbor]: https://ipld.io/specs/codecs/dag-cbor/
[cid]: https://docs.ipfs.io/concepts/content-addressing/
[did:key]: https://w3c-ccg.github.io/did-method-key/
