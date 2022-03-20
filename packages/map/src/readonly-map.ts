export interface ReadonlySmartMap<K, V> extends ReadonlyMap<K, V> {
  get (key: K, options?: { readonly ifNotFound?: 'undefined' }): V | undefined
  get (key: K, options: { readonly ifNotFound: 'throw' }): V
}
