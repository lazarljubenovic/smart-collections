import { SmartSetItemDoesntExistError, SmartSetItemExistsError, SmartSetNotEmptyError } from './errors'


export class SmartSet<T> extends Set<T> {


  public constructor (iterable?: Iterable<T> | null) {
    super(iterable)
  }


  /**
   * Add the `value` to the set. If `value` is already present in the set, nothing happens.
   * If `value` is **not** already present in the set, it's added. This method always returns
   * `this` for easier chaining.
   *
   * This signature is backwards-compatible with {@link Set#add}.
   */
  public override add (value: T, options?: { readonly ifExists?: 'ignore' }): this

  /**
   * Add the `value` to the set. If `value` is already present in the set, nothing happens,
   * and `true` is returned. If `value` is **not** already present in the set, it's added,
   * and `false` is returned.
   */
  public override add (value: T, options: { readonly ifExists: 'ignore-but-report' }): boolean

  /**
   * Try to add the `value` to the set. If `value` is already present in the set,
   * a {@link SmartSetItemExistsError} will be thrown. If `value` is **not** already present
   * in the set, it's added. This method always returns `this` for easier chaining.
   */
  public override add (value: T, options: { readonly ifExists: 'throw' }): this | never

  /**
   * Add or try to add a `value` to the set.
   *
   * Use the second parameter to precisely configure what happens on conflict, i.e. what when
   * the value you want to add to the set is already present inside.
   *
   * Omitting the second parameter is fully backwards compatible with the regular {@link Set}.
   *
   * @param value - The value to (try to) add to the set.
   * @param options - An optionally provided object with a single optional key describing
   *        the strategy to utilize when a conflict occurs.
   */
  public override add (
    value: T,
    options?: { readonly ifExists?: 'ignore' | 'ignore-but-report' | 'throw' },
  ): this | never | boolean {

    // Normalize options.
    const ifExists = options?.ifExists ?? 'ignore'

    // Determine if the value exists.
    const exists = super.has(value)

    // Early exit or throw if needed.
    switch (ifExists) {
      case 'ignore':
      case 'ignore-but-report':
        break
      case 'throw':
        if (exists) {
          throw new SmartSetItemExistsError(this, value)
        }
    }

    // Perform the actual operation.
    super.add(value)

    // Report back correctly.
    switch (ifExists) {
      case 'ignore':
      case 'throw':
        return this
      case 'ignore-but-report':
        return exists
    }

  }


  /**
   * Delete all values from the set, leaving it empty. If the set is already empty, nothing
   * happens.
   *
   * This signature is backwards-compatible with {@link Set#clear}.
   */
  public override clear (options?: { readonly ifEmpty?: 'ignore' }): void

  /**
   * Delete all values from the set, leaving it empty. If the set had already been empty,
   * `true` is returned. Otherwise, `false` is returned.
   */
  public override clear (options: { readonly ifEmpty: 'ignore-but-report' }): boolean

  /**
   * Try to delete all values from the set. If the set had already been empty, a
   * {@link SmartSetNotEmptyError} is thrown.
   */
  public override clear (options: { readonly ifEmpty: 'throw' }): void | never

  public override clear (options?: { readonly ifEmpty?: 'ignore' | 'ignore-but-report' | 'throw' }): void | boolean | never {

    // Normalize options.
    const ifEmpty = options?.ifEmpty ?? 'ignore'

    // Determine if empty.
    const isEmpty = super.size == 0

    // Early exit or throw if needed.
    switch (ifEmpty) {
      case 'ignore':
      case 'ignore-but-report':
        break
      case 'throw':
        if (isEmpty) {
          throw new SmartSetNotEmptyError(this)
        }
    }

    // Perform the actual operation.
    super.clear()

    // Report back correctly.
    switch (ifEmpty) {
      case 'ignore':
        return
      case 'ignore-but-report':
        return isEmpty
    }

  }


  public override delete (value: T, options?: { readonly ifNotFound?: 'ignore-but-report' }): boolean

  public override delete (value: T, options: { readonly ifNotFound: 'throw' }): void | never

  public override delete (
    value: T,
    options?: { readonly ifNotFound?: 'ignore-but-report' | 'throw' },
  ): boolean | void | never {

    // Normalize options.
    const ifNotFound = options?.ifNotFound ?? 'ignore-but-report'

    // Determine if exists.
    const exists = super.has(value)

    // Early exit or throw if needed.
    switch (ifNotFound) {
      case 'ignore-but-report':
        break
      case 'throw':
        if (!exists) {
          throw new SmartSetItemDoesntExistError(this, value)
        }
    }

    // Perform the actual operation.
    super.delete(value)

    // Report back correctly.
    switch (ifNotFound) {
      case 'ignore-but-report':
        return exists
      case 'throw':
        break
    }

  }


}
