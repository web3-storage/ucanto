import {
  Ability,
  Block as UCANBlock,
  ByteView,
  Capabilities,
  Capability,
  DID,
  Fact,
  Link as UCANLink,
  MultihashHasher,
  MultihashDigest,
  MultibaseDecoder,
  MultibaseEncoder,
  Phantom,
  Resource,
  Signature,
  SignatureView,
  Principal,
  MulticodecCode,
  SigAlg,
  ToJSON,
  SignatureJSON,
  JSONUnknown,
  IntoJSON,
  Crypto,
  JSONObject,
} from '@ipld/dag-ucan'
import {
  Link,
  UnknownLink,
  Block as IPLDBlock,
  ToString,
  BlockEncoder,
} from 'multiformats'
import * as UCAN from '@ipld/dag-ucan'
import {
  CanIssue,
  Match,
  InvalidAudience,
  Unauthorized,
  UnavailableProof,
  DIDKeyResolutionError,
  ParsedCapability,
  CapabilityParser,
  Revoked,
  InferCapability,
  Authorization,
} from './capability.js'
import type * as Transport from './transport.js'
import type { Tuple, Block } from './transport.js'
export * from './capability.js'
export * from './transport.js'
export type {
  Transport,
  Phantom,
  Tuple,
  DID,
  Signature,
  SignatureView,
  ByteView,
  Capabilities,
  Capability,
  Fact,
  UCANBlock,
  UCANLink,
  Link,
  Link as IPLDLink,
  IPLDBlock,
  Block,
  Ability,
  Resource,
  SigAlg,
  MultihashDigest,
  MultihashHasher,
  MultibaseDecoder,
  MultibaseEncoder,
  MulticodecCode,
  Principal,
  ToJSON,
  ToString,
  UnknownLink,
  JSONUnknown,
  Crypto,
}
export * as UCAN from '@ipld/dag-ucan'

export type BlockStore<T> = Map<ToString<Link>, Block<T, number, number, 1>>
export type AttachedLinkSet = Set<ToString<Link>>

/**
 * Proof can either be a link to a delegated UCAN or a materialized {@link Delegation}
 * view.
 */
export type Proof<C extends Capabilities = Capabilities> =
  | UCANLink<C>
  | Delegation<C>

/**
 * UCAN creation options that apply to all UCAN types.
 *
 * See {@link DelegationOptions} for options specific to capability delegation.
 * See {@link InvocationOptions} for options specific to invoking a capability.
 */
export interface UCANOptions {
  audience: Principal
  lifetimeInSeconds?: number
  expiration?: UCAN.UTCUnixTimestamp
  notBefore?: UCAN.UTCUnixTimestamp

  nonce?: UCAN.Nonce

  facts?: Fact[]
  proofs?: Proof[]
  attachedBlocks?: BlockStore<unknown>
}

/**
 * A {@link UCANOptions} instance that include options for delegating capabilities.
 */
export interface DelegationOptions<C extends Capabilities> extends UCANOptions {
  /**
   * The `issuer` of a {@link Delegation} is the delegating party,
   * or the {@link Principal} that has some capabilities that they wish to delegate
   * the `audience` {@link Principal}.
   *
   */
  issuer: UCAN.Signer

  /**
   * The `audience` for a {@link Delegation} is the party being delegated to, or the
   * {@link Principal} which will invoke the delegated {@link Capabilities} on behalf
   * of the `issuer`.
   */
  audience: Principal

  /**
   * The set of {@link Capabilities} being delegated.
   */
  capabilities: C

  /**
   * If the `issuer` of this {@link Delegation} is not the resource owner / service provider,
   * for the delegated capabilities, the `proofs` array must contain valid {@link Proof}s
   * containing delegations to the `issuer`.
   */
  proofs?: Proof[]
}

export interface BuildOptions<
  T extends unknown = unknown,
  C extends MulticodecCode = MulticodecCode,
  A extends MulticodecCode = MulticodecCode
> {
  readonly hasher?: UCAN.MultihashHasher<A>
  readonly encoder?: BlockEncoder<C, T>
}
/**
 * An interface for representing a materializable IPLD DAG View. It is a useful
 * abstraction that can be used to defer actual IPLD encoding.
 *
 * Note that represented DAG could be partial implying that some of the blocks
 * may not be included. This by design allowing a user to include whatever
 * blocks they want to include.
 */
export interface IPLDViewBuilder<View extends IPLDView = IPLDView> {
  /**
   * Encodes all the blocks and creates a new IPLDView instance over them. Can
   * be passed a multihasher to specify a preferred hashing algorithm. Note
   * that there is no guarantee that preferred hasher will be used, it is
   * only a hint of preference and not a requirement.
   */
  buildIPLDView(options?: BuildOptions): Await<View>
}

