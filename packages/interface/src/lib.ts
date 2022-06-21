import type * as Transport from './transport.js'
import type { Tuple } from './transport.js'
export * as UCAN from '@ipld/dag-ucan'
import type {
  Authority,
  SigningAuthority,
  AuthorityParser,
} from './authority.js'
import type {
  Phantom,
  Encoded,
  Link,
  Issuer,
  Identity,
  Audience,
  MultihashHasher,
  MultihashDigest,
  ByteView,
  Ability,
  Resource,
  DID,
  Fact,
  Proof as LinkedProof,
  View as UCANView,
  UCAN as UCANData,
  Capability,
} from '@ipld/dag-ucan'

export type {
  MultibaseEncoder,
  MultibaseDecoder,
} from 'multiformats/bases/interface'

export type {
  MultihashDigest,
  MultihashHasher,
  Transport,
  Encoded,
  Link,
  Issuer,
  Audience,
  Authority,
  SigningAuthority,
  Identity,
  ByteView,
  Phantom,
  Ability,
  Resource,
  DID,
  Fact,
  Tuple,
  LinkedProof,
  Capability,
}

import {
  CapabilityParser,
  ParsedCapability,
  InvalidAudience,
  Unauthorized,
  CanIssue,
  UnavailableProof,
} from './capability.js'

export * from './transport.js'
export * from './authority.js'
export * from './capability.js'

/**
 * Represents an {@link Ability} that a UCAN holder `Can` perform `With` some {@link Resource}.
 *
 * @template Can - the {@link Ability} (action/verb) the UCAN holder can perform
 * @template With - the {@link Resource} (thing/noun) the UCAN holder can perform their `Ability` on / with
 *
 */

/**
 * Proof can either be a link to a delegated UCAN or a materialized `Delegation`
 * view.
 */
export type Proof<
  C extends [Capability, ...Capability[]] = [Capability, ...Capability[]]
> = LinkedProof<C[number]> | Delegation<C>

export interface UCANOptions {
  audience: Identity
  lifetimeInSeconds?: number
  expiration?: number
  notBefore?: number

  nonce?: string

  facts?: Fact[]
  proofs?: Proof[]
}

export interface DelegationOptions<
  C extends [Capability, ...Capability[]],
  A extends number = number
> extends UCANOptions {
  issuer: SigningAuthority<A>
  audience: Identity
  capabilities: C
}

export interface Delegation<
  C extends [Capability, ...Capability[]] = [Capability, ...Capability[]]
> {
  readonly root: Transport.Block<C>
  readonly blocks: Map<string, Transport.Block>

  readonly cid: LinkedProof<C[number]>
  readonly bytes: ByteView<UCANData<C[number]>>
  readonly data: UCANView<C[number]>

  asCID: LinkedProof<Capability>

  export(): IterableIterator<Transport.Block>

  issuer: Identity
  audience: Identity
  capabilities: C
  expiration?: number
  notBefore?: number

  nonce?: string

  facts: Fact[]
  proofs: Proof[]
}

export interface Invocation<C extends Capability = Capability>
  extends Delegation<[C]> {}

export interface InvocationOptions<C extends Capability = Capability>
  extends UCANOptions {
  issuer: SigningAuthority
  capability: C
}

export interface IssuedInvocation<C extends Capability = Capability>
  extends DelegationOptions<[C]> {
  readonly issuer: SigningAuthority
  readonly audience: Identity
  readonly capabilities: [C]

  readonly proofs: Proof[]
}

export type ServiceInvocation<
  C extends Capability = Capability,
  S = InvocationService<C>
> = IssuedInvocation<C> & ServiceInvocations<S>

export type InferInvocation<T extends ServiceInvocation> =
  T extends ServiceInvocation<infer C> ? Invocation<C> : never

export type InferInvocations<T> = T extends []
  ? []
  : T extends [ServiceInvocation<infer C>, ...infer Rest]
  ? [Invocation<C>, ...InferInvocations<Rest>]
  : T extends Array<IssuedInvocation<infer U>>
  ? Invocation<U>[]
  : never

export interface ServiceMethod<
  I extends Capability,
  O,
  X extends { error: true }
> {
  (input: Invocation<I>, context: InvocationContext): Await<
    Result<O, X | InvocationError>
  >
}

export type InvocationError =
  | HandlerNotFound
  | HandlerExecutionError
  | InvalidAudience
  | Unauthorized

export interface InvocationContext extends CanIssue {
  id: Identity
  my?: (issuer: DID) => Capability[]
  resolve?: (proof: LinkedProof) => Await<Result<Delegation, UnavailableProof>>

  authority: AuthorityParser
}

export type ResolveServiceMethod<
  S extends Record<string, any>,
  Path extends string
> = Path extends `${infer Base}/${infer SubPath}`
  ? ResolveServiceMethod<S[Base], SubPath>
  : S[Path] extends ServiceMethod<infer _C, infer _T, infer _X>
  ? S[Path]
  : never

export type ResolveServiceInvocation<
  S extends Record<string, any>,
  C extends Capability
> = ResolveServiceMethod<S, C['can']> extends ServiceMethod<
  infer C,
  infer _T,
  infer _X
