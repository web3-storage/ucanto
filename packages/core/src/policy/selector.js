import * as API from './api.js'

/**
 *
 * @param {API.Selector} selector
 * @param {API.Data} subject
 * @returns {API.SelectionResult}
 */
export const select = (selector, subject) => {
  const { error, ok: path } = parse(selector)
  if (error) {
    return { error }
  } else {
    return resolve(path, subject)
  }
}

/**
 * @param {API.SelectorSegment[]} path
 * @param {API.Data} subject
 * @param {(string|number)[]} [at]
 * @returns {API.ResolutionResult}
 */
export const resolve = (path, subject, at = []) => {
  let current = subject
  for (const [offset, segment] of path.entries()) {
    if (segment.Identity) {
      continue
    }
    // If the segment is iterator, we are going to descend into the members of
    // the current object or array.
    else if (segment.Iterator) {
      const many = []
      // However if we can only descend if the current subject is an object or
      // an array.
      if (current && typeof current === 'object') {
        const subpath = path.slice(offset + 1)
        const keys = Array.isArray(current)
          ? current.keys()
          : Object.keys(current).sort()
        for (const key of keys) {
          const member = current[/** @type {keyof current} */ (key)]
          const result = resolve(subpath, member, [...at, key])
          if (result.error) {
            return result
          } else if (result.many) {
            many.push(...result.many)
          } else {
            many.push(result.one)
          }
        }
        return { many }
      } else {
        return {
          error: new ResolutionError({
            reason: `Can not iterate over ${typeof current}`,
            at,
          }),
        }
      }
    } else if (segment.Index) {
      const { index, optional } = segment.Index
      at.push(index)
      if (isIndexed(current)) {
        current = index < 0 ? current[current.length + index] : current[index]
        if (current === undefined) {
          if (optional) {
            current = null
          } else {
            return {
              error: new ResolutionError({
                at,
                reason: `Index ${index} is out of bounds`,
              }),
            }
          }
        }
      } else if (optional) {
        current = null
      } else {
        return {
          error: new ResolutionError({
            reason: `Can not index ${
              current === null ? null : typeof current
            } with number ${index}`,
            at,
          }),
        }
      }
    } else if (segment.Key) {
      const { key, optional } = segment.Key
      at.push(key)
      if (isDictionary(current)) {
        current = current[key]
        if (current === undefined) {
          if (optional) {
            current = null
          } else {
            return {
              error: new ResolutionError({
                at,
                reason: `Object has no property named ${JSON.stringify(key)}`,
              }),
            }
          }
        }
      } else if (optional) {
        current = null
      } else {
        return {
          error: new ResolutionError({
            reason: `Can not access field ${JSON.stringify(key)} on ${typeOf(
              current
            )}`,
            at,
          }),
        }
      }
    } else if (segment.Slice) {
      const { range, optional } = segment.Slice
      const [start = 0, end] = range
      if (isIndexed(current)) {
        current = current.slice(start, end)
      } else if (optional) {
        current = null
      } else {
        return {
          error: new ResolutionError({
            reason: `Can not slice from ${typeof current}`,
            at,
          }),
        }
      }
    }
  }

  return { one: current }
}

/**
 * @param {API.Data} value
 */
const typeOf = value => {
  if (value === null) {
    return 'null'
  } else if (ArrayBuffer.isView(value)) {
    return 'bytes'
  } else if (Array.isArray(value)) {
    return 'array'
  } else {
    return typeof value
  }
}

/**
 * @param {unknown} value
 * @returns {value is API.ListData|Uint8Array|string}
 */
const isIndexed = value =>
  ArrayBuffer.isView(value) || Array.isArray(value) || typeof value === 'string'

/**
 * @param {API.Data} value
 * @returns {value is API.Dictionary}
 */
const isDictionary = value => typeOf(value) === 'object'

export const Identity = '.'
export const Iterator = '[]'
export const OptionalIterator = '[]?'

/**
 * @param {API.Selector} selector
 * @returns {Iterable<string>}
 */
