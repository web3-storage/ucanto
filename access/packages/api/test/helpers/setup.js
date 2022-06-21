import { Log, LogLevel, Miniflare } from 'miniflare'
import anyTest from 'ava'

/**
 * @typedef {import("ava").TestFn<{mf: mf}>} TestFn
 */

// eslint-disable-next-line unicorn/prefer-export-from
export const test = /** @type {TestFn} */ (anyTest)

export const bindings = {
  _PRIVATE_KEY:
    'MgCbk99i7qW552YrG6ioSXEzqGbYTBDpTkLjOoTN0ZK0+N+0Bww4KEBX+SQR2c91VAj/KeXR1pQU36k1yoIBqTsmT+D8=',
}

export const mf = new Miniflare({
  packagePath: true,
  wranglerConfigPath: true,
  sourceMap: true,
  bindings,
  log: new Log(LogLevel.DEBUG),
})
