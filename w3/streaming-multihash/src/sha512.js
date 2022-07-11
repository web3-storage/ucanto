import { sha512 } from '@noble/hashes/sha512'
import { derive } from './hasher.js'

export const { name, code, create, digestStream } = derive({
  name: 'sha2-512',
  code: 0x13,
  hasher: sha512,
})
