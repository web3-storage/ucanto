import { sha256 } from '@noble/hashes/sha256'
import { derive } from './hasher.js'

export const { name, code, create, digestStream } = derive({
  name: 'sha2-512',
  code: 0x12,
  hasher: sha256,
})
