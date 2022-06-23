import type { Logging } from './utils/logging'
import type { SigningAuthority } from '@ucanto/interface'

export {}

declare global {
  const PRIVATE_KEY: string
  const ENV: string
  const DEBUG: string
  const BRANCH: string
  const VERSION: string
  const COMMITHASH: string
  const ACCOUNTS: KVNamespace
}

export interface RouteContext {
  params: Record<string, string>
  log: Logging
  keypair: SigningAuthority
}

export type Handler = (
  event: FetchEvent,
  ctx: RouteContext
) => Promise<Response> | Response
