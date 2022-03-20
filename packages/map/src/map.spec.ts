// noinspection JSVoidFunctionReturnValueUsed

import { SmartMap } from './map'
import { SmartMapItemDoesntExistError, SmartMapItemExistsError, SmartMapNotEmptyError } from './errors'


describe(`SmartMap`, () => {

  describe(`clear`, () => {

    describe(`with default options`, () => {

      it(`deletes all entries in a non-empty map and reports nothing`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const result = map.clear()
        expect([...map]).toEqual([])
        expect(result).toBeUndefined()
      })

      it(`does nothing in an empty map and reports nothing`, () => {
        const map = new SmartMap([])
        const result = map.clear()
        expect([...map]).toEqual([])
        expect(result).toBeUndefined()
      })

    })

    describe(`with explicit “ignore“ option`, () => {

      it(`deletes all entries in a non-empty map and reports nothing`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const result = map.clear({ ifEmpty: 'ignore' })
        expect([...map]).toEqual([])
        expect(result).toBeUndefined()
      })

      it(`does nothing in an empty map and reports nothing`, () => {
        const map = new SmartMap([])
        const result = map.clear({ ifEmpty: 'ignore' })
        expect([...map]).toEqual([])
        expect(result).toBeUndefined()
      })

    })

    describe(`with “ignore-but-report” option`, () => {

      it(`deletes all entries in a non-empty map and reports false`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const result = map.clear({ ifEmpty: 'ignore-but-report' })
        expect([...map]).toEqual([])
        expect(result).toBe(false)
      })

      it(`does nothing in a non-empty map and reports true`, () => {
        const map = new SmartMap([])
        const result = map.clear({ ifEmpty: 'ignore-but-report' })
        expect([...map]).toEqual([])
        expect(result).toBe(true)
      })

    })

    describe(`with “throw” option`, () => {

      it(`deletes all entries in a non-empty map and reports nothing`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const result = map.clear({ ifEmpty: 'throw' })
        expect([...map]).toEqual([])
        expect(result).toBeUndefined()
      })

      it(`throws when executed on an empty map`, () => {
        const map = new SmartMap([])
        const operation = () => map.clear({ ifEmpty: 'throw' })
        expect(operation).toThrowError(new SmartMapNotEmptyError(map))
      })

    })

  })

  describe(`delete`, () => {

    describe(`with default options`, () => {

      it(`deletes a known entry and reports true`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const result = map.delete('a')
        expect([...map]).toEqual([['b', 2]])
        expect(result).toBe(true)
      })

      it(`ignores an attempt to delete an unknown entry and reports false`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const result = map.delete('c')
        expect([...map]).toEqual([['a', 1], ['b', 2]])
        expect(result).toBe(false)
      })

    })

    describe(`with explicit “ignore-but-report” option`, () => {

      it(`deletes a known entry and reports true`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const result = map.delete('a', { ifNotFound: 'ignore-but-report' })
        expect([...map]).toEqual([['b', 2]])
        expect(result).toBe(true)
      })

      it(`ignores an attempt to delete an unknown entry and reports false`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const result = map.delete('c', { ifNotFound: 'ignore-but-report' })
        expect([...map]).toEqual([['a', 1], ['b', 2]])
        expect(result).toBe(false)
      })

    })

    describe(`with “throw” option`, () => {

      it(`deletes a known entry and reports nothing`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const result = map.delete('a', { ifNotFound: 'throw' })
        expect([...map]).toEqual([['b', 2]])
        expect(result).toBeUndefined()
      })

      it(`throws on an attempt to delete an unknown entry`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const operation = () => map.delete('c', { ifNotFound: 'throw' })
        expect(operation).toThrowError(new SmartMapItemDoesntExistError(map, 'c'))
      })


    })

  })

  describe(`get`, () => {

    describe(`with default options`, () => {

      it(`returns the value for a known key`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const result = map.get('a')
        expect(result).toBe(1)
      })

      it(`returns undefined for an unknown key`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const result = map.get('c')
        expect(result).toBeUndefined()
      })

    })

    describe(`with explicit “undefined” option`, () => {

      it(`returns the value for a known key`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const result = map.get('a', { ifNotFound: 'undefined' })
        expect(result).toBe(1)
      })

      it(`returns undefined for an unknown key`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const result = map.get('c', { ifNotFound: 'undefined' })
        expect(result).toBeUndefined()
      })

    })

    describe(`with “throw” option`, () => {

      it(`returns the value for a known key`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const result = map.get('a', { ifNotFound: 'throw' })
        expect(result).toBe(1)
      })

      it(`throws on an attempt to query an unknown key`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const operation = () => map.get('c', { ifNotFound: 'throw' })
        expect(operation).toThrowError(new SmartMapItemDoesntExistError(map, 'c'))
      })

    })

  })

  describe(`set`, () => {

    describe(`with default options`, () => {

      it(`adds a new entry when the key is unknown and returns the map`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const report = map.set('c', 3)
        expect([...map]).toEqual([['a', 1], ['b', 2], ['c', 3]])
        expect(report).toBe(map)
      })

      it(`overwrites a existing entry when the key is know and returns the map`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const report = map.set('a', 3)
        expect([...map]).toEqual([['a', 3], ['b', 2]])
        expect(report).toBe(map)
      })

    })

    describe(`with explicit “overwrite” option`, () => {

      it(`adds a new entry when the key is unknown and returns the map`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const report = map.set('c', 3, { ifExists: 'overwrite' })
        expect([...map]).toEqual([['a', 1], ['b', 2], ['c', 3]])
        expect(report).toBe(map)
      })

      it(`overwrites a existing entry when the key is know and returns the map`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const report = map.set('a', 3, { ifExists: 'overwrite' })
        expect([...map]).toEqual([['a', 3], ['b', 2]])
        expect(report).toBe(map)
      })

    })

    describe(`with “overwrite-but-report” option`, () => {

      it(`adds a new entry when the key is unknown and reports false`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const report = map.set('c', 3, { ifExists: 'overwrite-but-report' })
        expect([...map]).toEqual([['a', 1], ['b', 2], ['c', 3]])
        expect(report).toBe(false)
      })

      it(`overwrites a existing entry when the key is know and reports true`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const report = map.set('a', 3, { ifExists: 'overwrite-but-report' })
        expect([...map]).toEqual([['a', 3], ['b', 2]])
        expect(report).toBe(true)
      })

    })

    describe(`with “ignore” option`, () => {

      it(`adds a new entry when the key is unknown and returns the map`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const report = map.set('c', 3, { ifExists: 'ignore' })
        expect([...map]).toEqual([['a', 1], ['b', 2], ['c', 3]])
        expect(report).toBe(map)
      })

      it(`ignores a new entry when the key is know and returns the map`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const report = map.set('a', 3, { ifExists: 'ignore' })
        expect([...map]).toEqual([['a', 1], ['b', 2]])
        expect(report).toBe(map)
      })

    })

    describe(`with “ignore-but-report” option`, () => {

      it(`adds a new entry when the key is unknown and reports false`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const report = map.set('c', 3, { ifExists: 'ignore-but-report' })
        expect([...map]).toEqual([['a', 1], ['b', 2], ['c', 3]])
        expect(report).toBe(false)
      })

      it(`ignores a new entry when the key is know and reports true`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const report = map.set('a', 3, { ifExists: 'ignore-but-report' })
        expect([...map]).toEqual([['a', 1], ['b', 2]])
        expect(report).toBe(true)
      })

    })

    describe(`with “throw” option`, () => {

      it(`adds a new entry when the key is unknown and returns the map`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const report = map.set('c', 3, { ifExists: 'throw' })
        expect([...map]).toEqual([['a', 1], ['b', 2], ['c', 3]])
        expect(report).toBe(map)
      })

      it(`throws on an attempt to overwrite an existing entry`, () => {
        const map = new SmartMap([['a', 1], ['b', 2]])
        const operation = () => map.set('a', 3, { ifExists: 'throw' })
        expect(operation).toThrowError(new SmartMapItemExistsError(map, 'a'))
      })

    })

  })

})
