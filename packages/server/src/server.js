import * as API from '@ucanto/interface'
import { Verifier } from '@ucanto/principal'
export {
  capability,
  URI,
  Link,
  Failure,
  MalformedCapability,
} from '@ucanto/validator'
import { Receipt, Message, Failure, fail } from '@ucanto/core'
export { ok, error } from './handler.js'
export { fail }
/**
 * Creates a connection to a service.
 *
 * @template {Record<string, any>} Service
 * @param {API.Server<Service>} options
 * @returns {API.ServerView<Service>}
 */
export const create = options => {
  const server = new Server(options)
  return server
}

/**
 * @template {Record<string, any>} S
 * @implements {API.ServerView<S>}
 */
class Server {
  /**
   * @param {API.Server<S>} options
   */
  constructor({ id, service, codec, principal = Verifier, ...rest }) {
    const { catch: fail, ...context } = rest
    this.context = { id, principal, ...context }
    this.service = service
    this.codec = codec
    this.catch = fail || (() => {})
    this.validateAuthorization = this.context.validateAuthorization.bind(
      this.context
    )
  }
  get id() {
    return this.context.id
  }

  /**
   * @template {API.Tuple<API.ServiceInvocation<API.Capability, S>>} I
   * @param {API.HTTPRequest<API.AgentMessage<{ In: API.InferInvocations<I>, Out: API.Tuple<API.Receipt> }>>} request
   * @returns {Promise<API.HTTPResponse<API.AgentMessage<{ Out: API.InferReceipts<I, S>, In: API.Tuple<API.Invocation> }>>>}
   */
  request(request) {
    return handle(this, request)
  }

  /**
   * @template {API.Capability} C
   * @param {API.ServiceInvocation<C, S>} invocation
   * @returns {Promise<API.InferReceipt<C, S>>}
   */
  async run(invocation) {
    const receipt = /** @type {API.InferReceipt<C, S>} */ (
      await invoke(await invocation.buildIPLDView(), this)
    )
    return receipt
  }
}

/**
 * @template {Record<string, any>} S
 * @template {API.Tuple<API.ServiceInvocation<API.Capability, S>>} I
 * @param {API.ServerView<S>} server
 * @param {API.HTTPRequest<API.AgentMessage<{ In: API.InferInvocations<I>, Out: API.Tuple<API.Receipt> }>>} request
 */
export const handle = async (server, request) => {
  const selection = server.codec.accept(request)
  if (selection.error) {
    const { status, headers = {}, message } = selection.error
    return {
      status,
      headers,
      body: new TextEncoder().encode(message),
    }
  } else {
    const { encoder, decoder } = selection.ok
    const message = await decoder.decode(request)
    const result = await execute(message, server)
    const response = await encoder.encode(result)
    return response
  }
}

/**
 * @template {Record<string, any>} S
 * @template {API.Tuple} I
 * @param {API.AgentMessage<{ In: API.InferInvocations<I>, Out: API.Tuple<API.Receipt> }>} input
 * @param {API.ServerView<S>} server
 * @returns {Promise<API.AgentMessage<{ Out: API.InferReceipts<I, S>, In: API.Tuple<API.Invocation> }>>}
 */
export const execute = async (input, server) => {
  const promises = input.invocations.map($ => invoke($, server))

  const receipts = /** @type {API.InferReceipts<I, S>} */ (
    await Promise.all(promises)
  )

  return Message.build({ receipts })
}

/**
 * @template {Record<string, any>} Service
 * @template {API.Capability} C
 * @param {API.Invocation<C>} invocation
 * @param {API.ServerView<Service>} server
 * @returns {Promise<API.Receipt>}
 */
export const invoke = async (invocation, server) => {
  // Invocation needs to have one single capability
  if (invocation.capabilities.length !== 1) {
    return await Receipt.issue({
      issuer: server.id,
      ran: invocation,
      result: {
        error: new InvocationCapabilityError(invocation.capabilities),
      },
    })
  }

  const [capability] = invocation.capabilities

  const path = capability.can.split('/')
  const method = /** @type {string} */ (path.pop())
  const handler = resolve(server.service, path)
  if (handler == null || typeof handler[method] !== 'function') {
    return await Receipt.issue({
      issuer: server.id,
      ran: invocation,
      result: {
        /** @type {API.HandlerNotFound} */
        error: new HandlerNotFound(capability),
      },
    })
  } else {
    try {
      const outcome = await handler[method](invocation, server.context)
      const result = outcome.do ? outcome.do.out : outcome
      const fx = outcome.do ? outcome.do.fx : undefined

      return await Receipt.issue({
        issuer: server.id,
        ran: invocation,
        result,
        fx,
      })
    } catch (cause) {
      /** @type {API.HandlerExecutionError} */
      const error = new HandlerExecutionError(
        capability,
        /** @type {Error} */ (cause)
      )

      server.catch(error)

      return await Receipt.issue({
        issuer: server.id,
        ran: invocation,
        result: { error },
      })
    }
  }
}

/**
 * @implements {API.HandlerNotFound}
 */
export class HandlerNotFound extends RangeError {
  /**
   * @param {API.Capability} capability
   */
  constructor(capability) {
    super()
    this.capability = capability
  }
  /** @type {'HandlerNotFound'} */
  get name() {
    return 'HandlerNotFound'
  }
  get message() {
    return `service does not implement {can: "${this.capability.can}"} handler`
  }
  toJSON() {
    return {
      name: this.name,
      capability: {
        can: this.capability.can,
        with: this.capability.with,
      },
      message: this.message,
      stack: this.stack,
    }
  }
}

class HandlerExecutionError extends Failure {
  /**
   * @param {API.Capability} capability
   * @param {Error} cause
   */
  constructor(capability, cause) {
    super()
    this.capability = capability
    this.cause = cause
  }

  /** @type {'HandlerExecutionError'} */
  get name() {
    return 'HandlerExecutionError'
  }
  get message() {
    return `service handler {can: "${this.capability.can}"} error: ${this.cause.message}`
  }
  toJSON() {
    return {
      name: this.name,
      capability: {
        can: this.capability.can,
        with: this.capability.with,
      },
      cause: {
        ...this.cause,
        name: this.cause.name,
        message: this.cause.message,
        stack: this.cause.stack,
      },
      message: this.message,
      stack: this.stack,
    }
  }
}

class InvocationCapabilityError extends Error {
  /**
   * @param {any} caps
   */
  constructor(caps) {
    super()
    /** @type {true} */
    this.caps = caps
  }
  get name() {
    return 'InvocationCapabilityError'
  }
  get message() {
    return `Invocation is required to have a single capability.`
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      capabilities: this.caps,
    }
  }
}

/**
 * @param {Record<string, any>} service
 * @param {string[]} path
 * @returns {null|Record<string, API.ServiceMethod<API.Capability, {}, API.Failure>>}
 */

const resolve = (service, path) => {
  let target = service
  for (const key of path) {
    target = target[key]
    if (!target) {
      return null
    }
  }
  return target
}
