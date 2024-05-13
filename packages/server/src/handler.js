import * as API from './api.js'
import { access, Schema, Failure } from '@ucanto/validator'

/**
 * Function that can be used to define given capability provider. It decorates
 * passed handler and takes care of UCAN validation and only calls the handler
 * when validation succeeds.
 *
 *
 * @template {API.Ability} A
 * @template {API.URI} R
 * @template {API.Caveats} C
 * @template {{}} O
 * @template {API.Failure} X
 * @template {API.Result<O, X>} Result
 * @param {API.CapabilityParser<API.Match<API.ParsedCapability<A, R, C>>>} capability
 * @param {(input:API.ProviderInput<API.ParsedCapability<A, R, C>>) => API.Await<Result>} handler
 * @returns {API.ServiceMethod<API.Capability<A, R, C>, O & Result['ok'], X & Result['error']>}
 */

export const provide = (capability, handler) =>
  provideAdvanced({ capability, handler })

/**
 * Function that can be used to define given capability provider. It decorates
 * passed handler and takes care of UCAN validation and only calls the handler
 * when validation succeeds. This is an advanced version of `provide` function
 * which allowing you to pass additional `input.audience` schema so that handler
 * could accept invocations for audiences other than the service itself. If
 * `input.audience` is not provided behavior is the same as `provide` function.
 *
 * @template {API.Ability} A
 * @template {API.URI} R
 * @template {API.Caveats} C
 * @template {{}} O
 * @template {API.Failure} X
 * @template {API.Transaction<O, X>} Result
 * @param {object} input
 * @param {API.Reader<API.DID>} [input.audience]
 * @param {API.CapabilityParser<API.Match<API.ParsedCapability<A, R, C>>>} input.capability
 * @param {(input:API.ProviderInput<API.ParsedCapability<A, R, C>>) => API.Await<Result>} input.handler
 * @returns {API.ServiceMethod<API.Capability<A, R, C>, O & API.InferTransaction<Result>['ok'], X & API.InferTransaction<Result>['error']>}
 */

export const provideAdvanced =
  ({ capability, handler, audience }) =>
  /**
   * @param {API.Invocation<API.Capability<A, R, C>>} invocation
   * @param {API.InvocationContext} options
   */
  async (invocation, options) => {
    // If audience schema is not provided we expect the audience to match
    // the server id. Users could pass `schema.string()` if they want to accept
    // any audience.
    const audienceSchema = audience || Schema.literal(options.id.did())
    const result = audienceSchema.read(invocation.audience.did())
    if (result.error) {
      return { error: new InvalidAudience({ cause: result.error }) }
    }

    // Find valid proof chain by checking configured authroities.
    for (const authority of options.authorities ?? []) {
      const authorization = await access(invocation, {
        ...options,
        authority,
        capability
      })
      if (authorization.error) {
        continue
      } else {
        return /** @type {API.Result<Exclude<U, {error:true}>, {error:true} & Exclude<U, Exclude<U, {error:true}>>|API.InvocationError>} */ (
          handler({
            capability: authorization.capability,
            invocation,
            context: options
          })
        )
      }
    }

    const authorization = await access(invocation, {
      ...options,
      authority: options.id,
      capability,
    })

    if (authorization.error) {
      return authorization
    } else {
      return handler({
        capability: authorization.ok.capability,
        invocation,
        context: options,
      })
    }
  }

/**
 * @implements {API.InvalidAudience}
 */
class InvalidAudience extends Failure {
  /**
   * @param {object} source
   * @param {API.Failure} source.cause
   */
  constructor({ cause }) {
    super()
    /** @type {'InvalidAudience'} */
    this.name = 'InvalidAudience'
    this.cause = cause
  }
  describe() {
    return this.cause.message
  }
}

/**
 * @template {unknown} T
 * @template {{}} X
 * @implements {API.OkBuilder<T, X>}
 */
class Ok {
  /**
   * @param {T} ok
   */
  constructor(ok) {
    this.ok = ok
  }
  get result() {
    return { ok: this.ok }
  }
  get effects() {
    return { fork: [] }
  }

  /**
   * @param {API.Run} run
   * @returns {API.ForkBuilder<T, X>}
   */
  fork(run) {
    return new Fork({
      out: this.result,
      fx: {
        fork: [run],
      },
    })
  }
  /**
   * @param {API.Run} run
   * @returns {API.JoinBuilder<T, X>}
   */
  join(run) {
    return new Join({
      out: this.result,
      fx: {
        fork: [],
        join: run,
      },
    })
  }
}

/**
 * @template {unknown} T
 * @template {{}} X
 * @implements {API.ErrorBuilder<T, X>}
 */
class Error {
  /**
   * @param {X} error
   */
  constructor(error) {
    this.error = error
  }
  get result() {
    return { error: this.error }
  }
  get effects() {
    return { fork: [] }
  }

  /**
   * @param {API.Run} run
   * @returns {API.ForkBuilder<T, X>}
   */
  fork(run) {
    return new Fork({
      out: this.result,
      fx: {
        fork: [run],
      },
    })
  }
  /**
   * @param {API.Run} run
   * @returns {API.JoinBuilder<T, X>}
   */
  join(run) {
    return new Join({
      out: this.result,
      fx: {
        fork: [],
        join: run,
      },
    })
  }
}

/**
 * @template {unknown} T
 * @template {{}} X
 * @implements {API.JoinBuilder<T, X>}
 */
class Join {
  /**
   * @param {API.Do<T, X>} model
   */
  constructor(model) {
    this.do = model
  }
  get result() {
    return this.do.out
  }
  get effects() {
    return this.do.fx
  }
  /**
   * @param {API.Run} run
   * @returns {API.JoinBuilder<T, X>}
   */
  fork(run) {
    const { out, fx } = this.do
    return new Join({
      out,
      fx: {
        ...fx,
        fork: [...fx.fork, run],
      },
    })
  }
}

/**
 * @template {unknown} T
 * @template {{}} X
 * @extends {Join<T, X>}
 * @implements {API.ForkBuilder<T, X>}
 */
class Fork extends Join {
  /**
   * @param {API.Run} run
   * @returns {API.JoinBuilder<T, X>}
   */
  join(run) {
    const { out, fx } = this.do
    return new Join({
      out,
      fx: { ...fx, join: run },
    })
  }
  /**
   * @param {API.Run} run
   * @returns {API.ForkBuilder<T, X>}
   */
  fork(run) {
    const { out, fx } = this.do
    return new Fork({
      out,
      fx: { ...fx, fork: [...fx.fork, run] },
    })
  }
}

/**
 * @template {{}} T
 * @template {API.Failure} X
 * @param {T} value
 * @returns {API.OkBuilder<T, X>}
 */
export const ok = value => new Ok(value)

/**
 * @template {{}} T
 * @template {API.Failure} X
 * @param {X} error
 * @returns {API.ErrorBuilder<T, X>}
 */
export const error = error => new Error(error)
