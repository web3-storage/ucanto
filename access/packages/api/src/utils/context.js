import { SigningAuthority } from '@ucanto/authority'
import { PRIVATE_KEY, DEBUG } from '../constants.js'
import { Logging } from './logging.js'
// import Toucan from 'toucan-js'
// import pkg from '../../package.json'

// const sentryOptions = {
//   dsn: secrets.sentry,
//   allowedHeaders: ['user-agent', 'x-client'],
//   allowedSearchParams: /(.*)/,
//   debug: false,
//   environment: ENV,
//   rewriteFrames: {
//     root: '/',
//   },
//   release: VERSION,
//   pkg,
// }

/**
 * Obtains a route context object.
 *
 * @param {FetchEvent} event
 * @param {Record<string, string>} params - Parameters from the URL
 * @returns {Promise<import('../bindings').RouteContext>}
 */
export async function getContext(event, params) {
  //   const sentry = new Toucan({
  //     event,
  //     ...sentryOptions,
  //   })
  const log = new Logging(event, {
    debug: DEBUG === 'true',
  })

  const keypair = SigningAuthority.parse(PRIVATE_KEY)
  return { params, log, keypair }
}
