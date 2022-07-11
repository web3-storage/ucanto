import { Identity, Accounting, Store } from 'w3-store'
import * as HTTP from 'node:http'
import { script } from 'subprogram'

/**
 * @typedef {{
 *   w3storeKepair: string
 *   w3idKepair: string
 *   url: URL
 * }} Config
 * @param {Partial<Config>} config
 */
export const main = async ({
  w3storeKepair = process.env.W3_STORE_KEYPAIR ||
    'MgCZ+Sw7psm7xsVmvIqToSJSKcwNUextBonLkTaAycDlCVe0BoSdzzwY8vi0gpTGo7EjcTGqvWEjBOQGreE0TWpDPbWo=',
  w3idKepair = process.env.W3_ID_KEYPAIR ||
    'MgCYfUUr1JN+q9mX1JEp5hteX7v+Xe2LqRCFa4iPMIgVrf+0BLGRATq2sd8qCBXb6IvKw7mi+8oKZ20gCHKtjaPPzl20=',
  url = new URL(process.env.SERVICE_URL || 'http://localhost:8080'),
} = {}) => {
  const provider = Store.create({
    keypair: w3storeKepair,
    accounting: Accounting.create(),
    identity: Identity.create({ keypair: w3idKepair }).connect(),
    signingOptions: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || 'id',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || 'secret',
      region: process.env.AWS_REGION || 'us-east-2',
      bucket: process.env.S3_BUCKET || 'my-test-bucket',
    },
  })

  HTTP.createServer(async (request, response) => {
    const chunks = []
    for await (const chunk of request) {
      chunks.push(chunk)
    }

    const { headers, body } = await provider.request({
      // @ts-ignore - node type is badly typed
      headers: request.headers,
      body: Buffer.concat(chunks),
    })

    response.writeHead(200, headers)
    response.write(body)
    response.end()
  }).listen(parseInt(url.port))

  console.log(
    `Service ${provider.id.did()} is running on http://localhost:${url.port}`
  )
}

script({ ...import.meta, main, dotenv: true })