/**
 * An interface for representing a materialized IPLD DAG View, which provides
 * a generic traversal API. It is useful for encoding (potentially partial) IPLD
 * DAGs into content archives (e.g. CARs).
 */
export interface IPLDView<T extends unknown = unknown> {
  /**
   * The root block of the IPLD DAG this is the view of. This is the the block
   * from which all other blocks are linked directly or transitively.
   */
  root: Block<T>

  /**
   * Returns an iterable of all the IPLD blocks that are included in this view.
   * It is RECOMMENDED that implementations return blocks in bottom up order
   * (i.e. leaf blocks first, root block last).
   *
   * Iterator MUST include the root block otherwise it will lead to encoders
   * into omitting it when encoding the view into a CAR archive.
   *
   * Note that we would like to rename this method to `blocks` but that would
   * be a breaking change on the Delegate API so we defer it for now.
   */
  iterateIPLDBlocks(): IterableIterator<Block>
}

/**
 * A materialized view of a UCAN delegation, which can be encoded into a UCAN token and
 * used as proof for an invocation or further delegations.
 */
export interface Delegation<C extends Capabilities = Capabilities>
  extends IPLDView<UCAN.UCAN<C>>,
    IPLDViewBuilder<Delegation<C>> {
  readonly root: UCANBlock<C>
  /**
   * Map of all the IPLD blocks that were included with this delegation DAG.
   * Usually this would be blocks corresponding to proofs, however it may
   * also contain other blocks e.g. things that `capabilities` or `facts` may
   * link.
   * It is not guaranteed to include all the blocks of this DAG, as it represents
   * a partial DAG of the delegation desired for transporting.
   *
   * Also note that map may contain blocks that are not part of this
   * delegation DAG. That is because `Delegation` is usually constructed as
   * view / selection over the CAR which may contain bunch of other blocks.
   * @deprecated
   */
  readonly blocks: Map<string, Block<unknown, any, any, any>>

  readonly cid: UCANLink<C>
  readonly bytes: ByteView<UCAN.UCAN<C>>
  readonly data: UCAN.View<C>

  asCID: UCANLink<C>
  link(): UCANLink<C>

  export(): IterableIterator<Block>

  issuer: UCAN.Principal
  audience: UCAN.Principal
  capabilities: C
  expiration: UCAN.UTCUnixTimestamp
  notBefore?: UCAN.UTCUnixTimestamp

  nonce?: UCAN.Nonce

  facts: Fact[]
  proofs: Proof[]
  iterate(): IterableIterator<Delegation>

  signature: SignatureView
  version: UCAN.Version

  toJSON(): DelegationJSON<this>
  delegate(): Await<Delegation<C>>

  archive(): Await<Result<Uint8Array, Error>>

  /**
   * Attach a block to the delegation DAG so it would be included in the
   * block iterator.
   * ⚠️ You can only attach blocks that are referenced from the `capabilities`
   * or `facts`.
   */
  attach(block: Block): void
}

/**
 * Type representing a UCAN capability set in UCAN 0.10 format.
 * @see https://github.com/ucan-wg/spec/blob/0.10/README.md#241-examples
 */
export type Allows<
  URI extends Resource = Resource,
  Abilities extends ResourceAbilities = ResourceAbilities
> = {
  [K in URI]: Abilities
}

/**
 * Type representing a set of abilities for a specific resource. It is a map of
 * abilities to a list of caveats. This type is used in representation of the
 * UCAN capability set in UCAN 0.10 format.
 */
export type ResourceAbilities<
  Can extends Ability = any,
  Caveats extends Record<string, unknown> = Record<string, unknown>
> = {
  [K in Can]: Caveats[]
}

/**
 * Utility type that infers union of two {@link ResourceAbilities}. Type is used
 * to infer capabilities of the {@link Delegation}.
 */
export type JoinAbilities<
  T extends ResourceAbilities,
  U extends ResourceAbilities
> = {
  [K in keyof T | keyof U]: [
    ...(K extends keyof T ? T[K] : []),
    ...(K extends keyof U ? U[K] : [])
  ]
}

/**
 * Utility type that infers union of two {@link Allows}. Type is used to infer
 * capabilities of the {@link Delegation}.
 */
export type JoinAllows<T extends Allows, U extends Allows> = {
  [K in keyof T | keyof U]: JoinAbilities<
    K extends keyof T ? (T[K] extends ResourceAbilities ? T[K] : {}) : {},
    K extends keyof U ? (U[K] extends ResourceAbilities ? U[K] : {}) : {}
  >
}

/**
 * Utility type that infers set of capabilities delegated by one or more
 * {@link Delegation}s in UCAN 0.10 format.
 */
