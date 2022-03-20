import { SmartSet } from './set'


export class SmartSetItemExistsError<T = unknown> extends Error {

  public constructor (
    public readonly smartSet: SmartSet<T>,
    public readonly value: T,
  ) {
    super(`An attempt was made to perform an operation which expected the value not to have been found in the SmartSet instance.`)
  }

}

export class SmartSetItemDoesntExistError<T = unknown> extends Error {

  public constructor (
    public readonly smartSet: SmartSet<T>,
    public readonly value: T,
  ) {
    super(`An attempt was made to perform an operation which expected the value to have been found in the SmartSet instance.`)
  }

}

export class SmartSetNotEmptyError<T = unknown> extends Error {

  public constructor (
    public readonly smartSet: SmartSet<T>,
  ) {
    super(`An attempt was made to perform an operation which expected the SmartSet to be empty.`)
  }

}
