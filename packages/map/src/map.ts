import { SmartMapItemDoesntExistError, SmartMapItemExistsError, SmartMapNotEmptyError } from './errors'


export class SmartMap<K, V> extends Map<K, V> {


  public override clear (options?: { readonly ifEmpty?: 'ignore' }): void

  public override clear (options: { readonly ifEmpty: 'ignore-but-report' }): boolean

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
          throw new SmartMapNotEmptyError(this)
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


  public override delete (key: K, options?: { readonly ifNotFound?: 'ignore-but-report' }): boolean

  public override delete (key: K, options: { readonly ifNotFound: 'throw' }): void | never

  public override delete (
    key: K,
    options?: { readonly ifNotFound?: 'ignore-but-report' | 'throw' },
  ): boolean | void | never {

    // Normalize options.
    const ifNotFound = options?.ifNotFound ?? 'ignore-but-report'

    // Determine if exists.
    const exists = super.has(key)

    // Early exit or throw if needed.
    switch (ifNotFound) {
      case 'ignore-but-report':
        break
      case 'throw':
        if (!exists) {
          throw new SmartMapItemDoesntExistError(this, key)
        }
    }

    // Perform the actual operation.
    super.delete(key)

    // Report back correctly.
    switch (ifNotFound) {
      case 'ignore-but-report':
        return exists
      case 'throw':
        break
    }

  }


  public override get (key: K, options?: { readonly ifNotFound?: 'undefined' }): V | undefined

  public override get (key: K, options: { readonly ifNotFound: 'throw' }): V

  public override get (key: K, options?: { readonly ifNotFound?: 'undefined' | 'throw' }): V | undefined {

    // Normalize options.
    const ifNotFound = options?.ifNotFound ?? 'undefined'

    // Determine if exists.
    const notFound = !super.has(key)

    // Early exit or throw if needed.
    switch (ifNotFound) {
      case 'undefined':
        break
      case 'throw':
        if (notFound) {
          throw new SmartMapItemDoesntExistError(this, key)
        }
    }

    // Perform the actual operation.
    return super.get(key)

  }


  public override set (key: K, value: V, options?: { readonly ifExists: 'overwrite' }): this

  public override set (key: K, value: V, options: { readonly ifExists: 'overwrite-but-report' }): boolean

  public override set (key: K, value: V, options: { readonly ifExists: 'ignore' }): this

  public override set (key: K, value: V, options: { readonly ifExists: 'ignore-but-report' }): boolean

  public override set (key: K, value: V, options: { readonly ifExists: 'throw' }): this | never

  public override set (
    key: K,
    value: V,
    options?: { readonly ifExists: 'overwrite' | 'overwrite-but-report' | 'ignore' | 'ignore-but-report' | 'throw' },
  ): this | boolean | never {

    // Normalize options.
    const ifExists = options?.ifExists ?? 'overwrite'

    // Determine if exists.
    const exists = super.has(key)

    // Early exit or throw if needed.
    switch (ifExists) {
      case 'overwrite':
      case 'overwrite-but-report':
      case 'ignore':
      case 'ignore-but-report':
        break
      case 'throw':
        if (exists) {
          throw new SmartMapItemExistsError(this, key)
        }
    }

    // Perform the actual operation.
    switch (ifExists) {
      case 'overwrite':
      case 'overwrite-but-report':
      case 'throw':
        super.set(key, value)
        break
      case 'ignore':
      case 'ignore-but-report':
        if (!exists) super.set(key, value)
        break
    }

    // Report back correctly.
    switch (ifExists) {
      case 'overwrite':
      case 'ignore':
      case 'throw':
        return this
      case 'overwrite-but-report':
      case 'ignore-but-report':
        return exists
    }

  }


}
