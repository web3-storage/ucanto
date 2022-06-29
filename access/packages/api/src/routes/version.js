import { JSONResponse } from '../utils/responses.js'

/**
 * @param {FetchEvent} event
 * @param {import('../utils/router.js').RouteContext} ctx
 */
export function version(event, ctx) {
  return new JSONResponse({
    version: ctx.config.VERSION,
    commit: ctx.config.COMMITHASH,
    branch: ctx.config.BRANCH,
    did: ctx.keypair.did(),
  })
}
