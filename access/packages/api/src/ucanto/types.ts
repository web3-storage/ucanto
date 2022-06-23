import { RequestEncoder, ResponseDecoder } from '@ucanto/interface'

export interface ClientCodec extends RequestEncoder, ResponseDecoder {}