>
  ? IssuedInvocation<C>
  : never

export type InferServiceInvocationReturn<
  C extends Capability,
  S
> = ResolveServiceMethod<S, C['can']> extends ServiceMethod<
  infer _,
  infer T,
  infer X
>
  ? Result<
      T,
      | X
      | HandlerNotFound
      | HandlerExecutionError
      | InvalidAudience
      | Unauthorized
    >
  : never

export type InferServiceInvocations<I extends unknown[], T> = I extends []
  ? []
  : I extends [ServiceInvocation<infer C, T>, ...infer Rest]
  ? [InferServiceInvocationReturn<C, T>, ...InferServiceInvocations<Rest, T>]
  : never

export interface IssuedInvocationView<C extends Capability = Capability>
  extends IssuedInvocation<C> {
  delegate(): Promise<Delegation<[C]>>
  execute<T extends InvocationService<C>>(
    service: ConnectionView<T>
  ): Await<InferServiceInvocationReturn<C, T>>
}

export type ServiceInvocations<T> = IssuedInvocation<any> &
  {
    [Key in keyof T]: SubServiceInvocations<T[Key], Key & string>
  }[keyof T]

type SubServiceInvocations<T, Path extends string> = {
  [Key in keyof T]: T[Key] extends ServiceMethod<infer C, infer _R, infer _X>
    ? IssuedInvocation<C>
    : SubServiceInvocations<Path, Key & string>
}[keyof T]

export type InvocationService<
  C extends Capability,
  A extends string = C['can']
> = A extends `${infer Base}/${infer Path}`
  ? { [Key in Base]: InvocationService<C, Path> }
  : {
      [Key in A]: ServiceMethod<C, any, any>
    }

export type ExecuteInvocation<
  C extends Capability,
  T extends Record<string, any>,
  Ability extends string = C['can']
> = Ability extends `${infer Base}/${infer Path}`
  ? ExecuteInvocation<C, T[Base], Path>
  : T[Ability] extends (input: Invocation<C>) => infer Out
  ? Out
  : never

export type Result<T, X extends { error: true }> =
  | (T extends null | undefined ? T : never)
  | (T & { error?: never })
  | X

export interface Failure extends Error {
  error: true
}

export interface HandlerNotFound extends RangeError {
  error: true
  capability: Capability
  name: 'HandlerNotFound'
}

export interface HandlerExecutionError extends Failure {
  capability: Capability
  cause: Error
  name: 'HandlerExecutionError'
}

export type API<T> = T[keyof T]

export interface OutpboundTranpsortOptions {
  readonly encoder: Transport.RequestEncoder
  readonly decoder: Transport.ResponseDecoder
}
export interface ConnectionOptions<T>
  extends Transport.EncodeOptions,
    OutpboundTranpsortOptions {
  readonly id: Identity
  readonly channel: Transport.Channel<T>
}

export interface Connection<T> extends Phantom<T>, ConnectionOptions<T> {
  readonly id: Identity
  readonly hasher: MultihashHasher
}

export interface ConnectionView<T> extends Connection<T> {
  id: Identity
  execute<
    C extends Capability,
    I extends Transport.Tuple<ServiceInvocation<C, T>>
  >(
    ...invocations: I
  ): Await<InferServiceInvocations<I, T>>
}

export interface InboundTransportOptions {
  /**
   * Request decoder which is will be used by a server to decode HTTP Request
   * into an invocation `Batch` that will be executed using a `service`.
   */
  readonly decoder: Transport.RequestDecoder
  /**
   * Response encoder which will be used to encode batch of invocation results
   * into an HTTP response that will be send back to the client that initiated
   * request.
   */
  readonly encoder: Transport.ResponseEncoder
}

export interface ValidatorOptions {
  /**
   * Takes authority parser that can be used to turn an `UCAN.Identity`
   * into `Ucanto.Authority`.
   */
  readonly authority?: AuthorityParser

  readonly canIssue?: CanIssue['canIssue']
  readonly my?: InvocationContext['my']
  readonly resolve?: InvocationContext['resolve']
}

export interface ServerOptions
  extends InboundTransportOptions,
    ValidatorOptions {
  /**
   * Service DID which will be used to verify that received invocation
   * audience matches it.
   */
  readonly id: Identity
}

export interface Server<T> extends ServerOptions {
  /**
   * Actual service providing capability handlers.
   */
  readonly service: T

  readonly catch?: (err: HandlerExecutionError) => void
}

export interface ServerView<T> extends Server<T>, Transport.Channel<T> {
  context: InvocationContext
  catch: (err: HandlerExecutionError) => void
}

export type Service = Record<
  string,
  (input: Invocation<any>) => Promise<Result<any, any>>
>

export type Await<T> = T | PromiseLike<T> | Promise<T>

export type Protocol<Scheme extends string = string> = `${Scheme}:`
export interface URI<P extends Protocol = Protocol> extends URL {
  protocol: P
  href: `${P}${string}`
}

export type URIString<P extends URI> = `${URI['protocol']}${string}` & {
  protocol?: Protocol
}
