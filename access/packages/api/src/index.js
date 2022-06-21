import { Router } from './utils/router.js'
import { getContext } from './utils/context.js'
import { HTTPError } from './utils/errors.js'
import { cors, postCors } from './utils/cors.js'
// import { Service } from './service.js'
import { version } from './routes/version.js'
import { notFound } from './utils/responses.js'
// import { UcanRouter } from './utils/ucan-router.js'
// import { service } from './abilities/service.js'
import * as Server from '@ucanto/server'
import * as CAR from '@ucanto/transport/car'
import * as CBOR from '@ucanto/transport/cbor'
import { BaseRequestTransport } from './client.js'

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
    const t = new BaseRequestTransport()
    const server = Server.create({
      encoder: t,
      decoder: t,
      service: new Service(),
      catch: (err) => {
        ctx.log.error(err)
      },
    })

    const rsp = await server.request({
      body: new Uint8Array(await event.request.arrayBuffer()),
      headers: Object.fromEntries(event.request.headers.entries()),
    })
    return new Response(rsp.body, { headers: rsp.headers })
    // const ucanRouter = new UcanRouter(ctx, service)

    // return await ucanRouter.route(event)
  },
  [postCors]
)

r.add('all', '*', notFound)
addEventListener('fetch', r.listen.bind(r))

export class Service {
  constructor() {
    this.identity = new IdentityService()
  }
}

class IdentityService {
  /**
   * @typedef {{
   * can: "identity/validate"
   * with: string
   * }} Identify
   * @param {import('@ucanto/server').Invocation<Identify>} ucan
   * @returns {Promise<import('@ucanto/server').Result<boolean, { error: true } & Error>>}
   */
  async validate(ucan) {
    return true
  }
}