export type InferAllowedFromDelegations<T extends [unknown, ...unknown[]]> =
  T extends [infer A]
    ? InferAllowedFromDelegation<A>
    : T extends [infer A, infer B]
    ? JoinAllows<InferAllowedFromDelegation<A>, InferAllowedFromDelegation<B>>
    : T extends [infer A, infer B, ...infer Rest]
    ? JoinAllows<
        InferAllowedFromDelegation<A>,
        InferAllowedFromDelegations<[B, ...Rest]>
      >
    : never

/**
 * Utility type that infers set of capabilities delegated by a single
 * {@link Delegation}
 */
export type InferAllowedFromDelegation<T> = T extends Delegation<
  infer Capabilities
>
  ? InferAllowedFromCapabilities<Capabilities>
  : never

/**
 * Utility type that infers set of capabilities in UCAN 0.10 format from a
 * {@link Capability} tuple.
 */
export type InferAllowedFromCapabilities<T> = T extends [infer A]
  ? InferAllowedFromCapability<A>
  : T extends [infer A, ...infer Rest]
  ? JoinAllows<
      InferAllowedFromCapability<A>,
      InferAllowedFromCapabilities<Rest>
    >
  : never

/**
 * Utility type that infers set of capabilities in UCAN 0.10 format from a
 * single {@link Capability}.
 */
export type InferAllowedFromCapability<T> = T extends Capability<
  infer Can,
  infer URI,
  infer Caveats
>
  ? { [K in URI]: { [K in Can]: (Caveats & {})[] } }
  : never

export type DelegationJSON<T extends Delegation = Delegation> = ToJSON<
  T,
  {
    '/': ToString<T['cid']>
    v: T['version']
    iss: DID
    aud: DID
    att: ToJSON<
      T['capabilities'],
      T['capabilities'] &
        UCAN.Tuple<{ with: UCAN.Resource; can: UCAN.Ability; nb?: JSONObject }>
    >
    exp: T['expiration']
    nbf?: T['notBefore'] & {}
    nnc?: T['nonce'] & {}
    fct: ToJSON<T['facts']>
    prf: ProofJSON[] & JSONUnknown[]
    s: SignatureJSON<T['signature']>
  }
>

export type ProofJSON = DelegationJSON | LinkJSON<UCANLink>

export type LinkJSON<T extends UnknownLink = UnknownLink> = ToJSON<
  T,
  { '/': ToString<T> }
>

/**
 * An Invocation represents a UCAN that can be presented to a service provider to
 * invoke or "exercise" a {@link Capability}. You can think of invocations as a
 * serialized function call, where the ability or `can` portion of the Capability acts
 * as the function name, and the resource (`with`) and caveats (`nb`) of the capability
 * act as function arguments.
 *
 * Most Invocations will require valid proofs, which consist of a chain of {@link Delegation}s.
 * The service provider will inspect the proofs to verify that the invocation has
 * sufficient privileges to execute.
 */
export interface Invocation<C extends Capability = Capability>
  extends Delegation<[C]> {}

/**
 * Represents an outcome of the receipt as per IPLD schema of the
 * ucan/invocation@0.2 spec.
 *
 * @see https://github.com/ucan-wg/invocation/blob/v0.2/README.md#81-outcome
 */
export interface OutcomeModel<
  Ok extends {} = {},
  Error extends {} = {},
  Ran extends Invocation = Invocation
> {
  ran: ReturnType<Ran['link']>
  out: Result<Ok, Error>
  fx: EffectsModel
  meta: Meta
  iss?: DID
  prf: UCANLink[]
}

/**
 * Represents a receipt of an invocation as per IPLD schema in
 * ucan/invocation@0.2 spec.
 *
 * @see https://github.com/ucan-wg/invocation/blob/v0.2/README.md#82-receipt
 */
export interface ReceiptModel<
  Ok extends {} = {},
  Error extends {} = {},
  Ran extends Invocation = Invocation
> {
  ocm: OutcomeModel<Ok, Error, Ran>
  sig: Signature
}

/**
 * Represents a view of the invocation receipt. Unlike the {@link ReceiptModel},
 * this interface provides a more ergonomic API and allows you to reference
 * linked IPLD objects of they are included in the source DAG.
 */
export interface Receipt<
  Ok extends {} = {},
  Error extends {} = {},
  Ran extends Invocation = Invocation,
  Alg extends SigAlg = SigAlg
