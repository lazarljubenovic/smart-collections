# Smart Collections

- Ever wanted to know if `set.add(1)` made a change to the set?
- Ever wanted to bail out of `map.set(1, 2)` if it would overwrite existing data?
- Ever wanted `set.delete(1)` to throw if the element doesn't exist?

All of these have easy ad-hoc solutions that you can write in-line, but provide noise to what could otherwise be clean
code.

**Smart collections** are simple wrappers around `Set` and `Map` with additional configuration options when performing
operations, called `SmartSet` and `SmartMap`.

Their API is **fully backward compatible** with the standard `Set` and `Map`, so you don't have to worry about breaking
existing code when making the switch. This includes everyday methods such as `add`, `clear` and `delete`, but also
subtle things like keeping them iterable, which means you can still use `SmartSet` and `SmartMap` with a `for-of` loop,
you can still pass them to any API which accepts a regular `Set` or `Map`, and you can still use them with libraries
like [**jupiterate**](https://github.com/lazarljubenovic/jupiterate).

## Installation

```bash
# using yarn
yarn add @smart-collections/set @smart-collections/map

# using npm
npm i @smart-collections/set @smart-collections/map
```
