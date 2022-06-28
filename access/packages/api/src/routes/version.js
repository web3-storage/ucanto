import { JSONResponse } from '../utils/responses.js'

/**
 * @param {FetchEvent} event
 * @param {import('../utils/router.js').RouteContext} ctx
 */
export function version(event, ctx) {
  return new JSONResponse({
    version: VERSION,
    commit: COMMITHASH,
    branch: BRANCH,
    did: ctx.keypair.did(),
  })
}