> extends IPLDView<ReceiptModel<Ok, Error, Ran>>,
    IPLDViewBuilder<Receipt<Ok, Error, Ran, Alg>> {
  readonly ran: Ran | ReturnType<Ran['link']>
  readonly out: Result<Ok, Error>
  readonly fx: Effects
  readonly meta: Meta

  readonly issuer?: Principal
  readonly proofs: Proof[]

  readonly signature: SignatureView<OutcomeModel<Ok, Error, Ran>, Alg>

  link(): Link<ReceiptModel<Ok, Error, Ran>, number, number, 1>
  verifySignature(signer: Crypto.Verifier): Await<Result<{}, SignatureError>>

  buildIPLDView(): Receipt<Ok, Error, Ran, Alg>
}

export interface SignatureError extends Error {}

export interface Meta extends Record<string, unknown> {}

/**
 * Represents invocation in pre-invocation spec, which is simply a UCAN
 * delegation with a single capability.
 */
export type ImpliedInvocationModel<C extends Capability = Capability> =
  UCAN.UCAN<[C]>

/**
 * Currently we represent effects in non-standard format that uses links to
 * {@link ImpliedInvocationModel} as opposed {@link InstructionModel}. We do
 * such a representation because we do not have an invocation spec implemented
 * yet and most things expect {@link ImpliedInvocationModel} in place if
 * invocations & instructions.
 */
export interface EffectsModel {
  fork: readonly Link<ImpliedInvocationModel>[]
  join?: Link<ImpliedInvocationModel>
}

export interface Effects {
  fork: readonly Effect[]
  join?: Effect
}

export interface InstructionModel<
  Op extends Ability = Ability,
  URI extends Resource = Resource,
  Input extends Record<string, unknown> = Record<string, unknown>
> {
  op: Op
  rsc: URI
  input: Input
  nnc: string
}

/**
 * View over an {@link InstructionModel} DAG, providing some sugar for the API.
 */
export interface Instruction<
  Op extends Ability = Ability,
  URI extends Resource = Resource,
  Input extends Record<string, unknown> = Record<string, unknown>
> extends InstructionModel<Op, URI, Input>,
    IPLDView<InstructionModel<Op, URI, Input>> {
  readonly nonce: string
}

export interface TaskModel<Run extends InstructionModel = InstructionModel> {
  run: Link<Run>
  meta: Meta
  prf: UCANLink[]

  cause?: Link<ReceiptModel>
}

export interface Task<Run extends InstructionModel = InstructionModel>
  extends TaskModel<Run> {
  instruction: Instruction<Run['op'], Run['rsc'], Run['input']> | Link<Run>

  readonly proofs: Proof[]
}

export interface InvocationModel {
  task: TaskModel
  auth: Link<AuthorizationModel>
}

export interface AuthorizationModel<Alg extends SigAlg = SigAlg> {
  scope: Link[]
  s: Signature<this['scope'], Alg>
}

/**
 * Defines result type as per invocation spec
 *
 * @see https://github.com/ucan-wg/invocation/#6-result
 */

export type Result<T = unknown, X extends {} = {}> = Variant<{
  ok: T
  error: X
}>

/**
 * Defines result & effect pair, used by provider that wish to return
 * results that have effects.
 */
export type Transaction<T = unknown, X extends {} = {}> = Variant<{
  ok: T
  error: X
  do: Do<T, X>
}>

export type InferTransaction<T extends Transaction> = T extends Transaction<
  infer Ok,
  infer Error
>
  ? { ok: Ok; error: Error }
  : never

export type Run = Link<ImpliedInvocationModel>

/**
 * Effect is either an invocation or a link to one.
 */
export type Effect = Run | Invocation

export interface Do<T = unknown, X extends {} = {}> {
  out: Result<T, X>
  fx: Effects
}

export interface OkBuilder<T extends unknown = undefined, X extends {} = {}> {
  ok: T
  error?: undefined
  do?: undefined

  result: Result<T, X>
  effects: Effects

  fork(fx: Effect): ForkBuilder<T, X>
  join(fx: Effect): JoinBuilder<T, X>
}

export interface ErrorBuilder<
  T extends unknown = undefined,
  X extends {} = {}
> {
  ok?: undefined
  error: X
  do?: undefined

  result: Result<T, X>
  effects: Effects

  fork(fx: Effect): ForkBuilder<T, X>
  join(fx: Effect): JoinBuilder<T, X>
}

export interface ForkBuilder<T extends unknown = undefined, X extends {} = {}> {
  ok?: undefined
  error?: undefined
  do: Do<T, X>
  result: Result<T, X>
  effects: Effects

  fork(fx: Effect): ForkBuilder<T, X>
  join(fx: Effect): JoinBuilder<T, X>
}

export interface JoinBuilder<T extends unknown = unknown, X extends {} = {}> {
  ok?: undefined
  error?: undefined
  do: Do<T, X>
  result: Result<T, X>
  effects: Effects

