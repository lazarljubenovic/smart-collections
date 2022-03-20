import { SmartMap } from './map'


export class SmartMapItemExistsError<K = unknown, V = unknown> extends Error {

  public constructor (
    public readonly smartMap: SmartMap<K, V>,
    public readonly key: K,
  ) {
    super(`An attempt was made to perform an operation which expected the key not to have been found in the SmartMap instance.`)
  }

}

export class SmartMapItemDoesntExistError<K = unknown, V = unknown> extends Error {

  public constructor (
    public readonly smartMap: SmartMap<K, V>,
    public readonly key: K,
  ) {
    super(`An attempt was made to perform an operation which expected the key to have been found in the SmartMap instance.`)
  }

}

export class SmartMapNotEmptyError<K = unknown, V = unknown> extends Error {

  public constructor (
    public readonly smartSet: SmartMap<K, V>,
  ) {
    super(`An attempt was made to perform an operation which expected the SmartMap to have been empty.`)
  }

}