export function* tokenize(selector) {
  const { length } = selector
  let offset = 0
  let column = 0
  let context = ''

  while (column < length) {
    const char = selector[column]
    if (char === '"' && selector[column - 1] !== '\\') {
      column++
      context = context === '"' ? '' : '"'
      continue
    }

    if (context === '"') {
      column++
      continue
    }

    switch (char) {
      case '.': {
        if (offset < column) {
          yield selector.slice(offset, column)
        }
        offset = column
        column++
        break
      }
      case '[': {
        if (offset < column) {
          yield selector.slice(offset, column)
        }
        offset = column
        column++
        break
      }
      default: {
        column++
      }
    }
  }

  if (offset < column && context != '"') {
    yield selector.slice(offset, column)
  }
}

/** @type {API.SelectorSegment} */
const IDENTITY = { Identity: {} }

/**
 *
 * @param {API.Selector} source
 * @returns {API.SelectorParseResult}
 */
export const parse = source => {
  if (source[0] !== Identity) {
    return {
      error: new ParseError({
        reason: `Selector must start with identity segment "."`,
        source: source,
        column: 0,
        token: source[0],
      }),
    }
  }

  /** @type {API.SelectorSegment[]} */
  const segments = []
  let token = ''
  let column = 0
  for (token of tokenize(source)) {
    const trimmed = token.replace(/\s+/g, '')
    const optional = trimmed[trimmed.length - 1] === '?'
    const segment = optional ? trimmed.slice(0, -1) : trimmed
    switch (segment) {
      case Identity: {
        if (segments[segments.length - 1] === IDENTITY) {
          return {
            error: new ParseError({
              source,
              reason: `Selector contains unsupported recursive descent segment ".."`,
              column,
              token,
            }),
          }
        }
        segments.push(IDENTITY)
        break
      }
      case Iterator: {
        segments.push({ Iterator: { optional } })
        break
      }
      default: {
        if (segment[0] === '[' && segment[segment.length - 1] === ']') {
          const lookup = segment.slice(1, -1)
          // Is it an indexed access e.g. [3]
          if (/^-?\d+$/.test(lookup)) {
            segments.push({
              Index: { optional, index: parseInt(lookup, 10) },
            })
          }
          // Is it a quoted key access e.g. ["key"]
          else if (lookup[0] === '"' && lookup[lookup.length - 1] === '"') {
            segments.push({
              Key: { optional, key: lookup.slice(1, -1).replace(/\\\"/g, '"') },
            })
          }
          // Is this a slice access e.g. [3:5] or [:5] or [3:]
          else if (/^((\-?\d+:\-?\d*)|(\-?\d*:\-?\d+))$/.test(lookup)) {
            const [left, right] = lookup.split(':')
            const start = left !== '' ? parseInt(left, 10) : undefined
            const end = right !== '' ? parseInt(right, 10) : undefined
            segments.push({
              Slice: {
                optional,
                range: /** @type {[number, number]} */ ([start, end]),
              },
            })
          }
          // Otherwise this is an error
          else {
            return {
              error: new ParseError({
                source,
                column,
                token,
              }),
            }
          }
        } else if (/^\.[a-zA-Z_]*?$/.test(segment)) {
          segments.push({
            Key: { optional, key: segment.slice(1) },
          })
        } else {
          return {
            error: new ParseError({
              source,
              column,
              token,
            }),
          }
        }
      }
    }
    column += token.length
  }

  if (column < source.length) {
    return {
      error: new ParseError({
        source,
        reason: `Unterminated string literal`,
        column: column - token.length,
        token: token,
      }),
    }
  }

  return { ok: /** @type {API.SelectorPath} */ (segments) }
}

class ParseError extends SyntaxError {
  /**
   * @param {object} input
   * @param {string} [input.reason]
   * @param {string} input.source
   * @param {string} input.token
   * @param {number} input.column
   *
   */
  constructor({
    source,
    column,
    token,
    reason = `Selector contains invalid segment:\n  "${source}"\n  ${' '.repeat(
      column
    )} ${'~'.repeat(token.length)}`,
  }) {
    super(reason)
    this.reason = reason
    this.source = source
    this.column = column
    this.token = token
  }
  name = /** @type {const} */ ('ParseError')
}

class ResolutionError extends ReferenceError {
  /**
   * @param {object} input
   * @param {string} [input.reason]
   * @param {(string|number)[]} input.at
   */
  constructor({ at, reason = `Can not resolve path ${at.join('')}` }) {
    super(reason)
    this.reason = reason
    this.at = at
  }

  name = /** @type {const} */ ('ResolutionError')
}