  fork(fx: Effect): JoinBuilder<T, X>
}

/**
 * @see {@link https://en.wikipedia.org/wiki/Unit_type|Unit type - Wikipedia}
 */
export interface Unit {}

/**
 * Utility type for defining a [keyed union] type as in IPLD Schema. In practice
 * this just works around typescript limitation that requires discriminant field
 * on all variants.
 *
 * ```ts
 * type Result<T, X> =
 *   | { ok: T }
 *   | { error: X }
 *
 * const demo = (result: Result<string, Error>) => {
 *   if (result.ok) {
 *   //  ^^^^^^^^^ Property 'ok' does not exist on type '{ error: Error; }`
 *   }
 * }
 * ```
 *
 * Using `Variant` type we can define same union type that works as expected:
 *
 * ```ts
 * type Result<T, X> = Variant<{
 *   ok: T
 *   error: X
 * }>
 *
 * const demo = (result: Result<string, Error>) => {
 *   if (result.ok) {
 *     result.ok.toUpperCase()
 *   }
 * }
 * ```
 *
 * [keyed union]:https://ipld.io/docs/schemas/features/representation-strategies/#union-keyed-representation
 */
export type Variant<U extends Record<string, unknown>> = {
  [Key in keyof U]: { [K in Exclude<keyof U, Key>]?: never } & {
    [K in Key]: U[Key]
  }
}[keyof U]

/**
 * A {@link UCANOptions} instance that includes options specific to {@link Invocation}s.
 */
export interface InvocationOptions<C extends Capability = Capability>
  extends UCANOptions {
  /** The `issuer` of an invocation is the "caller" of the RPC method and the party that signs the invocation UCAN token. */
  issuer: UCAN.Signer

  /** The {@link Capability} that is being invoked. */
  capability: C
}

export interface IssuedInvocation<C extends Capability = Capability>
  extends IPLDViewBuilder<Invocation<C>> {
  readonly issuer: Principal
  readonly audience: Principal
  readonly capabilities: [C]

  readonly proofs: Proof[]

  delegate(): Await<Delegation<[C]>>

  /**
   * Attach a block to the invocation DAG so it would be included in the
   * block iterator.
   * ⚠️ You should only attach blocks that are referenced from the `capabilities`
   * or `facts`, if that is not the case you probably should reconsider.
   * ⚠️ Once a delegation is de-serialized the attached blocks will not be re-attached.
   */
  attach(block: Block): void
}

export type ServiceInvocation<
  C extends Capability = Capability,
  S = InvocationService<C>
> = IssuedInvocation<C> & ServiceInvocations<S>

export type InferInvocation<T extends ServiceInvocation> =
  T extends ServiceInvocation<infer C> ? Invocation<C> : never

export type InferInvocations<T extends Tuple> = T extends [
  ServiceInvocation<infer C>,
  infer Next,
  ...infer Rest
]
  ? [Invocation<C>, ...InferInvocations<[Next, ...Rest]>]
  : T extends [ServiceInvocation<infer C>]
  ? [Invocation<C>]
  : never

/**
 * An invocation handler, as returned by {@link @ucanto/server#provide | `Server.provide` }.
 *
 * @typeParam I - the {@link Capability} type accepted by the handler
 * @typeParam O - type returned by the handler on success
 * @typeParam X - type returned by the handler on error
 */
export interface ServiceMethod<
  I extends Capability,
  O extends {},
  X extends Failure
> {
  (input: Invocation<I>, context: InvocationContext): Await<
    Transaction<O, X | InvocationError>
  >
}

export interface ProviderInput<T extends ParsedCapability> {
  capability: T
  invocation: Invocation<Capability<T['can'], T['with'], T['nb']>>

  context: InvocationContext
}

export type ProviderMethod<
  I extends ParsedCapability,
  O extends Transaction
> = (input: ProviderInput<I>) => Await<O>

/**
 * Error types returned by the framework during invocation that are not
 * specific to any particular {@link ServiceMethod}.
 */
export type InvocationError =
  | HandlerNotFound
  | HandlerExecutionError
  | InvalidAudience
  | Unauthorized

export interface InvocationContext extends ValidatorOptions {
  id: Signer

  resolve?: (proof: UCANLink) => Await<Result<Delegation, UnavailableProof>>

