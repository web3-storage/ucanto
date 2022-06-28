import * as Server from '@ucanto/server'
import { Accounts } from '../kvs/accounts.js'
import { sendEmail } from '../utils/email.js'
import {
  identityIdentify,
  identityRegister,
  identityValidate,
} from './capabilities.js'

/**
 * @param {import('../utils/router.js').RouteContext} ctx
 */
export function service(ctx) {
  return {
    identity: {
      validate: Server.provide(
        identityValidate,
        async ({ capability, context, invocation }) => {
          const delegation = await identityRegister
            .invoke({
              audience: invocation.issuer,
              issuer: ctx.keypair,
              with: capability.caveats.as,
              caveats: {
                as: capability.with,
              },
            })
            .delegate()

          // For testing
          if (process.env.NODE_ENV === 'development') {
            console.log(
              '🚀 ~ file: service.js ~ line 34 ~ Server.UCAN.format(delegation.data)',
              Server.UCAN.format(delegation.data)
            )

            return {
              delegation: Server.UCAN.format(delegation.data),
            }
          }

          await sendEmail({
            to: capability.caveats.as.replace('mailto:', ''),
            ucan: Server.UCAN.format(delegation.data),
          })
        }
      ),
      register: Server.provide(
        identityRegister,
        async ({ capability, context, invocation }) => {
          const accounts = new Accounts()
          await accounts.register(
            capability.caveats.as,
            capability.with,
            invocation.cid
          )

          return null
        }
      ),
      identify: Server.provide(identityIdentify, async ({ capability }) => {
        const accounts = new Accounts()

        const result = await accounts.get(capability.with)
        return result?.account
      }),
    },
    testing: {
      pass() {
        return 'test pass'
      },
      fail() {
        throw new Error('test fail')
      },
    },
  }
}
