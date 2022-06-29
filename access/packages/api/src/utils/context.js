import { SigningAuthority } from '@ucanto/authority'
import { config } from '../config.js'
import { Logging } from './logging.js'
import Toucan from 'toucan-js'
import pkg from '../../package.json'

const sentryOptions = {
  dsn: config.SENTRY_DSN,
  allowedHeaders: ['user-agent', 'x-client'],
  allowedSearchParams: /(.*)/,
  debug: false,
  environment: config.ENV,
  rewriteFrames: {
    root: '/',
  },
  release: config.VERSION,
  pkg,
}

/**
 * Obtains a route context object.
 *
 * @param {FetchEvent} event
 * @param {Record<string, string>} params - Parameters from the URL
 * @returns {Promise<import('../bindings').RouteContext>}
 */
export async function getContext(event, params) {
  const sentry = new Toucan({
    event,
    ...sentryOptions,
  })
  const log = new Logging(event, {
    debug: config.DEBUG,
    sentry: ['test', 'dev'].includes(config.ENV) ? undefined : sentry,
    branch: config.BRANCH,
    version: config.VERSION,
    commit: config.COMMITHASH,
  })

  const keypair = SigningAuthority.parse(config.PRIVATE_KEY)
  return { params, log, keypair, config }
}
