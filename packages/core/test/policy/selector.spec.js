import * as Selector from '../../src/policy/selector.js'
import Vector from './selector.vector.js'

/**
 * @type {import('entail').Suite}
 */
export const testSelector = Object.fromEntries(
  Vector.map(({ data, at, out, tag = '' }) => [
    `${tag}echo '${JSON.stringify(data)}' | jq '${at}'`,
    assert => {
      const result = Selector.select(at, data)
      if (out.error) {
        assert.match(result.error, out.error)
      } else {
        assert.deepEqual(result, out)
      }
    },
  ])
)
