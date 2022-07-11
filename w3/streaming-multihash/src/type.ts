import type { MultihashDigest } from 'multiformats/hashes/interface'

export interface StreamingMultihashHasher<Code extends number = number> {
  /**
   * Name of the multihash
   */
  readonly name: string

  /**
   * Code of the multihash
   */
  readonly code: Code
  
  /**
   * Takes binary `input` stream and computes it's (multi) hash digest by consuming it.
   * Return value is either promise of a digest or a digest.
   */
  digestStream(input:AwaitIterable<Uint8Array>): Await<MultihashDigest<Code>>

  create(): StreamingHasher<Code>
}

export interface StreamingHasher<Code extends number = number> {
  write(input: Uint8Array): this
  close(): Await<MultihashDigest<Code>>
}

export type AwaitIterable<T> = Iterable<Await<T>> | AsyncIterable<T>

export type Await<T> = T | PromiseLike<T>

export interface RawHasher {
  update(input: Uint8Array): this
  digest(): Uint8Array
}
