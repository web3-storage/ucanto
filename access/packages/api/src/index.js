import { Router } from './utils/router.js'
import { getContext } from './utils/context.js'
import { HTTPError } from './utils/errors.js'
import { cors, postCors } from './utils/cors.js'
import { version } from './routes/version.js'
import { notFound } from './utils/responses.js'
import * as Server from '@ucanto/server'
import { BaseRequestTransport } from './client.js'
import { service } from './ucanto/service.js'
import * as CAR from '@ucanto/transport/car'
import * as CBOR from '@ucanto/transport/cbor'

const r = new Router(getContext, {
  onError(req, err, ctx) {
    return HTTPError.respond(err, ctx)
  },
})

// CORS
r.add('options', '*', cors)

// Version
r.add('get', '/version', version, [postCors])

r.add(
  'post',
  '/',
  async (event, ctx) => {
    // const t = new BaseRequestTransport()
    const server = Server.create({
      id: ctx.keypair,
      encoder: CBOR,
      decoder: CAR,
      service: service(ctx),
      catch: (err) => {
        ctx.log.error(err)
      },
      canIssue: (capability, issuer) => {
        if (capability.with === issuer || issuer === ctx.keypair.did()) {
          return true
        }

        if (capability.can === 'identity/validate') {
          return true
        }

        return false
      },
      ...ctx,
    })

    const rsp = await server.request({
      body: new Uint8Array(await event.request.arrayBuffer()),
      headers: Object.fromEntries(event.request.headers.entries()),
    })
    return new Response(rsp.body, { headers: rsp.headers })
  },
  [postCors]
)

r.add('all', '*', notFound)
addEventListener('fetch', r.listen.bind(r))
