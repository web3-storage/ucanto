import { bindings, mf, test } from './helpers/setup.js'
import * as UCAN from '@ipld/dag-ucan'
import { SigningAuthority } from '@ucanto/authority'

test.before((t) => {
  t.context = { mf }
})

test('should fail with now header', async (t) => {
  const { mf } = t.context
  const res = await mf.dispatchFetch('http://localhost:8787', {
    method: 'POST',
  })
  const rsp = await res.json()
  t.deepEqual(rsp, {
    ok: false,
    error: { code: 'HTTP_ERROR', message: 'bearer missing.' },
  })
  t.is(res.status, 400)
})

test('should fail with bad ucan', async (t) => {
  const { mf } = t.context

  const res = await mf.dispatchFetch('http://localhost:8787', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ss`,
    },
  })
  const rsp = await res.json()
  t.deepEqual(rsp, {
    ok: false,
    error: {
      code: 'HTTP_ERROR',
      message:
        "Can't parse UCAN: ss: Expected JWT format: 3 dot-separated base64url-encoded values.",
    },
  })
})

test.only('should fail with 0 caps', async (t) => {
  const { mf } = t.context

  const kp = await SigningAuthority.generate()
  const kpService = SigningAuthority.parse(bindings._PRIVATE_KEY)

  const ucan = await UCAN.issue({
    issuer: kp,
    audience: kpService,
    capabilities: [],
  })
  const res = await mf.dispatchFetch('http://localhost:8787', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${UCAN.format(ucan)}`,
    },
  })
  const rsp = await res.json()
  console.log('🚀 ~ file: ucan.test.js ~ line 59 ~ test.only ~ rsp', rsp)
  // t.deepEqual(rsp, {
  //   ok: false,
  //   error: { code: 'Error', message: 'invocation should have 1 cap.' },
  // })
})

// test('should fail with 0 caps', async (t) => {
//   const { mf } = t.context
//   const kp = await ucans.EdKeypair.create()
//   const ucan = await ucans.build({
//     audience: serviceKp.did(),
//     issuer: kp,
//   })
//   const res = await mf.dispatchFetch('http://localhost:8787', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${ucans.encode(ucan)}`,
//     },
//   })
//   const rsp = await res.json()
//   t.deepEqual(rsp, {
//     ok: false,
//     error: { code: 'Error', message: 'invocation should have 1 cap.' },
//   })
// })

// test('should fail with more than 1 cap', async (t) => {
//   const { mf } = t.context
//   const kp = await ucans.EdKeypair.create()
//   const ucan = await ucans.build({
//     audience: serviceKp.did(),
//     issuer: kp,
//     capabilities: [
//       {
//         can: { namespace: 'access', segments: ['identify'] },
//         with: { scheme: 'mailto', hierPart: 'alice@mail.com' },
//       },
//       {
//         can: { namespace: 'access', segments: ['identify'] },
//         with: { scheme: 'mailto', hierPart: 'alice@mail.com' },
//       },
//     ],
//   })
//   const res = await mf.dispatchFetch('http://localhost:8787', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${ucans.encode(ucan)}`,
//     },
//   })
//   const rsp = await res.json()
//   t.deepEqual(rsp, {
//     ok: false,
//     error: { code: 'Error', message: 'invocation should have 1 cap.' },
//   })
// })
