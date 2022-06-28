import { connection, mf, serviceAuthority, test } from './helpers/setup.js'
import { SigningAuthority } from '@ucanto/authority'
import * as UCAN from '@ipld/dag-ucan'
import { Accounts } from '../src/kvs/accounts.js'
import * as caps from '../src/ucanto/capabilities.js'
import { Delegation } from '@ucanto/server'

test.before((t) => {
  t.context = { mf }
})

test('register', async (t) => {
  const con = connection()
  const kp = await SigningAuthority.generate()

  const validate = caps.identityValidate.invoke({
    audience: serviceAuthority,
    issuer: kp,
    caveats: {
      as: 'mailto:hugo@dag.house',
    },
    with: kp.did(),
  })

  const out = await validate.execute(con)
  if (out?.error || !out) {
    return
  }
  const ucan = UCAN.parse(out.delegation)
  const root = await UCAN.write(ucan)
  const proof = Delegation.create({ root })

  const register = caps.identityRegister.invoke({
    audience: serviceAuthority,
    issuer: kp,
    with: proof.capabilities[0].with,
    caveats: {
      as: proof.capabilities[0].as,
    },
    proofs: [proof],
  })

  const result = await register.execute(con)

  const invocation = await register.delegate()
  t.deepEqual(result, null)
  // @ts-ignore
  const accounts = new Accounts(await mf.getKVNamespace('ACCOUNTS'))
  const email = await accounts.get('mailto:hugo@dag.house')
  t.is(email?.proof, invocation.cid.toString())

  const did = await accounts.get(kp.did())
  t.is(did?.proof, invocation.cid.toString())
})

test.only('identify', async (t) => {
  const con = connection()
  const kp = await SigningAuthority.generate()

  const validate = caps.identityValidate.invoke({
    audience: serviceAuthority,
    issuer: kp,
    caveats: {
      as: 'mailto:hugo@dag.house',
    },
    with: kp.did(),
  })

  const out = await validate.execute(con)
  if (out?.error || !out) {
    return
  }
  const ucan = UCAN.parse(out.delegation)
  const root = await UCAN.write(ucan)
  const proof = Delegation.create({ root })

  const register = caps.identityRegister.invoke({
    audience: serviceAuthority,
    issuer: kp,
    with: proof.capabilities[0].with,
    caveats: {
      as: proof.capabilities[0].as,
    },
    proofs: [proof],
  })

  const result = await register.execute(con)

  const invocation = await register.delegate()
  t.deepEqual(result, null)

  const identify = caps.identityIdentify.invoke({
    audience: serviceAuthority,
    issuer: kp,
    with: kp.did(),
  })

  const identifyResult = await identify.execute(con)
  console.log(
    '🚀 ~ file: identity-register.test.js ~ line 99 ~ test.only ~ identifyResult',
    identifyResult
  )
})

// test('should route correctly to identity/register', async (t) => {
//   const { mf } = t.context
//   const kp = await ucans.EdKeypair.create()

//   const validateUcan = await ucans.build({
//     issuer: kp,
//     audience: serviceKp.did(),
//     lifetimeInSeconds: 1000,
//     capabilities: [
//       {
//         with: { scheme: 'mailto', hierPart: 'hugo@dag.house' },
//         can: { namespace: 'identity', segments: ['validate'] },
//       },
//     ],
//   })

//   const res = await mf.dispatchFetch('http://localhost:8787', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${ucans.encode(validateUcan)}`,
//     },
//   })
//   const rsp = await res.json()
//   const jwt = rsp.value
//   const registerUCAN = await ucans.build({
//     issuer: kp,
//     audience: serviceKp.did(),
//     lifetimeInSeconds: 1000,
//     capabilities: [
//       {
//         with: { scheme: 'did:email', hierPart: 'hugo@dag.house' },
//         can: { namespace: 'identity', segments: ['register'] },
//       },
//     ],
//     proofs: [jwt],
//   })

//   const register = await mf.dispatchFetch('http://localhost:8787', {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${ucans.encode(registerUCAN)}`,
//     },
//   })
//   t.true(register.ok)

//   // @ts-ignore
//   const accounts = new Accounts(await mf.getKVNamespace('ACCOUNTS'))
//   const email = await accounts.get('did:email:hugo@dag.house')
//   t.is(email?.proof, ucans.encode(registerUCAN))

//   const did = await accounts.get(kp.did())
//   t.is(did?.proof, ucans.encode(registerUCAN))
// })
