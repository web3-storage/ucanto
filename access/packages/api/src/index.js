import { Router } from './utils/router.js'
import { getContext } from './utils/context.js'
import { HTTPError } from './utils/errors.js'
import { cors, postCors } from './utils/cors.js'
import { version } from './routes/version.js'
import { notFound } from './utils/responses.js'
import * as Server from '@ucanto/server'
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
      id: ctx.keypair,
      encoder: t,
      decoder: t,
      service: new Service(),
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

export class Service {
  constructor() {
    this.identity = {
      validate: Server.provide(
        Server.capability({
          can: 'identity/validate',
          with: Server.URI.match({ protocol: 'mailto:' }),
          derives: () => true,
        }),
        async ({ capability, context, invocation }) => {
          return true
        }
      ),
    }
    this.testing = {
      pass() {
        return 'test pass'
      },
      fail() {
        throw new Error('test fail')
      },
    }
  }
}

class IdentityService {
  /**
   * @typedef {{
   * can: "identity/validate"
   * with: `mailto:${string}`
   * }} Validate
   * @param {import('@ucanto/server').Invocation<Validate>} ucan
   * @returns {Promise<import('@ucanto/server').Result<boolean, { error: true } & Error>>}
   */
  async validate(ucan) {
    return true
  }
}