  principal: PrincipalParser
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
  S extends Record<string, any>
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

export type InferReceipt<
  C extends Capability,
  S extends Record<string, any>
> = ResolveServiceMethod<S, C['can']> extends ServiceMethod<
  infer _,
  infer T,
  infer X
>
  ? Receipt<
      T & {},
      | X
      | HandlerNotFound
      | HandlerExecutionError
      | InvalidAudience
      | Unauthorized
    >
  : never

export type InferServiceInvocations<
  I extends unknown[],
  T extends Record<string, any>
> = I extends []
  ? []
  : I extends [ServiceInvocation<infer C, T>, ...infer Rest]
  ? [InferServiceInvocationReturn<C, T>, ...InferServiceInvocations<Rest, T>]
  : never

export type InferReceipts<
  I extends unknown[],
  T extends Record<string, any>
> = I extends []
  ? []
  : I extends [ServiceInvocation<infer C, T>, ...infer Rest]
  ? [InferReceipt<C, T>, ...InferReceipts<Rest, T>]
  : never

/**
 * Describes messages send across ucanto agents.
 */
export type AgentMessageModel<T> = Variant<{
  'ucanto/message@7.0.0': AgentMessageData<T>
}>

/**
 * Describes ucanto@7.0 message format send between (client/server) agents.
 *
 * @template T - Phantom type capturing types of the payload for the inference.
 */
export interface AgentMessageData<T> extends Phantom<T> {
  /**
   * Set of (invocation) delegation links to be executed by the agent.
   */
  execute?: Tuple<Link<UCAN.UCAN<[Capability]>>>

