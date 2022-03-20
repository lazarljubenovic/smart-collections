// noinspection JSVoidFunctionReturnValueUsed

import { SmartSet } from './set'
import { SmartSetItemDoesntExistError, SmartSetItemExistsError, SmartSetNotEmptyError } from './errors'


describe(`SmartSet`, () => {

  describe(`add`, () => {

    describe(`without options`, () => {

      it(`adds a previously unknown item and returns the set`, () => {
        const set = new SmartSet([1, 2])
        const report = set.add(3)
        expect([...set]).toEqual([1, 2, 3])
        expect(report).toBe(set)
      })

      it(`ignores an already known item and returns the set`, () => {
        const set = new SmartSet([1, 2])
        const report = set.add(1)
        expect([...set]).toEqual([1, 2])
        expect(report).toBe(set)
      })

    })

    describe(`with explicit default “ignore” option`, () => {

      it(`adds a previously unknown item and returns the set`, () => {
        const set = new SmartSet([1, 2])
        const report = set.add(3, { ifExists: 'ignore' })
        expect([...set]).toEqual([1, 2, 3])
        expect(report).toBe(set)
      })

      it(`ignores an already known item and returns the set`, () => {
        const set = new SmartSet([1, 2])
        const report = set.add(1, { ifExists: 'ignore' })
        expect([...set]).toEqual([1, 2])
        expect(report).toBe(set)
      })

    })

    describe(`with “ignore-but-report” option`, () => {

      it(`adds a previously unknown item and reports that the value didn't previously exist`, () => {
        const set = new SmartSet([1, 2])
        const report = set.add(3, { ifExists: 'ignore-but-report' })
        expect([...set]).toEqual([1, 2, 3])
        expect(report).toBe(false)
      })

      it(`ignores an already known item and reports that the value already existed`, () => {
        const set = new SmartSet([1, 2])
        const report = set.add(1, { ifExists: 'ignore-but-report' })
        expect([...set]).toEqual([1, 2])
        expect(report).toBe(true)
      })

    })

    describe(`with “throw” option`, () => {

      it(`adds a previously unknown item and return the set`, () => {
        const set = new SmartSet([1, 2])
        const report = set.add(3, { ifExists: 'throw' })
        expect([...set]).toEqual([1, 2, 3])
        expect(report).toBe(set)
      })

      it(`throws on attempt to add an already known item`, () => {
        const set = new SmartSet([1, 2])
        const operation = () => set.add(1, { ifExists: 'throw' })
        expect(operation).toThrowError(new SmartSetItemExistsError(set, 1))
      })

    })

  })

  describe(`clear`, () => {

    describe(`without options`, () => {

      it(`clears a non-empty set and returns nothing`, () => {
        const set = new SmartSet([1, 2])
        const report = set.clear()
        expect([...set]).toEqual([])
        expect(report).toBeUndefined()
      })

      it(`does nothing to an already empty set and returns nothing`, () => {
        const set = new SmartSet()
        const report = set.clear()
        expect([...set]).toEqual([])
        expect(report).toBeUndefined()
      })

    })

    describe(`with explicit default “ignore” option`, () => {

      it(`clears a non-empty set and returns nothing`, () => {
        const set = new SmartSet([1, 2])
        const report = set.clear({ ifEmpty: 'ignore' })
        expect([...set]).toEqual([])
        expect(report).toBeUndefined()
      })

      it(`does nothing to an already empty set and returns nothing`, () => {
        const set = new SmartSet([])
        const report = set.clear({ ifEmpty: 'ignore' })
        expect([...set]).toEqual([])
        expect(report).toBeUndefined()
      })

    })

    describe(`with “ignore-but-report” option`, () => {

      it(`clears a non-empty set and reports it was not empty`, () => {
        const set = new SmartSet([1, 2])
        const report = set.clear({ ifEmpty: 'ignore-but-report' })
        expect([...set]).toEqual([])
        expect(report).toBe(false)
      })

      it(`does nothing to an already empty set and returns that it was empty`, () => {
        const set = new SmartSet([])
        const report = set.clear({ ifEmpty: 'ignore-but-report' })
        expect([...set]).toEqual([])
        expect(report).toBe(true)
      })

    })

    describe(`with “throw” option`, () => {

      it(`clears a non-empty set and returns nothing`, () => {
        const set = new SmartSet([1, 2])
        const report = set.clear({ ifEmpty: 'throw' })
        expect([...set]).toEqual([])
        expect(report).toBeUndefined()
      })

      it(`throws on attempt to clear an already empty array`, () => {
        const set = new SmartSet([])
        const operation = () => set.clear({ ifEmpty: 'throw' })
        expect(operation).toThrowError(new SmartSetNotEmptyError(set))
      })

    })

  })

  describe(`delete`, () => {

    describe(`without options`, () => {

      it(`deletes a present item and reports back that a value was deleted from the set`, () => {
        const set = new SmartSet([1, 2])
        const report = set.delete(1)
        expect([...set]).toEqual([2])
        expect(report).toBe(true)
      })

      it(`does nothing with an unknown item and reports back that nothing happened to the set`, () => {
        const set = new SmartSet([1, 2])
        const report = set.delete(3)
        expect([...set]).toEqual([1, 2])
        expect(report).toBe(false)
      })

    })

    describe(`with explicit default “ignore-but-report” option`, () => {

      it(`deletes a present item and reports back that a value was deleted from the set`, () => {
        const set = new SmartSet([1, 2])
        const report = set.delete(1, { ifNotFound: 'ignore-but-report' })
        expect([...set]).toEqual([2])
        expect(report).toBe(true)
      })

      it(`does nothing with an unknown item and reports back that nothing happened to the set`, () => {
        const set = new SmartSet([1, 2])
        const report = set.delete(3, { ifNotFound: 'ignore-but-report' })
        expect([...set]).toEqual([1, 2])
        expect(report).toBe(false)
      })

    })

    describe(`with the “throw” option`, () => {

      it(`deletes a present item and reports nothing`, () => {
        const set = new SmartSet([1, 2])
        const report = set.delete(1, { ifNotFound: 'throw' })
        expect([...set]).toEqual([2])
        expect(report).toBeUndefined()
      })

      it(`throws on an attempt to delete an unknown item`, () => {
        const set = new SmartSet([1, 2])
        const operation = () => set.delete(3, { ifNotFound: 'throw' })
        expect(operation).toThrowError(new SmartSetItemDoesntExistError(set, 3))
      })

    })

  })

})