  /**
   * Map of receipts keyed by the (invocation) delegation.
   */
  report?: Record<ToString<UCANLink>, Link<ReceiptModel>>
}

export interface AgentMessageBuilder<T>
  extends IPLDViewBuilder<AgentMessage<T>> {}

export interface AgentMessage<T = unknown>
  extends IPLDView<AgentMessageModel<T>> {
  invocationLinks: Tuple<Link<UCAN.UCAN<[Capability]>>> | []
  receipts: Map<ToString<UCANLink>, Receipt>
  invocations: Invocation[]
  get<E = never>(link: Link, fallback?: E): Receipt | E
}

export interface ReportModel<T = unknown> extends Phantom<T> {
  receipts: Record<
    ToString<Link<ReceiptModel['ocm']['ran']>>,
    Link<ReceiptModel>
  >
}

export interface ReportBuilder<T>
  extends IPLDViewBuilder<IPLDView<ReportModel<T>>> {
  set(link: Link<InstructionModel>, receipt: Receipt): void
  entries(): IterableIterator<[ToString<Link<InstructionModel>>, Receipt]>
}

export interface Report<T> extends Phantom<T> {
  get<E = never>(link: Link<InstructionModel>, fallback: E): Receipt | E
}

export interface IssuedInvocationView<C extends Capability = Capability>
  extends IssuedInvocation<C> {
  delegate(): Await<Invocation<C>>
  execute<T extends InvocationService<C>>(
    service: ConnectionView<T>
  ): Await<InferReceipt<C, T>>
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

export interface Failure extends Error {}

export interface HandlerNotFound extends RangeError {
  capability: Capability
  name: 'HandlerNotFound'
}

export interface HandlerExecutionError extends Failure {
  capability: Capability
  cause: Error
  name: 'HandlerExecutionError'
}

export type API<T> = T[keyof T]

export interface OutboundCodec
  extends Transport.RequestEncoder,
    Transport.ResponseDecoder {}

/** @deprecated */
export interface OutboundTransportOptions extends OutboundCodec {}

export interface ConnectionOptions<T extends Record<string, any>>
  extends Transport.EncodeOptions {
  /**
   * DID of the target service.
   */
  readonly id: Principal
  readonly codec: OutboundCodec
  readonly channel: Transport.Channel<T>
}

export interface Connection<T extends Record<string, any>>
  extends Phantom<T>,
    ConnectionOptions<T> {
  /**
   * DID of the target service.
   */
  readonly id: Principal
  readonly hasher: MultihashHasher
}

export interface ConnectionView<T extends Record<string, any>>
  extends Connection<T> {
  id: Principal
  execute<
    C extends Capability,
    I extends Transport.Tuple<ServiceInvocation<C, T>>
  >(
    ...invocations: I
  ): Await<InferReceipts<I, T>>
}

export interface InboundAcceptCodec {
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

export interface InboundCodec {
  accept(request: Transport.HTTPRequest): Result<InboundAcceptCodec, HTTPError>
}

export interface HTTPError {
  readonly status: number
  readonly statusText?: string
  readonly headers?: Record<string, string>
  readonly message?: string
}

/**
 * Options for UCAN validation.
 */
export interface ValidatorOptions {
  /**
   * Takes principal parser that can be used to turn a `UCAN.Principal`
   * into `Ucanto.Principal`.
   */
  readonly principal?: PrincipalParser

  readonly canIssue?: CanIssue['canIssue']
  readonly resolve?: InvocationContext['resolve']
  validateAuthorization: (proofs: Authorization) => Await<Result<Unit, Revoked>>
}

export interface ServerOptions<T> extends ValidatorOptions {
  /**
   * Service DID which will be used to verify that received invocation
   * audience matches it.
   */
  readonly id: Signer

  readonly codec: InboundCodec

  /**
   * Actual service providing capability handlers.
   */
  readonly service: T

  readonly catch?: (err: HandlerExecutionError) => void
}

/**
 * A definition for a {@link Service}, combined with an optional
 * handler method for execution errors.
 *
 * Used as input to {@link @ucanto/server#create | `Server.create` } when
 * defining a service implementation.
 */
export interface Server<T> extends ServerOptions<T> {
  readonly context: InvocationContext
  readonly catch: (err: HandlerExecutionError) => void
}

/**
 * A materialized {@link Server} that is configured to use a specific
 * transport channel. The `ServerView` has an {@link InvocationContext}
 * which contains the DID of the service itself, among other things.
 *
 * Returned by {@link @ucanto/server#create | `Server.create` } when instantiating
 * a server.
 */
export interface ServerView<T extends Record<string, any>>
  extends Server<T>,
    Transport.Channel<T> {
  run<C extends Capability>(
    invocation: ServiceInvocation<C, T>
  ): Await<InferReceipt<C, T>>
}

/**
 * A mapping of service names to handlers, used to define a service implementation.
 *
 * See {@link Server}, which wraps a `Service` and is used by {@link @ucanto/server/create}.
 */
export type Service = Record<
  string,
  (input: Invocation<any>) => Promise<Result<any, any>>
>

/**
 * Something that can be `await`ed to get a value of type `T`.
 */
export type Await<T> = T | PromiseLike<T> | Promise<T>

/**
 * A string literal type that matches the "scheme" portion of a URI.
 */
export type Protocol<Scheme extends string = string> = `${Scheme}:`

/**
 * A typed string representing a URI of a given protocol.
 *
 * @template P - The protocol (scheme) of the given uri. For example, `did:key:foo` has the protocol of `did`.
 */
export type URI<P extends Protocol = Protocol> = `${P}${string}` &
  // ⚠️ Without phantom type TS does not seem to retain `P` type
  // resulting in `${string}${string}` instead.
  Phantom<{
    protocol: P
  }>

export interface ComposedDIDParser extends PrincipalParser {
  or(parser: PrincipalParser): ComposedDIDParser
}

/**
 * A `PrincipalParser` provides {@link Verifier} instances that can validate UCANs issued
 * by a given {@link Principal}.
 */
export interface PrincipalParser {
  parse(did: UCAN.DID): Verifier
}

/**
 * A `PrincipalResolver` is used to resolve a key of the principal that is
 * identified by DID different from did:key method. It can be passed into a
 * UCAN validator in order to augmented it with additional DID methods support.
 */
export interface PrincipalResolver {
  resolveDIDKey?: (
    did: UCAN.DID
  ) => Await<Result<DIDKey, DIDKeyResolutionError>>
}

/**
 * Represents component that can create a signer from it's archive. Usually
 * signer module would provide `from` function and therefor be an implementation
 * of this interface.
 *
 * Library also provides utility functions for combining multiple
 * SignerImporters into one.
 *
 * @template ID - DID that can be imported, which may be a type union.
 * @template Alg - Multicodec code corresponding to signature algorithm.
 */
export interface SignerImporter<
  ID extends DID = DID,
  Alg extends SigAlg = SigAlg
> {
  from(archive: SignerArchive<ID, Alg>): Signer<ID, Alg>
}

export interface CompositeImporter<
  Variants extends [SignerImporter, ...SignerImporter[]]
> {
  from: Intersection<Variants[number]['from']>
  or<Other extends SignerImporter>(
    other: Other
  ): CompositeImporter<[Other, ...Variants]>
}

export interface Importer<Self extends Signer = Signer> {
  from(archive: Archive<Self>): Self
}

export interface Archive<Self extends Signer> {
  id: ReturnType<Signer['did']>
  keys: { [Key: DIDKey]: KeyArchive<Signer['signatureCode']> }
}
/**
 * Principal that can issue UCANs (and sign payloads). While it's primary role
 * is to sign payloads it also extends `Verifier` interface so it could be used
 * to verifying signed payloads as well.
 */
export interface Signer<ID extends DID = DID, Alg extends SigAlg = SigAlg>
  extends UCAN.Signer<ID, Alg>,
    Verifier<ID, Alg> {
  /**
   * The `signer` field is a self reference (usually a getter). It's sole
   * purpose is to allow splitting signer and verifier through destructuring.
   *
   * @example
   * ```js
   * import * as Principal from "@ucanto/principal"
   *
   * const { signer, verifier } = Principal.from(archive)
   * ```
   */
  signer: Signer<ID, Alg>

  /**
   * The `verifier` field just like the `signer` exists to allow splitting
   * them apart through destructuring.
   */
  verifier: Verifier<ID, Alg>

  /**
   * Returns archive of this signer which will have keys byte encoded when
   * underlying keys are extractable or in {@link CryptoKey} form otherwise.
   *
   * This allows a storing non extractable archives into indexedDB and storing
   * extractable archives on disk ofter serializing them using IPLD code.
   *
   * This aligns with a best practice that in browsers inextricable keys should
   * be used and extractable keys in node.
   *
   * @example
   * ```ts
   * import * as CBOR from '@ipld/dag-cbor'
   *
   * const save = async (signer: Signer) => {
   *   const archive = signer.toArchive()
   *   if (globalThis.indexedDB) {
   *     await IDB_OBJECT_STORE.add(archive)
   *   } else {
   *     await fs.writeFile(KEY_PATH, CBOR.encode(archive))
   *   }
   * }
   * ```
   */
  toArchive(): SignerArchive<ID, Alg>

  /**
   * Wraps key of this signer into a signer with a different DID. This is
   * primarily used to wrap {@link SignerKey} into a {@link Signer} that has
   * {@link did} of different method.
   *
   * @example
   *
   * ```ts
   * import { ed25519 } from "@ucanto/principal"
   *
   * const demo = async () => {
   *   const key = await ed25519.generate()
   *   key.did() // 'did:key:z6Mkqa4oY9Z5Pf5tUcjLHLUsDjKwMC95HGXdE1j22jkbhz6r'
   *   const gozala = key.withDID('did:web:gozala.io')
   *   gozala.did() // 'did:web:gozala.io'
   * }
   * ```
   * [did:key]:https://w3c-ccg.github.io/did-method-key/
   */
  withDID<ID extends DID>(id: ID): Signer<ID, Alg>
}

/**
 * Principal that issued a UCAN. In usually represents remote principal and is
 * used to verify that certain payloads were signed by it.
 */
export interface Verifier<ID extends DID = DID, Alg extends SigAlg = SigAlg>
  extends UCAN.Verifier<ID, Alg> {
  /**
   * Returns unwrapped did:key of this principal.
   */
  toDIDKey(): DIDKey
  /**
   * Wraps key of this verifier into a verifier with a different DID. This is
   * primarily used to wrap {@link VerifierKey} into a {@link Verifier} that has
   * {@link did} of different method.
   */
  withDID<ID extends DID>(id: ID): Verifier<ID, Alg>
}

/**
 * Represents [`did:key`] identifier.
 *
 * [`did:key`]:https://w3c-ccg.github.io/did-method-key/
 */
export type DIDKey = DID<'key'>

/**
 * {@link Signer} corresponding to [`did:key`] identified principal.
 *
 * [`did:key`]:https://w3c-ccg.github.io/did-method-key/
 */
export interface SignerKey<Alg extends SigAlg = SigAlg>
  extends Signer<DIDKey, Alg> {}

/**
 * {@link Verifier} corresponding to [`did:key`] identified principal.
 *
 * [`did:key`]:https://w3c-ccg.github.io/did-method-key/
 */
export interface VerifierKey<Alg extends SigAlg = SigAlg>
  extends Verifier<DIDKey, Alg> {}

/**
 * {@link Signer} keys and it's DID that can be used for persist and restore
 * signer across sessions.
 */
export interface SignerArchive<
  ID extends DID = DID,
  Alg extends SigAlg = SigAlg
> {
  /**
   * [DID Subject](https://www.w3.org/TR/did-core/#did-subject) for this
   * signer.
   */
  id: ID

  /**
   * Set of private keys this signer uses keyed by corresponding [did:key][].
   *
   * ⚠️ At the moment signers only support single key use case, however we may
   * change that in the future, which is why data model is forward designed to
   * support multiple keys.
   *
   * [did:key]:https://w3c-ccg.github.io/did-method-key/
   */
  keys: { [Key: DIDKey]: KeyArchive<Alg> }
}

/**
 * Represents a private key which will be in `CryptoKey` format if it is
 * non-extractable or is byte encoded when extractable.
 */
export type KeyArchive<Alg extends SigAlg = SigAlg> =
  | CryptoKey
  | ByteView<SignerKey<Alg> & CryptoKey>

export type InferInvokedCapability<
  C extends CapabilityParser<Match<ParsedCapability>>
> = C extends CapabilityParser<Match<infer T>>
  ? InferCapability<T & Capability>
  : never

export type Intersection<T> = (T extends any ? (i: T) => void : never) extends (
  i: infer I
) => void
  ? I
  : never
